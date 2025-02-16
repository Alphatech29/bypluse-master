const {
  referralEarnNoticeMailer,
} = require("../email/mails/referrarEarnNotice");
const { bonusInfo } = require("../extras/bonusInfo");
const db = require("../models/db");
const { calculatePercentage } = require("./calculation");
const { insertIntoEarningHistory } = require("./history");
const { getReferralDetails, editReferralDetails } = require("./referral");
const { getUserById, editUserById } = require("./user");

//CREATE NEW UPLINE
exports.getGenerationsPercentage = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM f_upline_generation", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

//CREATE NEW GENERATION
exports.createNewGeneration = (obj) => {
  return new Promise((resolve, reject) => {
    db.query("INSERT INTO f_upline_generation SET ?", obj, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};
//EDIT GENERATION BY ID
exports.editGenerationById = (generationId, obj) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE f_upline_generation SET ? WHERE g_id = ?",
      [obj, parseInt(generationId)],
      (err, data) => {
        if (err) reject(err);
        else resolve(data);
      }
    );
  });
};

//EDIT GENERATION BY ID
exports.deleteGenerationById = (generationId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM f_upline_generation WHERE g_id = ?",
      parseInt(generationId),
      (err, data) => {
        if (err) reject(err);
        else resolve(data);
      }
    );
  });
};

//CREDIT UPLINE GENERATION
exports.creditUplineGeneration = async (downlineUserId, sharingAmount,type) => {
  return new Promise(async (resolve, reject) => {
    let dUserId = downlineUserId;
    let sendOnlyToReferrer = true;

    const generation = await this.getGenerationsPercentage();

    //Loop Through The Total Matrix And Perform Action On Each Loop
    for (i = 0; i < generation.length; i++) {
      const referrer = await getReferralDetails(dUserId);

      //Check If There Is Next Downline
      if (!referrer) {
        return resolve();
      }

      const user2 = await getUserById(dUserId);

      //Credit The Referrer
      let amountToCredit = type === "old"
        ? calculatePercentage(generation[i].g_plan_percent, sharingAmount)
        : calculatePercentage(generation[i].g_percent, sharingAmount);

      let obj = type === "old"
        ? { activities_balance: referrer.activities_balance + amountToCredit }
        : { referral_balance: referrer.referral_balance + amountToCredit };
        
      if (amountToCredit > 0) await editUserById(referrer.r1_id, obj);
    
      //Update Referral
      if (type === "new")
        await editReferralDetails(referrer.r_id, {
          r_status: 1,
          r_amount: amountToCredit,
        });

      if (type === "new") {
        if (sendOnlyToReferrer) {
          //Send Referral Notification Mailer
          referrer.amount = amountToCredit.toLocaleString();
          referralEarnNoticeMailer(referrer, user2);

          //Insert Earning History For Him
          await insertIntoEarningHistory(amountToCredit, {
            h_user_id: referrer.r1_id,
            h_amount: amountToCredit,
            h_text: bonusInfo.referral.text,
          });

          sendOnlyToReferrer = false;
        } else {
          //Insert Earning History For Him
          await insertIntoEarningHistory(amountToCredit, {
            h_user_id: referrer.r1_id,
            h_amount: amountToCredit,
            h_text: bonusInfo.indirectReferral.text,
          });
        }
      } else {
        //Add Earning To History
        await insertIntoEarningHistory(amountToCredit, {
          h_user_id: referrer.r1_id,
          h_amount: amountToCredit,
          h_text: bonusInfo.downlineSubscribeToPlan.text,
        });
      }

      //Assign Next Downline To Variable
      //It means fetch the person that refer this Current person
      dUserId = referrer.r1_id;
    }

    return resolve();
  });
};

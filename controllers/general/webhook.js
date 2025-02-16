const { alertNewPlan } = require("../../email/mails/newPlan");
const { bonusInfo } = require("../../extras/bonusInfo");
const asyncHandler = require("../../helpers/asyncHandler");
const { getBonuses } = require("../../helpers/bonus");
const { creditUplineGeneration } = require("../../helpers/generation");
const { insertIntoEarningHistory } = require("../../helpers/history");
const logger = require("../../helpers/logger");
const { getUserById, editUserById } = require("../../helpers/user");

//COINBASE MERCHANT CHARGE WEBHOOK
exports.coinbaseChargeWebHook = asyncHandler(async (req, res, next) => {
    
    
    //Check If Its Confirmed
    if(req.body.event.type === "charge:confirmed"){
        const {customer_id,plan} = req.body.event.data.metadata;
logger.debug(req.body,"body",req.body.event,"event",req.body.event.data,"data",req.body.event.data.local_price.amount,plan.plan_price)
        console.log(req.body,"body",req.body.event,"event",req.body.event.data,"data",req.body.event.data.local_price.amount,plan.plan_price)
        //Check Amount
       
        //Get User For Further Interrogation
        const user = await getUserById(customer_id);

        //Reward Bonus
        const bonus = await getBonuses();

        let a = {
            plan_id: plan.plan_id,
            plan_name: plan.plan_name,
            plan_mining_amount: plan.plan_mining_amount,
            plan_mining_minute: plan.plan_mining_minute
        }

        if (!user.is_paid) {
            a.is_paid = 1;
            a.activities_balance = (user.activities_balance + bonus.b_register_bonus) || 0;
        }
   
        await editUserById(customer_id, a);

        //Add Earning To History
        if (!user.is_paid) await insertIntoEarningHistory(bonus.b_register_bonus, {
            h_user_id: customer_id,
            h_amount: bonus.b_register_bonus,
            h_text: bonusInfo.register.text
        });

        //Send Mail
        alertNewPlan({fullname:user.fullname,email:user.email,...plan,gateway:"Crypto"});

        let type = user.is_paid ? "old" : "new"

        //Reward Referral Only If This New User Have Not Paid
        if (!user.is_paid) await creditUplineGeneration(customer_id, plan.plan_price,type);

    }


    return res.json({ status: true})
})


const db = require("../models/db");
const { getCouponByKey, updateCouponById } = require("./coupon");
const { getUserById, editUserById } = require("./user");
const { getBonuses } = require("./bonus");
const { insertIntoEarningHistory } = require("./history");
const { bonusInfo } = require("../extras/bonusInfo");
const { getPackageById } = require("./packages");
const { creditUplineGeneration } = require("./generation");


//COUPON CODE PAYMENT
exports.couponPay = async (userId,code,planId) => {
    return new Promise(async (resolve, reject) => {

        //Get The Coupon Code And Check If Found And Valid
        const coupon = await getCouponByKey(code);
        if (!coupon) return reject("Coupon Not Found");
        if (coupon.c_status) return reject(coupon.c_usedby === userId ? "Coupon Has Been Used By You" : "Coupon Has Been Used");
        
        //Crosscheck If Coupon Has Sufficient Amount
        const plan = await getPackageById(planId);
        if (!plan) return reject("Subscription Plan Not Found");
        if (coupon.c_amount < plan.plan_price) return reject("Insufficient Amount In Coupon Code");
        
        //Get User For Further Interrogation
        const user = await getUserById(userId);

        
        //Check If User Want To Subscrible To Current Plan
        if(user.plan_id == planId) return reject("You already on this plan, choose another plan!");

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
   
        await editUserById(userId, a);

        //Add Earning To History
        if (!user.is_paid) await insertIntoEarningHistory(bonus.b_register_bonus, {
            h_user_id: userId,
            h_amount: bonus.b_register_bonus,
            h_text: bonusInfo.register.text
        });
        
        //Expired The Coupon Code
        await updateCouponById(coupon.c_id, {
            c_usedby: userId,
            c_status: 1
        });

        let type = user.is_paid ? "old" : "new"

        //Reward Referral Only If This New User Have Not Paid
        await creditUplineGeneration(userId, plan.plan_price,type);

        resolve()
        
    })
}


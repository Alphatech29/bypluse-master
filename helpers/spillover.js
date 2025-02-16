const db = require("../models/db")

//GET USER BASED ON REFERRAL
exports.getUserByReferralCount = (count) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM(SELECT r1_id AS id, activities_balance,username,email, COUNT(*) AS ref FROM f_referrals JOIN f_users ON uid = r1_id) AS ref1 WHERE ref1.ref >= ?", parseInt(count), (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};

//GET USER BASED ON PACKAGE
exports.getUserByPackage = (packageId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_users WHERE plan_id = ?", parseInt(packageId), (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};





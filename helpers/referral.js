const db = require("../models/db")


//GET REFERRAL DETAILS BY DOWNLINE (REFERREE)
exports.editReferralDetails = (referralID,obj) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_referrals SET ? WHERE r_id = ?", [obj, parseInt(referralID)],(err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//GET REFERRAL DETAILS BY DOWNLINE (REFERREE)
exports.getReferralDetails = (downlineId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_referrals A JOIN f_users B ON A.r1_id = B.uid WHERE r2_id = ?", parseInt(downlineId),(err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
}

//GET REFERRAL COUNT
exports.getUserReferralCount = (userId) => {
    return new Promise((resolve, reject) => {
        
        db.query(`SELECT COUNT(*) AS total FROM f_referrals A WHERE A.r1_id = ${parseInt(userId)} AND r_status = 1`, (err, data) => {
            if (err) reject(err)
            else return resolve(data[0].total || 0)
        })
        
        
    })
}
const db = require("../models/db");

exports.getAllUsers = (type) => {
    return new Promise((resolve, reject) => {
        let query;
        if (type === "active") query = "SELECT COUNT(*) AS total FROM f_users WHERE is_verify = 1"
        else if (type === "inactive") query = "SELECT COUNT(*) AS total FROM f_users WHERE is_verify = 0"
        else query = "SELECT COUNT(*) AS total FROM f_users"
        db.query(query, (err, data) => {
            if (err) reject(err)
            else resolve(data[0].total || 0)
        })
    })
};

exports.getTopReferrer = (limit) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT COUNT(*) AS total, uid, username, fullname, avatar FROM `f_referrals` A JOIN f_users B ON A.r1_id = B.uid GROUP BY uid ORDER BY total DESC LIMIT ?", parseInt(limit), (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};

exports.getTopEarners = (limit) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_users WHERE (activities_balance + mining_balance + referral_balance) > 0 ORDER BY activities_balance + mining_balance + referral_balance DESC LIMIT ?", parseInt(limit), (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};


//GET ALL WITHDRAWAL
exports.getWithdrawCount = (type) => {
    return new Promise((resolve, reject) => {
        let query;
        if (type === "pending") {
            query = `SELECT SUM(w_amount) as total FROM f_withdrawal_history WHERE w_status = 0`
        } else {
            query = `SELECT SUM(w_amount) as total FROM f_withdrawal_history WHERE w_status = 1`
        }
        db.query(query, (err, data) => {
            if (err) reject(err)
            else resolve(data[0].total || 0)
        })
    })
}



//GET ALL WITHDRAWAL AMOUNT
exports.getAllWithdrawalAmount = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT SUM(w_amount) AS total FROM  f_withdrawal_history WHERE NOT w_status = 0",(err, data) => {
            if (err) reject(err)
            else resolve(data[0].total || 0)
        })
    })
};

//GET VIDEOS COUNT
exports.getVideosCount = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT COUNT(*) AS total FROM  f_videos",(err, data) => {
            if (err) reject(err)
            else resolve(data[0].total || 0)
        })
    })
};

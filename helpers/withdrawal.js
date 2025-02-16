const db = require("../models/db");

//EDIT USER BY ID
exports.insertIntoWithdrawalHistory = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_withdrawal_history SET ?", obj, (err, user) => {
            if (err) reject(err)
            else resolve(user)
        })
    })
};

//CHECK IF HAS PENDING WITHDRAWAL
exports.checkIfHasPendingWithdrawal = (userId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_withdrawal_history WHERE w_user_id = ? AND w_status = 0", parseInt(userId), (err, data) => {
            if (err) reject(err)
            else {
                if (data.length) {
                    return resolve(true)
                } else {
                    return resolve(false)
                }
            }
        })
    })
};



//EDIT WITHDRAWAL BY ID
exports.editWithdrawalById = (withdrawalId, obj) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_withdrawal_history SET ? WHERE w_wid = ?",[obj, parseInt(withdrawalId)],(err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//DEDUCT BALANCE
exports.balanceWithdrawalByuserId = (userId, type, amount) => {
    return new Promise((resolve, reject) => {
        let query;
        if (type === "ref") {
            query = `UPDATE f_users SET referral_balance = referral_balance - ${parseFloat(amount)} WHERE uid = ${parseInt(userId)}`
        }else if (type === "act") {
            query = `UPDATE f_users SET earnings_balance = earnings_balance - ${parseFloat(amount)} WHERE uid = ${parseInt(userId)}`
        }

        db.query(query,(err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//GET WITHDRAWAL BY ID
exports.getWithdrawalById = (withdrawalId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_withdrawal_history WHERE w_wid = ?",parseInt(withdrawalId),(err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
}




//DELETE WITHDRAWAL BY ID
exports.deleteWithdrawalById = (withdrawalId) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM f_withdrawal_history WHERE w_wid = ?", parseInt(withdrawalId),(err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//END HERE

//GET ALL DEPOSIT HISTORY
exports.getWithdrawaltHistory = (trxId,status,limit,offset) => {
    return new Promise((resolve, reject) => {
        let query;

        if (trxId) {
            query = `SELECT * FROM f_withdrawal_history A JOIN f_users B ON A.w_user_id = B.uid LEFT JOIN f_wallet C ON C.w_user_id = B.uid WHERE A.w_trx_id = '${trxId}' AND A.w_status = ${parseInt(status)} LIMIT ${limit} OFFSET ${offset}`

        }
        else {
            query = `SELECT * FROM f_withdrawal_history A JOIN f_users B ON A.w_user_id = B.uid LEFT JOIN f_wallet C ON C.w_user_id = B.uid WHERE A.w_status = ${parseInt(status)}  LIMIT ${limit} OFFSET ${offset}`
        }
        db.query(query, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}


//GET ALL WITHDRAWAL AMOUNT
exports.getAllWithdrawalAmount = (type = 0) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT SUM(w_amount) AS total FROM  f_withdrawal_history WHERE NOT w_status = ?",parseInt(type),(err, data) => {
            if (err) reject(err)
            else resolve(data[0].total || 0)
        })
    })
};

//GET ALL WITHDRAWAL AMOUNT (HOME)
exports.getAllWithdrawalAmountHome = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT SUM(w_amount) AS total FROM  f_withdrawal_history",(err, data) => {
            if (err) reject(err)
            else resolve(data[0].total || 0)
        })
    })
};




//GET ALL USER WITHDRAWAL AMOUNT
exports.getUserWithdrawalAmount = (userId) => {
    return new Promise((resolve, reject) => {
        
        db.query(`SELECT SUM(w_amount) AS total FROM f_withdrawal_history WHERE w_user_id = ${parseInt(userId)}`, (err, data) => {
            if (err) reject(err)
            else resolve(data[0].total || 0)
        })
    })
}

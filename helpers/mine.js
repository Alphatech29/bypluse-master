const db = require("../models/db");

//NEW MINE
exports.newMine = (obj) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO f_mining_history SET ?`,obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};

//UPDATE MINE
exports.updateMine = (mineId, obj) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE f_mining_history SET ? WHERE m_id = ?`,[obj,parseInt(mineId)], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};

//UPDATE MINE BY USER
exports.updateUserMines = (userId) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE f_mining_history SET m_status = 1 WHERE m_user_id = ?`,parseInt(userId), (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};

//CHECK USER ACTIVE MINE
exports.hasActiveMine = (userId) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM f_mining_history WHERE m_user_id = ? AND m_status = 0`,parseInt(userId), (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
};

//GET ALL ACTIVE MINERS
exports.getAllActiveMiners = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM f_mining_history A JOIN f_users B ON A.m_user_id = B.uid WHERE A.m_status = 0 AND B.plan_id > 0`, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};

//GET USER MINE HISTORY
exports.getUserMinerHistory = (userId,limit,offset) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM f_mining_history WHERE m_user_id = ${parseInt(userId)} ORDER BY m_id DESC LIMIT ${limit} OFFSET ${offset}`, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};

//GET USER MINE COUNT
exports.getUserCompeletedMine = (userId) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT COUNT(*) AS total FROM f_mining_history WHERE m_user_id = ${parseInt(userId)} AND m_status = 1`, (err, data) => {
            if (err) reject(err)
            else resolve(data[0].total || 0)
        })
    })
};

//DELETE ALL USER ACTIVE MINE
exports.deleteUserActiveMines = (userId) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM f_mining_history WHERE m_user_id = ? AND m_status = 0`,parseInt(userId), (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};
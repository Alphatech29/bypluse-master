const db = require("../models/db");

//GET USER WALLET ACCOUNT BY ID
exports.getUserWallet = (userId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_wallet WHERE w_user_id = ?", parseInt(userId), (err, user) => {
            if (err) reject(err)
            else resolve(user[0])
        })
    })
};

//CREATE NEW WALLET
exports.createNewWallet = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_wallet SET ?", obj, (err, user) => {
            if (err) reject(err)
            else resolve(user)
        })
    })
};

//EDIT WALLET BY USER ID
exports.editWallet = (userId,obj) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_wallet SET ? WHERE w_user_id = ?", [obj,parseInt(userId)], (err, user) => {
            if (err) reject(err)
            else resolve(user)
        })
    })
};

//DELETE WALLET BY USER ID
exports.deleteWallet = (userId) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM f_wallet WHERE w_user_id = ?", parseInt(userId), (err, user) => {
            if (err) reject(err)
            else resolve(user)
        })
    })
};

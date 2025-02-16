const db = require("../models/db");

//GET BONUSES
exports.getBonuses = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_bonus LIMIT 1", (err, user) => {
            if (err) reject(err)
            else resolve(user[0])
        })
    })
}

//EDIT BONUSES
exports.editBonuses = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_bonus SET ?", obj, (err, user) => {
            if (err) reject(err)
            else resolve(user)
        })
    })
}
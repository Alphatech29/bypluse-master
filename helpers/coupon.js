const db = require("../models/db");
const { getUniqueID } = require("./uniqueID");

//GET COUPON BY KEY
exports.getCouponByKey = (key) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_coupons WHERE c_code  = ? LIMIT 1",key, (err, user) => {
            if (err) reject(err)
            else resolve(user[0])
        })
    })
}

//Check Coupon Details
exports.getCouponDetailsByKey = (key) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_coupons LEFT JOIN f_users ON uid = c_usedby WHERE c_code  = ? LIMIT 1",key, (err, user) => {
            if (err) reject(err)
            else resolve(user[0])
        })
    })
}

//UPDATE COUPON BY ID
exports.updateCouponById = (couponId,obj) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_coupons SET ? WHERE c_id = ?",[obj,couponId], (err, user) => {
            if (err) reject(err)
            else resolve(user)
        })
    })
}

exports.generateCoupons = (quantity,amount,id) => {
    return new Promise(async(resolve, reject) => {
        let obj = []
        for (i = 1; i <= parseInt(quantity); i++){
            obj.push(["CP" + getUniqueID(),amount,id])
        }
        
        db.query("INSERT INTO f_coupons (c_code, c_amount, c_author) VALUES ?", [obj], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })

}

exports.deleteCouponById = (couponId) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM f_coupons WHERE c_id = ?", parseInt(couponId), (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })

}

exports.userDeleteCouponById = (userId,couponId) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM f_coupons WHERE c_id = ? AND c_author = ?", [parseInt(couponId),userId], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })

}

exports.userDeleteAllCoupon = (userId) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM f_coupons WHERE c_status = 1 AND c_author = ?", userId, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })

}




exports.getAllCoupons = (limit, offset, search,type) => {
    return new Promise((resolve, reject) => {
        
        let query;

        if (search) {
            query = `SELECT * FROM f_coupons WHERE c_code  LIKE '%${search}%' LIMIT ${limit}  OFFSET ${offset} `

        } else if (type) {
            query = `SELECT * FROM f_coupons WHERE c_status = ${parseInt(type)} LIMIT ${limit}  OFFSET ${offset} `;
        }
        else {
            query = `SELECT * FROM f_coupons LIMIT ${limit} OFFSET ${offset} `
        }

        db.query(query, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

exports.getAllUserCoupons = (userId,limit, offset, search,type) => {
    return new Promise((resolve, reject) => {
        
        let query;

        if (search) {
            query = `SELECT * FROM f_coupons WHERE c_code LIKE '%${search}%' AND c_author = ${parseInt(userId)} ORDER BY c_id DESC LIMIT ${limit}  OFFSET ${offset} `

        } else if (type) {
            query = `SELECT * FROM f_coupons WHERE c_status = ${parseInt(type)} AND c_author = ${parseInt(userId)} ORDER BY c_id DESC LIMIT ${limit}  OFFSET ${offset} `;
        }
        else {
            query = `SELECT * FROM f_coupons WHERE c_author = ${parseInt(userId)} ORDER BY c_id DESC LIMIT ${limit} OFFSET ${offset} `
        }

        db.query(query, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}


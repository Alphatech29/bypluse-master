const db = require("../models/db");

exports.getPageFunction = (limit,offset) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_pages ORDER BY page_id DESC LIMIT ? OFFSET ?", [limit, offset], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//CREATE PAGE
exports.createPageFunction = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_pages SET ?", obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//EDIT PAGE
exports.updatePageById = (obj, id) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_pages SET ? WHERE page_id = ?", [obj,parseInt(id)], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//ADMIN GET SINGLE PAGE
exports.adminGetPageById = (id) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_pages WHERE page_id = ?", id, (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
}

//GET SINGLE PAGE
exports.getPageById = (id) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_pages WHERE page_id = ? AND page_status = 1 LIMIT 1", id, (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
}

//DELETE SPONSORED POST
exports.deletePageById = (id) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM f_pages WHERE page_id = ?", parseInt(id), (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}


//Get Page By Slug
exports.getPageBySlug = (slug) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_pages WHERE page_slug = ? LIMIT 1", slug, (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
}
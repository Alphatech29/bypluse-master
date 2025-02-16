const db = require("../models/db");

exports.getPostFunction = (search, limit, offset) => {
    return new Promise((resolve, reject) => {
        let query;
        if (search) {
            query = `SELECT * FROM f_posts A LEFT JOIN f_admins B ON A.post_author = B.uid WHERE A.post_status = 1 AND A.post_title LIKE '%${search}%' ORDER BY A.post_id DESC LIMIT ${limit} OFFSET ${offset}`
        } else {
            query = `SELECT * FROM f_posts A LEFT JOIN f_admins B ON A.post_author = B.uid WHERE A.post_status = 1 ORDER BY A.post_id DESC LIMIT ${limit} OFFSET ${offset}`
        }
        db.query(query, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//GET TOP VIEW POST
exports.getTopViewPosts = (limit, offset) => {
    return new Promise((resolve, reject) => {
      
        db.query(`SELECT * FROM f_posts A LEFT JOIN f_admins B ON A.post_author = B.uid WHERE A.post_status = 1 ORDER BY A.post_views DESC LIMIT ${limit} OFFSET ${offset}`, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

exports.adminGetPostFunction = (limit, offset) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_posts A LEFT JOIN f_admins B ON A.post_author = B.uid ORDER BY A.post_id DESC LIMIT ? OFFSET ?", [limit, offset], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

exports.updatePostViews = (id) => {
    
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_posts SET post_views = post_views + 1 WHERE post_id = ?", parseInt(id), (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

exports.createPostFunction = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_posts SET ?", obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}


exports.updatePostById = (obj, id) => {
    
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_posts SET ? WHERE post_id = ?", [obj,parseInt(id)], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}


exports.getPostById = (id) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_posts WHERE post_status = 1 AND post_id = ?", id, (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
}

exports.getPostBySlug = (slug) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_posts A LEFT JOIN f_admins B ON A.post_author = B.uid WHERE A.post_status = 1 AND A.post_slug = ?", slug, (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
}

exports.adminGetPostById = (id) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_posts WHERE post_id = ?", id, (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
}

exports.deletePostById = (id) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM f_posts WHERE post_id = ?", id, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

exports.editPostById = (id,obj) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_posts SET ? WHERE post_id = ?", [obj, parseInt(id)], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}


//CHECK IF EARN ON SPONSORED POST
exports.checkIfEarnOnPost = (postID,userID) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_posts_track WHERE t_post_id = ? AND t_user_id = ?", [parseInt(postID),userID], (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
}

//ADD TO SPONSORED POST TRACK
exports.addToSponsoredPostTrack = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_posts_track SET ?", obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//GET USER SHARE POST COUNT
exports.getUserSharePostCount = (userId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT COUNT(*) AS total FROM f_posts_track WHERE t_user_id = ?", parseInt(userId), (err, data) => {
            if (err) reject(err)
            else resolve(data[0].total || 0)
        })
    })
}
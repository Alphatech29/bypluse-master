const { getBonuses } = require("../helpers/bonus")
const { bonusInfo, insertIntoEarningHistory } = require("../helpers/history")
const { openToken } = require("../helpers/jwt")
const logger = require("../helpers/logger")
const { getPackages } = require("../helpers/packages")
const { getUserById, editUserById } = require("../helpers/user")
const db = require("../models/db")



exports.isAuthUser = async(req, res, next) => {
    if (req.signedCookies[process.env.TOKEN_NAME]) {
        const token = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
        
        if (token.role && token.role === "admin") {
            return res.redirect("/admin/dashboard")
        } else {
            return res.redirect("/user/dashboard")
        }
        
    } else {
        next()
    }
    
}

exports.isUserLogin = async(req, res, next) => {
    if (req.signedCookies[process.env.TOKEN_NAME]) {
        next()
    } else {

        //Save The Preferred URL
        res.cookie("preferredUrl", { url: req.originalUrl }, { signed: true, maxAge: 1000 * 60 * 60 * 24 * 1 });

        //Check If URL Contain The Word "ADMIN"
        if (req.originalUrl.includes("admin")) {
            return res.redirect("/admin/login")
        } else {
            return res.redirect("/login")
        }
        

    }
    
}


exports.isAdmin = async (req, res, next) => {

    const { id,role:theRole } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    if (theRole !== "admin") {
        
        return res.render("error/error", {
            title: "Not Allowed",
            text: "You are not allow to enter this page",
            button: {
                link: "/",
                text: "Back To Homepage"
            }
        });

        
    }

    
    db.query("SELECT role FROM f_admins WHERE uid = ? LIMIT 1", id, (err, role) => {
        if (err) logger.debug(err)
        else {
            let data = role[0];
            
            if (!data) {
                res.render("error/error", {
        title: "Not Allowed",
        text: "You are not allow to enter this page",
        button: {
            link: "/",
            text:"Back To Homepage"
        }
        
    })
            } else {
                next()
            }
        }
    })
    
}



exports.isRoleAllow = (role) => async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
    const user = await getUserById(id);

    if (role instanceof Array) {
        const check = role.some(rl => rl.toLowerCase() === user.role.toLowerCase());
        if (check) {
            next()
        } else {
            res.render("error/error", {
        title: "Not Allowed",
        text: "You are not allow to enter this page",
        button: {
            link: "/",
            text:"Back To Homepage"
        }
        
    })
        }
    }else{
        if (user.role.toLowerCase() === role.toLowerCase()) {
       next() 
    } else {
        res.render("error/error", {
        title: "Not Allowed",
        text: "You are not allow to enter this page",
        button: {
            link: "/",
            text:"Back To Homepage"
        }
        
    })
    }
    }
    
}


//CHeck User Is Already Verify
exports.isUserVerified = async (req, res, next) => {
    const { id,role } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    if (role === "admin") return next()
    
    //Get User Info
    const user = await getUserById(id);
    
    //Check If Verify
    if (!user.is_verify) {
        return res.render("auth/user/verify", {
            title: "Unverified Account",
            description: "Unverified Account"
        })
    }

    //Check If Have Paid
    if (!user.is_paid || !user.plan_id) {
        return res.render("user/pages/package/package", {
            title: "Upgrade Account",
            description: "Upgrade Your Account To Enjoy More Restricted Beneficial Features",
            packages: await getPackages()
        })
    }

    //Assign To Next Controller
    req.user = user

    //If Verified, Allow Him To His Destination
    next()
    
};


//DENY ADMIN FROM ENTERING USER
exports.denyAdmin = async (req, res, next) => {
    const token = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
  
    
    
    if (token && token.role === "admin") {
        return res.render("error/error", {
            title: "You Are Not Allowed To Enter Member Area",
            text: `Sorry Sir, You Are Not Allowed Here, Kindly Navigate Back!`
        })
    }

    //If He Is A User, Allow Him
    next()
    
};

//CHECK IF VENDOR
exports.isVendor = async (req, res, next) => {
    
    if(req.method !== "GET"){
        if (!req.user.is_vendor) {
            return res.json({
                status: false,
                message: "You Are Not Allowed To Enter Vendor Area",
                text: `Sorry Sir, You Are Not Allowed Here, Kindly Navigate Back!`
            })
        }
    }else{
        if (!req.user.is_vendor) {
            return res.render("error/error", {
                message: "You Are Not Allowed To Enter Vendor Area",
                text: `Sorry Sir, You Are Not Allowed Here, Kindly Navigate Back!`
            })
        }
    }
    
    

    //If He Is A User, Allow Him
    next()
    
};

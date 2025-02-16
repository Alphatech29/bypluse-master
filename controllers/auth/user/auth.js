const asyncHandler = require("../../../helpers/asyncHandler");
const { getDataFromObject } = require("../../../helpers/dataManipulator");
const { hashPassword, comparePassword } = require("../../../helpers/password");
const { createNewUpline } = require("../../../helpers/upline");
const { getUserById, getUserByUsername, getUserByEmail, createNewUser, editUserById } = require("../../../helpers/user");
const validator = require("validator");
const { signToken, openToken } = require("../../../helpers/jwt");
const { sendVerificationMail } = require("../../../helpers/verification");
const { getBonuses } = require("../../../helpers/bonus");
const { insertIntoEarningHistory, bonusInfo } = require("../../../helpers/history");
const { countries } = require("../../../extras/country");
const { sendUserReferral } = require("../../../email/mails/sendUserReferral");


//REGISTER (GET)
exports.userRegisterGet = asyncHandler(async (req, res, next) => {
    
    let referrer;

    if (req.query.ref) {
        referrer = await getUserByUsername(req.query.ref)
    }
    
    return res.render("auth/user/register", {
        title: "Register",
        description: "Join Us, Mine And Earn",
        referrer,
        countries: countries
    })
})

//REGISTER (POST)
exports.userRegisterPost = asyncHandler(async (req, res, next) => {
    //First Get Preferred Obj
    const obj = getDataFromObject(req.body, ["username", "fullname", "email", "password", "country","phone_number"]);
    
    //Hash Password
    obj.password = await hashPassword(obj.password);
    obj.is_verify = 1;
    
    //CREATE A USER
    let insertId;

    try {
        const result = await createNewUser(obj);
        insertId = result.insertId;
    } catch (error) {
        let message;
        if (error.sqlMessage.includes("phone")) {
            message = "Phone Number Already Taken"
        } else if (error.sqlMessage.includes("email")) {
            message = "Email Already Taken"
        }else if (error.sqlMessage.includes("username")) {
            message = "Username Already Taken"
        };

        return res.json({ status: false, message })
        
    }

    //Setting And Saving Upline
    if (req.body.upline) {
        const user = await getUserByUsername(req.body.upline);
        
        if (user.uid !== insertId) {
            
            const refObj = {
                r1_id: user.uid,
                r2_id: insertId
            };
        
            await createNewUpline(refObj);

            //Alert Referrer
            sendUserReferral(user, obj)
            
        }
        
        
    }

    //Response To User
    res.json({ status: true, message: "Registration Successful", goto: "/login" })
    

    //Send Activation Mail
    const userObj = await getUserById(insertId);
    sendVerificationMail(userObj)

})


//LOGIN (GET)
exports.userLoginGet = asyncHandler(async (req, res, next) => {
    
    return res.render("auth/user/login", {
        title: "Login",
        description: "Fill Your Credentials And Login"
    })
});

//LOGIN (POST)
exports.userLoginPost = asyncHandler(async (req, res, next) => {

    const isEmail = validator.isEmail(req.body.credentials);
    
    //USER VARIABLE
    let user;

    if (isEmail) {
       user = await getUserByEmail(req.body.credentials)
    } else {
        user = await getUserByUsername(req.body.credentials)
    };

    if (!user) {
        return res.json({status:false,message:"User not found"})
    };

    //Checking Password
    const isPasswordSame = await comparePassword(req.body.password, user.password);
    
    if (!isPasswordSame) {
        return res.json({status:false,message:"Incorrect Password"})
    }

    //All Info Successfully
    //Sign Him A Token And Respond
    const token = await signToken({ id: user.uid });
 

    if (req.body.logged) res.cookie(process.env.TOKEN_NAME, token, { signed: true, maxAge: 1000 * 60 * 60 * 24 * 7 })
    else res.cookie(process.env.TOKEN_NAME, token, { signed: true })

    const preferredUrl = req.signedCookies["preferredUrl"]

    //Clear preferredUrl
    res.clearCookie("preferredUrl");

    //Redirect To Preferred Url
    if (preferredUrl && preferredUrl.url) return res.json({ status: true, message: `Welcome ${user.username}`, goto: preferredUrl.url });

    res.json({ status: true, message: `Welcome ${user.username}`, goto: "/user/dashboard" });

})




//Fetch Upline
exports.fetchUplineGet = asyncHandler(async (req, res, next) => {
    
    const upline = await getUserByUsername(req.query.upline);
   
    if (!upline) {
        return res.json({ status: false })
        
    } else {
        return res.json({ status: true, upline: upline.username })
        
    }
})




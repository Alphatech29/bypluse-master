const { alertSpillOver } = require("../../email/mails/spillover");
const { bonusInfo } = require("../../extras/bonusInfo");
const asyncHandler = require("../../helpers/asyncHandler");
const { insertIntoEarningHistory } = require("../../helpers/history");
const { getPackages } = require("../../helpers/packages");
const { getUserByReferralCount, getUserByPackage } = require("../../helpers/spillover");
const { getUsersList, editUserById, getUserById } = require("../../helpers/user");

//SPILLOVER
exports.adminSpillOverGet = asyncHandler(async (req, res, next) => {
    
    //Criteria Based On
    //1. Minimum referral
    //2. packages
    //3. particular user

    //Get All Packages
    const packages = await getPackages()
    
    //Get All User
    const users = await getUsersList(undefined, 99999999999, 0);


    res.render("admin/pages/spillover/spillover", {
        title: "Spillover",
        packages,
        users
    });


})

//SPILLOVER (POST)
exports.adminSpillOverPost = asyncHandler(async (req, res, next) => {

    //Amount
    const amount = parseFloat(parseFloat(req.body.amount).toFixed(8));
    
    if (req.query.type === "referral") {
        const users = await getUserByReferralCount(req.body.min_referral);
        
        for (i = 0; i < users.length; i++) {

            //Update User Activities Balance
            await editUserById(users[i].id, {
                activities_balance: users[i].activities_balance + amount
            });

            //Insert Into Earning History
            await insertIntoEarningHistory(amount, {
                h_user_id: users[i].id,
                h_amount: amount,
                h_text: bonusInfo.spillOver.text
            });

            //Send Mail
            alertSpillOver({
                amount,
                email: users[i].email,
                username: users[i].username
            });
            
        }
    } else if (req.query.type === "package") {
        
        const users = await getUserByPackage(req.body.packageId);
        
        for (i = 0; i < users.length; i++) {

            //Update User Activities Balance
            await editUserById(users[i].uid, {
                activities_balance: users[i].activities_balance + amount
            });

            //Insert Into Earning History
            await insertIntoEarningHistory(amount, {
                h_user_id: users[i].uid,
                h_amount: amount,
                h_text: bonusInfo.spillOver.text
            });

            //Send Mail
            alertSpillOver({
                amount,
                email: users[i].email,
                username: users[i].username
            });
            
        }

    } else if (req.query.type === "user") {
        
        const user = await getUserById(req.body.userId);
       
        //Update User Activities Balance
        await editUserById(user.uid, {
            activities_balance: user.activities_balance + amount
        });

        //Insert Into Earning History
        await insertIntoEarningHistory(amount, {
            h_user_id: user.uid,
            h_amount: amount,
            h_text: bonusInfo.spillOver.text
        });

        //Send Mail
        alertSpillOver({
            amount,
            email: user.email,
            username: user.username
        });
        

    } else {
        return res.json({ status: false, message: "Invalid Query" })
        
    }

    //Response To User
    return res.json({ status: true, message: "Spillover Distributed" })
    

})
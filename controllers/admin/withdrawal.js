const { alertUserPaymentSent } = require("../../email/mails/payment");
const asyncHandler = require("../../helpers/asyncHandler");
const { getDateFormatForPost } = require("../../helpers/dateTime");
const { openToken } = require("../../helpers/jwt");
const { getNextOffset, paginateData } = require("../../helpers/pagination");
const { editUserById, getUserById } = require("../../helpers/user");
const { getWithdrawaltHistory, editWithdrawalById, deleteWithdrawalById, getWithdrawalById, balanceWithdrawalByuserId } = require("../../helpers/withdrawal");
const { getWebSettings } = require("../../helpers/settings");
const { deleteUserActiveMines } = require("../../helpers/mine");

//Withdrawal LIST
exports.adminWithdrawaltListGet = asyncHandler(async (req, res, next) => {
    const type = req.params.type, transID = req.query.trans, limit = req.query.limit || parseInt(process.env.LIMIT),currentPage = parseInt(req.query.page)|| 1;
    
    //Pagination VAR
    let link, prevBtn = null, nextBtn = null, pageList;
    
    let history;

    if (type === "pending") {
        
        history = await getWithdrawaltHistory(transID, '0', limit, getNextOffset(currentPage, limit));

        await history.map(h => {
            h.w_created_at = getDateFormatForPost(h.w_created_at)
        })

        pageList = await getWithdrawaltHistory(transID, '0', 999999999, 0);


    } else if (type === "completed") {
        
        history = await getWithdrawaltHistory(transID, '1', limit, getNextOffset(currentPage, limit));

        await history.map(h => {
            h.w_created_at = getDateFormatForPost(h.w_created_at)
        })

        pageList = await getWithdrawaltHistory(transID, '1', 999999999, 0);


    } else {
        return res.render("error/error",{title:"Invalid Parameter",text:"You Enter Invalid Parameter"})
    }

    //PAGINATION
    const pageData = paginateData(limit, pageList.length);

    //Prev
    if (currentPage > 1) {
        prevBtn = currentPage - 1;
    }

    //Next
    if (currentPage !== "" && pageData[pageData.length - 1] > currentPage) {
        nextBtn = currentPage + 1
    };

    if (transID) {
        link = `/admin/withdrawal/${type}?trans=${transID}&vc`;
    } else {
        link = `/admin/withdrawal/${type}?`;
    }
    
    
    res.render(`admin/pages/withdrawal/withdrawalList`, {
        title: "Withdrawal History",
        history,
        prevBtn,
        nextBtn,
        link,
        type
    })
})

//DEPOSIT APPROVED
exports.adminWithdrawalApprovedPut = asyncHandler(async (req, res, next) => {

    //Multiple Approved
    if (req.body.type === "mark_all") {
        
        await req.body.data.map(async d => {
           
            
        //Get Withdrawal Data
        const withdrawal = await getWithdrawalById(d.withdrawalId);

        if (!withdrawal) {
            return res.json({ status: false, message: `We Can't Complete This Request`,text:"This Withdrawal Might Have Been Deleted" })
        }
        
        //Change Status To Done
        await editWithdrawalById(d.withdrawalId, { w_status: 1});
        
        const user = await getUserById(withdrawal.w_user_id);

        //Update User Balance
        const { website_per_coin } = await getWebSettings();
        
        let obj;

        if(withdrawal.w_wtype == "ref") {
            obj = {
                referral_balance: user.referral_balance - withdrawal.w_amount
            }
        }else{
            obj = {
                mining_balance: 0,
                activities_balance: (user.activities_balance + user.mining_balance) - (withdrawal.w_amount / website_per_coin)
            }

            //Expire Plan If Its Activities 
            obj.plan_id = 0;

            //Delete All User Active Mine
            await deleteUserActiveMines(withdrawal.w_user_id)
            
        }

        

       

        await editUserById(withdrawal.w_user_id,obj)

        //SEND HIM MAIL
        try {
            user.amount = withdrawal.w_amount;
            user.year = new Date().getFullYear();
            alertUserPaymentSent(user)
        } catch (error) {
            
        }
            
            
        });

        //Response To User
        return res.json({status:true,message:`Good Job, You Completed ${req.body.data.length} Withdrawal`})
    }
    //One By One Approved
    else {
        //Get Withdrawal Data
        const withdrawal = await getWithdrawalById(req.body.withdrawalId);

        if (!withdrawal) {
            return res.json({ status: false, message: `We Can't Complete This Request`,text:"This Withdrawal Might Have Been Deleted" })
        }
        
        //Change Status To Done
        await editWithdrawalById(req.body.withdrawalId, { w_status: 1});
        
        const user = await getUserById(withdrawal.w_user_id);

        //Update User Balance
        const { website_per_coin } = await getWebSettings();
        
        let obj;
        
        if(withdrawal.w_wtype == "ref") {
            obj = {
                referral_balance: user.referral_balance - withdrawal.w_amount
            }
        }else{
            obj = {
                mining_balance: 0,
                activities_balance: (user.activities_balance + user.mining_balance) - (withdrawal.w_amount / website_per_coin)
            }

            //Expire Plan If Its Activities 
            obj.plan_id = 0;
            
            //Delete All User Active Mine
            await deleteUserActiveMines(withdrawal.w_user_id)
            

        }

        
        await editUserById(withdrawal.w_user_id,obj)

        //Response To User
        res.json({ status: true, message: `Good Job, You Completed This Withdrawal` });

        //SEND HIM MAIL
        try {
            user.amount = withdrawal.w_amount;
            user.year = new Date().getFullYear();
            alertUserPaymentSent(user)
        } catch (error) {
            
        }
        
    }
    
})


//DEPOSIT DELETE
exports.adminWithdrawalDeletedDelete = asyncHandler(async (req, res, next) => {
    //Multiple Withdrawal
    if (req.body.type === "mark_all") {
        
        await req.body.data.map(async d => {
            
            //Delete Deposit By Id
            await deleteWithdrawalById(d.id);
        });

        //Response To User
        res.json({ status: true, message: `Good Job, You Delete ${req.body.data.length} Withdrawals` });

        //SEND HIM MAIL
    }
    //One By One Withdrawal
    else {
        
         //Delete Deposit By Id
        await deleteWithdrawalById(req.body.id);

        //Response To User
        res.json({ status: true, message: `Good Job, You Delete This Withdrawal` });

        //SEND HIM MAIL
        
    }
    
})
const asyncHandler = require("../../helpers/asyncHandler");

const { openToken } = require("../../helpers/jwt");
const { getUserById } = require("../../helpers/user");
const { insertIntoWithdrawalHistory, checkIfHasPendingWithdrawal } = require("../../helpers/withdrawal");
const { getWebSettings } = require("../../helpers/settings");
const { getUniqueID } = require("../../helpers/uniqueID");
const { getUserWallet } = require("../../helpers/wallet");
const { getPackageById } = require("../../helpers/packages");

exports.userMakeWithdrawalGet = asyncHandler(async (req, res, next) => {
    res.render("user/pages/withdrawal/withdrawal", {
        title: "Withdraw Rewards",
    })
})

//WITHDRAWAL POST
exports.userMakeWithdrawalPost = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    
    const { website_per_coin,website_min_withdrawal,website_max_withdrawal, website_currency,website_act_withdrawal_status,website_ref_withdrawal_status } = await getWebSettings();

    //Check If Activities Withdrawal Is Open
    if (req.body.type === "all" && !website_act_withdrawal_status) return res.json({ status: false, message: "Activities Withdrawal Portal Is Closed" });

    //Check If Referral Withdrawal Is Open
    if (req.body.type === "ref" && !website_ref_withdrawal_status) return res.json({ status: false, message: "Referral Withdrawal Portal Is Closed" });
    
    const { activities_balance, referral_balance, mining_balance, plan_id } = await getUserById(id);

    let amountRequested;

    if(req.body.type === "ref") amountRequested = referral_balance
    else if(req.body.type === "all") amountRequested = ((activities_balance + mining_balance) * website_per_coin)
    else return res.json({ status: false, message: "Withdrawal Type Not Found" })

 
    //Check Minimum Withdrawal
    const plan = await getPackageById(plan_id);
    if(!plan) return res.json({ status: false, message: "Plan Not Found"})


    if (req.body.type === "all" && (amountRequested < plan.plan_min_withdrawal)) return res.json({ status: false, message: `Activities Minimum Withdrawal Is ${website_currency + (plan.plan_min_withdrawal.toLocaleString())}` })
    else {
        if (amountRequested < website_min_withdrawal) return res.json({ status: false, message: `Referral Minimum Withdrawal Is ${website_currency + (website_min_withdrawal.toLocaleString())}` })
    }
    
    //Check Maximum Withdrawal
    if (req.body.type === "all" && (amountRequested > plan.plan_max_withdrawal)) return res.json({ status: false, message: `Activities Maximum Withdrawal Is ${website_currency + (plan.plan_max_withdrawal.toLocaleString())}`})
    else {
        if (amountRequested > website_max_withdrawal) return res.json({ status: false, message: `Referral Maximum Withdrawal Is ${website_currency + (website_max_withdrawal.toLocaleString())}` })
    }

    //Check If Has Wallet
    const hasWallet = await getUserWallet(id)
    if (!hasWallet) return res.json({ status: false, message: "Setup Wallet", text: "Create a wallet before you can withdrawa" });

    //Check If Has Pending Withdrawal
    const hasPendingWithdrawal = await checkIfHasPendingWithdrawal(id);
   
    if (hasPendingWithdrawal) {
        return res.json({ status: false, message: "Unable To Make Withdrawal", text: "You already have a pending withdrawal on the system" })
    }

    //Insert Into Withdrawal History
    await insertIntoWithdrawalHistory({
        w_wtype: req.body.type,
        w_user_id: id,
        w_amount: amountRequested,
        w_trx_id: "TRX" + getUniqueID()
    }); 

    //Response To Client
    return res.json({ status: true, message: "Withdrawal Successful", text: "You have successfully make a withdrawal", goto: "/user/history/withdrawal" })
    
})


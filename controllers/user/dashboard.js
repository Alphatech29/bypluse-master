const asyncHandler = require("../../helpers/asyncHandler");
const { extractTime, getDateFormatForPost } = require("../../helpers/dateTime");
const { getUserReferralHistory } = require("../../helpers/history");
const { openToken } = require("../../helpers/jwt");
const { getUserMinerHistory, getUserCompeletedMine } = require("../../helpers/mine");
const { getNotice } = require("../../helpers/notice");
const { getUserSharePostCount } = require("../../helpers/post");
const { editUserById } = require("../../helpers/user");
const { getUserWithdrawalAmount } = require("../../helpers/withdrawal");
const { getUserReferralCount } = require("../../helpers/referral");

exports.userDashboardGet = asyncHandler(async(req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    //Mine Counts
    const mineCount = await getUserCompeletedMine(id);

    //Get Referral Count
    const referralCount = await getUserReferralCount(id);

    //Withdrawals Amount
    const withdrawalAmount = await getUserWithdrawalAmount(id);

    //LAST 10 MINING HISTORY
    const miningHistory = await getUserMinerHistory(id, 10, 0);

    await miningHistory.map(eh => {
        eh.m_start_time = extractTime(eh.m_start_time, "MMM D, YYYY h:mm:ss a")
        eh.m_end_time = extractTime(eh.m_end_time, "MMM D, YYYY h:mm:ss a")
    });

    //REFERRAL
    const referralHistory = await getUserReferralHistory(undefined, id, 10, 0, undefined);

    await referralHistory.map(rh => {
        rh.created_at = getDateFormatForPost(rh.created_at)
    })

    //NOTICE
    const notice = await getNotice();

    //GET USER SHARE POST COUNT
    const sharePost = await getUserSharePostCount(id);

    return res.render("user/pages/dashboard/dashboard", {
        title: "My Dashboard",
        withdrawalAmount,
        mineCount,
        referralCount,
        miningHistory,
        referralHistory,
        notice: notice || {},
        sharePost
    })
})

//USER NOTICE READ
exports.userNoticeRead = asyncHandler(async(req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    //Notice Read
    await editUserById(id, { notice: 0 })
    return res.json({ status: true })
})
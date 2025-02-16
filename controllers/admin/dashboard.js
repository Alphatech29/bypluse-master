
const asyncHandler = require("../../helpers/asyncHandler");
const formatNumber = require("../../helpers/formatNumber");
const { getAllActiveMiners } = require("../../helpers/mine");
const { getAllUsers, getTopReferrer, getTopEarners, getWithdrawCount, getVideosCount } = require("../../helpers/panelInfo");

exports.adminDashboardGet = asyncHandler(async (req, res, next) => {
    
    const members = await getAllUsers();
    const activeMembers = await getAllUsers("active");
    const inactiveMembers = await getAllUsers("inactive");
    const pendingWithdrawal = await getWithdrawCount("pending")
    const paidWithdrawal = await getWithdrawCount()
    const liveMiners = await getAllActiveMiners()
    const topReferrer = await getTopReferrer(10);
    const topEarners = await getTopEarners(10);

    return res.render("admin/pages/dashboard", {
        title: "Admin Dashboard",
        members,
        activeMembers,
        inactiveMembers,
        pendingWithdrawal,
        paidWithdrawal,
        liveMiners:liveMiners.length,
        topReferrer,
        topEarners
    })
})
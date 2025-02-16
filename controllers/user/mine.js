const asyncHandler = require("../../helpers/asyncHandler");
const { openToken } = require("../../helpers/jwt");
const { newMine, hasActiveMine, updateUserMines } = require("../../helpers/mine");
const { addMinuteToDate } = require("../../helpers/dateTime");
const { bonusInfo } = require("../../extras/bonusInfo");
const { getUserById } = require("../../helpers/user");

exports.mineRefresh = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    //Get Active Mine
    const mine = await hasActiveMine(id);

    return res.json({ status: true, data: mine })
    
})

//STARTING NEW MINE
exports.mineStart = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    //Check If Have Active Mine
    const activeMine = await hasActiveMine(id);
 
    if (activeMine) return res.json({ status: false, message: "You have already active the engine" })
    
    //Complete All User Mines
    await updateUserMines(id)

    //Get User Info
    const user = await getUserById(id);
    
    
    const obj = {
        m_user_id: id,
        m_start_time: new Date(),
        m_end_time: addMinuteToDate(user.plan_mining_minute),
        m_seconds: user.plan_mining_minute * 60,
        m_amount: user.plan_mining_amount,
        m_text: bonusInfo.mine.text
    }
    await newMine(obj);

    return res.json({ status: true, message: "Engine Activated", data: { seconds: user.plan_mining_minute * 60, endDate: obj.m_end_time, amount: obj.m_amount } });
    
    
})
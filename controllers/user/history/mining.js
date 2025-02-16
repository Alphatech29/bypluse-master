const asyncHandler = require("../../../helpers/asyncHandler");
const { getDateFormatForPost, extractTime } = require("../../../helpers/dateTime");
const { getUserMinerHistory } = require("../../../helpers/mine");
const { openToken } = require("../../../helpers/jwt");
const { paginateData, getNextOffset } = require("../../../helpers/pagination");

//MINING HISTORY
exports.miningHistoryGet = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    const limit = req.query.limit || parseInt(process.env.LIMIT),currentPage = parseInt(req.query.page)|| 1;
    
    //Pagination VAR
    let paginationArr,link,prevBtn = null, nextBtn = null;

    const history = await getUserMinerHistory(id, limit, getNextOffset(currentPage, limit));
    
    await history.map(eh => {
        eh.m_start_time = extractTime(eh.m_start_time, "MMM D, YYYY h:mm:ss a")
        eh.m_end_time = extractTime(eh.m_end_time, "MMM D, YYYY h:mm:ss a")
    });
    
    //Pagination
    const pageData = await getUserMinerHistory(id,99999999999, 0);
    paginationArr = paginateData(limit, pageData.length);
  
    //Prev
    if (currentPage > 1) {
        prevBtn = currentPage - 1;
    }

    //Next
    if (currentPage !== "" && paginationArr[paginationArr.length - 1] > currentPage) {
        nextBtn = currentPage + 1
    };


    //Pagination Link
    const url = req.originalUrl.split("?")[0];

    link = `${url}?`

    //Response Back
    return res.render("user/pages/history/mining", {
        title: "Mining History",
        history,
        prevBtn,
        nextBtn,
        currentPage,
        paginationArr,
        link
    })
})
const asyncHandler = require("../../../helpers/asyncHandler");
const { getAllCoupons, generateCoupons, deleteCouponById } = require("../../../helpers/coupon");

const { openToken } = require("../../../helpers/jwt");
const { getPackages } = require("../../../helpers/packages");
const { paginateData, getNextOffset } = require("../../../helpers/pagination");
const { getUniqueID } = require("../../../helpers/uniqueID");

exports.adminCouponsGet = asyncHandler(async (req, res, next) => {

    const limit = req.query.limit || parseInt(process.env.LIMIT),currentPage = parseInt(req.query.page)|| 1, search = req.query.search, type = req.query.type;
   
    //Pagination VAR
    let paginationArr,link,prevBtn = null, nextBtn = null;

    const coupons = await getAllCoupons(limit, getNextOffset(currentPage, limit),search, type);
    

    //Get All Packages
    const packages = await getPackages();

    //Pagination
    const pageData = await getAllCoupons(99999999999, 0, search, type);
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
    return res.render("admin/pages/coupon/couponList", {
        title: "Coupons",
        coupons,
        packages,
        prevBtn,
        nextBtn,
        currentPage,
        paginationArr,
        link
    })
})


//GENERATE COUPON (POST)
exports.adminCouponsPost = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME])

    
    await generateCoupons(req.body.quantity,req.body.amount,id)

    
    res.json({ status: true, message: `${req.body.quantity} Coupon(s) Generated Successfully` })
    
})

//GENERATE COUPON (DELETE)
exports.adminCouponsDelete = asyncHandler(async (req, res, next) => {
    
    if (req.body.type === "mark_all") {
        await req.body.data.map(async dt => {
            await await deleteCouponById(dt.id) 
        })
    } else {
       await deleteCouponById(req.body.id) 
    }
    

    
    res.json({status:true,message:`Coupon(s) Deleted`})
})
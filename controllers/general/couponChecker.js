const asyncHandler = require("../../helpers/asyncHandler");
const { getCouponDetailsByKey } = require("../../helpers/coupon");


exports.couponCheckerGet = asyncHandler(async (req, res, next) => {
    
    return res.render("general/page/checker", {
        title: "Coupon Code Checker"
    })
    
})

exports.couponCheckerPost = asyncHandler(async (req, res, next) => {
    
    const details = await getCouponDetailsByKey(req.query.code);
    
    if(!details) return res.json({ status: false, message: `Coupon Not Found`})

    if(details.c_status) return res.json({ status: false, message: `Coupon Has Been Used By ${details.username}`})
    else return res.json({ status: true, message: `Coupon Is Valid & Intact`})


})

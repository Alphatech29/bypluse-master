const asyncHandler = require("../../helpers/asyncHandler");
const { calculatePercentage } = require("../../helpers/calculation");
const { getAllUserCoupons, generateCoupons, userDeleteCouponById, userDeleteAllCoupon } = require("../../helpers/coupon");
const { openToken } = require("../../helpers/jwt");
const { getPackages, getPackageById } = require("../../helpers/packages");
const { getNextOffset, paginateData } = require("../../helpers/pagination");
const { getUserById, editUserById } = require("../../helpers/user");

exports.userVendorGet = asyncHandler(async (req, res, next) => {

    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]), limit = req.query.limit || parseInt(process.env.LIMIT),currentPage = parseInt(req.query.page)|| 1, search = req.query.search, type = req.query.type;
   
    //Pagination VAR
    let paginationArr,link,prevBtn = null, nextBtn = null;

    const coupons = await getAllUserCoupons(id, limit, getNextOffset(currentPage, limit),search, type);
    const validCoupons = await getAllUserCoupons(id, 9999999,0,"", 0)
    const usedCoupons = await getAllUserCoupons(id, 9999999,0,"", 1)

    //Pagination
    const pageData = await getAllUserCoupons(id, 99999999999, 0, search, type);
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
    return res.render("user/pages/vendor/vendor", {
        title: "Vendors",
        coupons,
        validCoupons: validCoupons.length,
        usedCoupons: usedCoupons.length,
        total: pageData.length,
        prevBtn,
        nextBtn,
        currentPage,
        paginationArr,
        link
    })

})

//GENERATE NEW COUPON
exports.userVendorGenerateCouponGet = asyncHandler(async (req, res, next) => {
    
    //Get All Packages
    const packages = await getPackages();

    //Response Back
    return res.render("user/pages/vendor/new", {
        title: "Generate Coupon",
        packages
    })

})

//DELETE COUPON
exports.userVendorDelete = asyncHandler(async (req, res, next) => {
  
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    if(req.body.type === "all") await userDeleteAllCoupon(id)
    else await userDeleteCouponById(id, req.body.id)

    return res.json({ status:true, message:"Coupon(s) Deleted"})

})

//GENERATE NEW COUPON (POST)
exports.userVendorGenerateCouponPost = asyncHandler(async (req, res, next) => {

    //Check If Qunatity Is 0
    if(!parseInt(req.body.quantity)) return res.json({ status: false, message:`Minimum Coupon Must Be Greater Than ${req.body.quantity}`});

    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
   
    //Check If has Sufficient Vendor Balance
    const user = await getUserById(id);

    if(!user.plan_id) return res.json({ status: false, message:"You Have No Active Plan"});

    //Get User Plan
    const plan = await getPackageById(user.plan_id);

    if(!plan) return res.json({ status: false, message:"Plan Not Found"});


    //Amount To Deduct
    let amountToDeduct = (parseInt(req.body.quantity) * parseFloat(req.body.amount)) - calculatePercentage(plan.plan_vendor_coupon_commission,(parseInt(req.body.quantity) * parseFloat(req.body.amount)));
    

    if(user.vendor_balance < amountToDeduct) return res.json({ status: false, message:"Insufficient Vendor Balance"});

    await generateCoupons(req.body.quantity,req.body.amount,id)

    //Deduct Balance
    await editUserById(id, {
        vendor_balance: user.vendor_balance - amountToDeduct
    });

    //Response Back    
    return res.json({status: true, message:`${req.body.quantity} Coupon(s) Generated Successfully`})

})


const { userBlogGet, userBlogSingleGet, userSharePost } = require("../../controllers/user/blog");
const { userDashboardGet, userNoticeRead } = require("../../controllers/user/dashboard");
const { earningHistoryGet } = require("../../controllers/user/history/earning");
const { miningHistoryGet } = require("../../controllers/user/history/mining");
const { referralHistoryGet } = require("../../controllers/user/history/referral");
const { withdrawalHistoryGet } = require("../../controllers/user/history/withdrawal");
const { mineStart, mineRefresh } = require("../../controllers/user/mine");
const { packagesListGet, packagesListPut } = require("../../controllers/user/packages");
const { userProfileGet, userProfilePut, userPasswordGet, userPasswordPut } = require("../../controllers/user/settings");
const { userVendorGet, userVendorGenerateCouponGet, userVendorGenerateCouponPost, userVendorDelete } = require("../../controllers/user/vendor");


const { userWalletGet, userWalletPost, userWalletDelete } = require("../../controllers/user/wallet");
const { userMakeWithdrawalGet, userMakeWithdrawalPost } = require("../../controllers/user/withdrawal");
const { generalData } = require("../../middleware/generalData");

const { isUserLogin, isUserVerified, denyAdmin, isVendor } = require("../../middleware/isAuth");
const { userDetails } = require("../../middleware/userInfo");
const { userAvatarMulter } = require("../../multer/multerMiddleware");
const userRoute = require("express").Router();

//<!-----------------DASHBOARD------------------>
//DASHBOARD
userRoute.route("/dashboard").get(generalData, isUserLogin, userDetails, isUserVerified, denyAdmin, userDashboardGet);

//NOTICE
userRoute.route("/notice/read").post(isUserLogin, isUserVerified, denyAdmin, userNoticeRead);

//<!-----------------PACKAGES------------------>
//PACKAGES LIST
userRoute.route("/packages").get(generalData, isUserLogin, userDetails, isUserVerified, denyAdmin, packagesListGet).put(isUserLogin, denyAdmin, packagesListPut);

//<!-----------------WALLET------------------>
//WALLET
userRoute.route("/wallet").get(generalData, isUserLogin, userDetails, isUserVerified, denyAdmin, userWalletGet).post(isUserLogin, isUserVerified, denyAdmin, userWalletPost).delete(isUserLogin, isUserVerified, denyAdmin, userWalletDelete)

//<!-----------------SETTINGS------------------>
//PROFILE
userRoute.route("/settings/profile").get(generalData, isUserLogin, userDetails, isUserVerified, denyAdmin, userProfileGet).put(isUserLogin, isUserVerified, denyAdmin, userAvatarMulter.single("avatar"), userProfilePut)

//SECURITY
userRoute.route("/settings/security").get(generalData, isUserLogin, userDetails, isUserVerified, denyAdmin, userPasswordGet).put(isUserLogin, isUserVerified, denyAdmin, userPasswordPut)

//<!-----------------HISTORY------------------>
//EARNING HISTORY
userRoute.route("/history/earnings").get(generalData, isUserLogin, userDetails, isUserVerified, denyAdmin, earningHistoryGet)

//REFERRAL HISTORY
userRoute.route("/history/referrals").get(generalData, isUserLogin, userDetails, isUserVerified, denyAdmin, referralHistoryGet)

//WITHDRAWAL HISTORY
userRoute.route("/history/withdrawal").get(generalData, isUserLogin, userDetails, isUserVerified, denyAdmin, withdrawalHistoryGet)

//MINING HISTORY
userRoute.route("/history/mining").get(generalData, isUserLogin, userDetails, isUserVerified, denyAdmin, miningHistoryGet)


//<!-----------------WITHDRAWAL------------------>
//WITHDRAWAL
userRoute.route("/withdrawal").get(generalData, isUserLogin, userDetails, isUserVerified, denyAdmin, userMakeWithdrawalGet).post(isUserLogin, isUserVerified, denyAdmin, userMakeWithdrawalPost)


//<!-----------------MINE ENGINE------------------>
//START MINE
userRoute.route("/mine/start").post(isUserLogin, isUserVerified, denyAdmin, mineStart)

//REFRESH MINE
userRoute.route("/mine/refresh").post(isUserLogin, isUserVerified, denyAdmin, mineRefresh)

//<!-----------------SPONSORED BLOG------------------>
//BLOG LIST
userRoute.route("/blog").get(generalData, isUserLogin, userDetails, isUserVerified, denyAdmin, userBlogGet)

//BLOG SINGLE
userRoute.route("/blog/:slug").get(generalData, isUserLogin, userDetails, isUserVerified, denyAdmin, userBlogSingleGet)

//SHARE TO EARN
userRoute.route("/share").post(isUserLogin, isUserVerified, denyAdmin, userSharePost);

//<!-----------------VENDOR------------------>
//VENDOR
userRoute.route("/vendor").get(generalData, isUserLogin, userDetails, isUserVerified, denyAdmin, isVendor, userVendorGet).delete(generalData, isUserLogin, userDetails, isUserVerified, denyAdmin, isVendor, userVendorDelete);

//GENERATE COUPON
userRoute.route("/vendor/coupon").get(generalData, isUserLogin, userDetails, isUserVerified, denyAdmin, isVendor, userVendorGenerateCouponGet).post(generalData, isUserLogin, userDetails, isUserVerified, denyAdmin, isVendor, userVendorGenerateCouponPost)


module.exports = userRoute
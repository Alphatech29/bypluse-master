

const { adminCouponsGet, adminCouponsPost, adminCouponsDelete } = require("../../controllers/admin/coupon/coupon");

const { adminDashboardGet } = require("../../controllers/admin/dashboard");
const { adminGenerationList, adminGenerationPost, adminGenerationPut, adminGenerationDelete } = require("../../controllers/admin/generation");
const { adminUsersListGet, adminUserPut, adminUserDelete } = require("../../controllers/admin/members");
const { adminNoticeGet, adminNoticePost, adminNoticePut } = require("../../controllers/admin/notice");
const { adminPackageListGet, adminPackageListPost, adminPackageListPut, adminPackageListDelete } = require("../../controllers/admin/packages");
const { adminPageGet, adminPagePost, adminPageDelete, adminGetPageForEdit, adminPagePut } = require("../../controllers/admin/page");
const { adminPostListGet, adminCreatePost, adminGetPostForEditGet, adminEditPostPut, adminPostDelete, adminNewPostGet } = require("../../controllers/admin/post");
const { adminProfileSettingsGet, adminProfileSettingsPost } = require("../../controllers/admin/settings/profile");
const { adminSettingsPost, adminWebSettingsGet, adminSocialSettingsGet, adminIdentitySettingsGet, adminBonusesSettingsGet, adminBonusesSettingsPut, adminWithdrawalSettingsGet } = require("../../controllers/admin/settings/webSettings");
const { adminSpillOverGet, adminSpillOverPost } = require("../../controllers/admin/spillover");
const { adminWithdrawaltListGet, adminWithdrawalApprovedPut, adminWithdrawalDeletedDelete } = require("../../controllers/admin/withdrawal");
const { generalData } = require("../../middleware/generalData");
const { isAdmin, isUserLogin } = require("../../middleware/isAuth");
const { userDetails } = require("../../middleware/userInfo");
const { identityMulter, userAvatarMulter, postAttachmentMulter } = require("../../multer/multerMiddleware");


const adminRoute = require("express").Router();

//ADMIN DASHBOARD
adminRoute.route("/dashboard").get(generalData, isUserLogin, isAdmin, userDetails, adminDashboardGet);

//<!----------------COUPON---------------->
//COUPON
adminRoute.route("/coupon").get(generalData, isUserLogin, isAdmin, userDetails, adminCouponsGet).post(isUserLogin, isAdmin, adminCouponsPost).delete(isUserLogin, isAdmin, adminCouponsDelete);


//<!---------------------USERS------------------------>
//ADMIN USERS LIST (APPROVED,DELETE)
adminRoute.route("/users").get(generalData, isUserLogin, isAdmin, userDetails, adminUsersListGet).put(isUserLogin, isAdmin, adminUserPut).delete(isUserLogin, isAdmin, adminUserDelete);

//<!---------------------NOTICE------------------------>
//ADMIN NOTICE
adminRoute.route("/notice").get(generalData, isUserLogin, isAdmin, userDetails, adminNoticeGet).post(isUserLogin, isAdmin, adminNoticePost).put(isUserLogin, isAdmin, adminNoticePut)


//<!---------------------WITHDRAWAL------------------------>
//ADMIN WITHDRAWAL HISTORY (APPROVED,DELETE)
adminRoute.route("/withdrawal/:type").get(generalData, isUserLogin, isAdmin, userDetails, adminWithdrawaltListGet).put(isUserLogin, isAdmin, adminWithdrawalApprovedPut).delete(isUserLogin, isAdmin, adminWithdrawalDeletedDelete);

//<!---------------------SETTINGS & PROFILE------------------------>
//ADMIN SAVE SETTINGS (GENERAL)
adminRoute.route("/saved").post(isUserLogin, isAdmin, identityMulter.any(),  adminSettingsPost)

//ADMIN WEB SETTINGS
adminRoute.route("/websettings").get(generalData, isUserLogin, isAdmin, userDetails, adminWebSettingsGet)

//ADMIN SOCIAL SETTINGS
adminRoute.route("/social").get(generalData, isUserLogin, isAdmin, userDetails, adminSocialSettingsGet)


//ADMIN IDENTITY SETTINGS
adminRoute.route("/identity").get(generalData, isUserLogin, isAdmin, userDetails, adminIdentitySettingsGet)

//ADMIN BONUSES SETTINGS
adminRoute.route("/bonuses").get(generalData, isUserLogin, isAdmin, userDetails, adminBonusesSettingsGet).put(isUserLogin, isAdmin, adminBonusesSettingsPut)

//<!---------------------WITHDRAWAL SETTINGS------------------------>
//ADMIN BONUSES SETTINGS
adminRoute.route("/withdrawalSettings").get(generalData, isUserLogin, isAdmin, userDetails, adminWithdrawalSettingsGet).put(isUserLogin, isAdmin, adminBonusesSettingsPut)


//<!---------------------PAGES------------------------>
//ADMIN PAGES
adminRoute.route("/pages").get(generalData, isUserLogin, isAdmin, userDetails, adminPageGet).post(isUserLogin, isAdmin, adminPagePost).delete(isUserLogin, isAdmin, adminPageDelete)

//<!---------------------EDIT PAGE------------------------>
//ADMIN EDIT PAGE
adminRoute.route("/pages/:id").get(generalData, isUserLogin, isAdmin, userDetails, adminGetPageForEdit).put(isUserLogin, isAdmin, adminPagePut)


//<!---------------------POST------------------------>
//ADMIN POST
adminRoute.route("/posts").get(generalData, isUserLogin, isAdmin, userDetails, adminPostListGet).delete(isUserLogin, isAdmin, adminPostDelete)

//<!---------------------NEW POST------------------------>
//ADMIN NEW POST
adminRoute.route("/posts/new").get(generalData, isUserLogin, isAdmin, userDetails, adminNewPostGet).post(isUserLogin, isAdmin, postAttachmentMulter.any(), adminCreatePost)


//<!---------------------EDIT POST------------------------>
//ADMIN EDIT POST
adminRoute.route("/posts/:id").get(generalData, isUserLogin, isAdmin, userDetails, adminGetPostForEditGet).put(isUserLogin, isAdmin, postAttachmentMulter.any(), adminEditPostPut)


//<!---------------------PACKAGES------------------------>
//PACKAGE
adminRoute.route("/packages").get(generalData, isAdmin, isUserLogin, userDetails, adminPackageListGet).post(isAdmin, isUserLogin, adminPackageListPost).put(isAdmin, isUserLogin, adminPackageListPut).delete(isAdmin, isUserLogin, adminPackageListDelete)

//<!---------------------GENERATION------------------------>
//ADMIN GENERATION LIST (APPROVED,DELETE)
adminRoute.route("/generation").get(generalData, isAdmin, isUserLogin, userDetails, adminGenerationList).post(isAdmin, isUserLogin, adminGenerationPost).put(isAdmin, isUserLogin, adminGenerationPut).delete(isAdmin, isUserLogin, adminGenerationDelete);

//<!---------------------SPILLOVER------------------------>
//SPILLOVER
adminRoute.route("/spillover").get(generalData, isAdmin, isUserLogin, userDetails, adminSpillOverGet).post(isAdmin, isUserLogin, adminSpillOverPost)


//<!---------------------ADMIN PROFILE SETTINGS------------------------>
//ADMIN PROFILE
adminRoute.route("/profile").get(generalData, isUserLogin, isAdmin, userDetails, adminProfileSettingsGet).post(isUserLogin, isAdmin, userAvatarMulter.single("avatar"), adminProfileSettingsPost)

module.exports = adminRoute
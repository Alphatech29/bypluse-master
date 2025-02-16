const asyncHandler = require("../../helpers/asyncHandler");

//Notfound (All)
exports.notfoundAll = asyncHandler(async (req, res, next) => {
    
    return res.render("error/error", {
        title: "Resource Not Found",
        text: "The resource you are looking for cannot be found or has been moved from here."
    })
});
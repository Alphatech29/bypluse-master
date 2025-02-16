const asyncHandler = require("../../helpers/asyncHandler");
const { getUserWallet, createNewWallet, editWallet, deleteWallet } = require("../../helpers/wallet");
const { openToken } = require("../../helpers/jwt");



exports.userWalletGet = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    const wallet = await getUserWallet(id)

    return res.render("user/pages/wallet/wallet", {
        title: "My Wallet",
        wallet
    });

});


//CREATE NEW WALLET
exports.userWalletPost = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME])
    
    //Check If Already Has Wallet
    const wallet = await getUserWallet(id);
    if (!wallet) await createNewWallet({ ...req.body, w_user_id: id });
    else await editWallet(id, req.body)
    

    //Response To Client
    return res.json({ status: true, message: "Success", text: `Your wallet has been ${wallet ? 'edited' : 'created'} successfully` })
    

});

//DELETE WALLET
exports.userWalletDelete = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME])
    
    //Delete Wallet From DB
    await deleteWallet(id);

    //Response To Client
    return res.json({ status: true, message: "Wallet Deleted" })
    

});
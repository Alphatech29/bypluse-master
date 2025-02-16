const asyncHandler = require("../../../helpers/asyncHandler");
const { getBonuses, editBonuses } = require("../../../helpers/bonus");
const { saveSettings, getWebSettings } = require("../../../helpers/settings");
const logger = require("../../../helpers/logger");
const fs = require("fs");


//WEB SETTINGS
exports.adminWebSettingsGet = asyncHandler(async (req, res, next) => {
    res.render("admin/pages/settings/webSettings", {
        title: "Web Settings"
    })
})

//SOCIAL SETTINGS
exports.adminSocialSettingsGet = asyncHandler(async (req, res, next) => {
    res.render("admin/pages/settings/socialSettings", {
        title: "Social Media Settings"
    })
})

//BONUSES SETTINGS
exports.adminBonusesSettingsGet = asyncHandler(async (req, res, next) => {
    const bonuses = await getBonuses();

    res.render("admin/pages/settings/bonusSettings", {
        title: "Bonuses Settings",
        bonus: bonuses
    })
})

//BONUSES SETTINGS (PUT)
exports.adminBonusesSettingsPut = asyncHandler(async (req, res, next) => {
    await editBonuses(req.body);
    return res.json({status:true,message:"Changes Saved"})
})



//IDENTITY SETTINGS
exports.adminIdentitySettingsGet = asyncHandler(async (req, res, next) => {
    res.render("admin/pages/settings/identitySettings", {
        title: "Identity Settings"
    })
})

//WITHDRAWAL SETTINGS
exports.adminWithdrawalSettingsGet = asyncHandler(async (req, res, next) => {
    res.render("admin/pages/settings/withdrawalSettings", {
        title: "Withdrawal Settings"
    })
})


//ADMIN SETTING SAVED (POST)
exports.adminSettingsPost = asyncHandler(async (req, res, next) => {
    if (!req.imageName) {
      await saveSettings(req.body);  
    } else {

        await req.files.forEach(async img => {
            const settings = await getWebSettings();

            fs.unlink(`public${settings[img.filename]}`, (err) => {
                if (err) logger.debug(err)
            });

            await saveSettings({ [img.fieldname]: `/img/identity/${img.filename}` });
            
        });
        
        
    }
    
    return res.json({status:true,message:"Changes Saved"})
})
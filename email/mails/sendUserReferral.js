const transporter = require("../transporter");
const ejs = require("ejs")
const path = require("path");
const logger = require("../../helpers/logger");
const { getWebSettings } = require("../../helpers/settings");

exports.sendUserReferral = async (ref1Obj,ref2Obj) => {

    const { website_email, website_title, website_url, website_logo } = await getWebSettings()
    
    //Get The Template
    const html = await ejs.renderFile(path.join(process.cwd(),"email","templates","sendUserReferral.ejs"),{ref1Obj,ref2Obj,website_url,website_logo, website_title});

    const mailOptions = {
    from: `${website_title} <${website_email}>`,
    to: ref1Obj.email,
    subject: `You have a referral signup on ${website_title}`,
    html
    };

    transporter.sendMail(mailOptions, (err, result) => {
        if (err) {
            console.log(err)
            logger.debug(err)
        }
    })

    
}

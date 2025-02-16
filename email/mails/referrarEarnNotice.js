const transporter = require("../transporter");
const ejs = require("ejs")
const path = require("path");
const logger = require("../../helpers/logger");
const { getWebSettings } = require("../../helpers/settings");


exports.referralEarnNoticeMailer = async (user,user2) => {

    const { website_email, website_title, website_logo, website_url,website_currency, website_per_coin } = await getWebSettings()

    //Get The Template
    const html = await ejs.renderFile(path.join(process.cwd(), "email", "templates", "referralEarnNotice.ejs"), { user, user2, year: new Date().getFullYear(), website_title, website_url, website_logo, website_currency });
    
    const mailOptions = {
    from: `${website_title} <${website_email}>`,
    to: user.email,
    subject: `${website_title} Referral Comission`,
    html
    };

    transporter.sendMail(mailOptions, (err, result) => {
        if (err) {
            console.log(err)
            logger.debug(err)
        } else {
            console.log(result)
        }
    })

    
}

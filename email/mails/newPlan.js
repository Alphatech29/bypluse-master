const transporter = require("../transporter");
const ejs = require("ejs")
const path = require("path");
const logger = require("../../helpers/logger");
const { getWebSettings } = require("../../helpers/settings");

exports.alertNewPlan = async (user) => {

    const { website_email, website_title, website_url, website_logo,website_currency } = await getWebSettings()
    
    //Get The Template
    const html = await ejs.renderFile(path.join(process.cwd(),"email","templates","newPlan.ejs"),{user,website_currency,website_url,website_logo, website_title});

    const mailOptions = {
    from: `${website_title} <${website_email}>`,
    to: user.email,
    subject: `Plan subscription status on ${website_title}`,
    html
    };

    transporter.sendMail(mailOptions, (err, result) => {
        if (err) {
            console.log(err)
            logger.debug(err)
        }else{
            console.log("sent")
        }
    })

    
}

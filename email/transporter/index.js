const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
    host: 'mail.bypluse.com',
    port: 465,
    auth: {
        user: 'support@bypluse.com',
        pass: '@123456'
    },
    tls: {
        rejectUnauthorized: false
    },
});

module.exports = transporter
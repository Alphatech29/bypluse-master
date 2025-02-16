const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
  host: 'mail.bartanetwork.com',
  port: 465,
  auth: {
    user: 'support@bartanetwork.com',
    pass: 'iamtheowner'
      },
  tls: {
      rejectUnauthorized: false
    },
});

module.exports = transporter



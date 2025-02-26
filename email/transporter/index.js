const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', 
    port: 465,
    secure: true,
    auth: {
        user: 'byplusetechnology@gmail.com' , 
        pass: 'Iphonexr12'
    },
    tls: {
        rejectUnauthorized: false
    },
});

module.exports = transporter;

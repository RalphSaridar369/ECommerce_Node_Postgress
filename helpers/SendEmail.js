const nodemailer = require('nodemailer');


const SendEmail = (from, to, subject, message) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: from,
            pass: 'SP!DER123'
        }
    });

    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, () => { return })
}

module.exports = {
    SendEmail
}
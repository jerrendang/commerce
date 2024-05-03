const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const nodemailer = require('nodemailer');
const {User} = require('../../db/models');

router.get('/', asyncHandler(async (req, res, next) => {
    const {
        user_id,
        subject,
        message
    } = req.query;

    const user = await User.findByPk(user_id);
    const to = user.email;

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD
        }
    })

    const mailOptions = {
        from: 'djerren@gmail.com',
        to: to,
        subject: subject,
        html: message
    }

    const info = transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email: ", error);
        } else {
            console.log("Email sent: ", info.response);
        }
    })


    res.json({ message: info });
}))

module.exports = router;
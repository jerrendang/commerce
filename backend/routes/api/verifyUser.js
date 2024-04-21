const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { VerificationToken, User } = require('../../db/models');

const nodemailer = require('nodemailer');

router.get('/send', asyncHandler(async (req, res, next) => {
    const {userID, to} = req.query;
    const host = req.get('host');
    const newToken = Math.random().toString(36).substring(2);

    if (await VerificationToken.findOne({where: {user_id: userID}})){
        await VerificationToken.update({token: newToken}, {
            where: {
                user_id: userID
            }
        });
    }
    else{
        await VerificationToken.create({
            user_id: userID,
            token: newToken
        })
    }

    const link = "http://" + host + `/api/verify?token=${newToken}&userID=${userID}`
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD
        }
    });
    const mailOptions = {
        from: 'djerren@gmail.com',
        to: to, 
        subject: "Cloud Nine Verification",
        html: `Please click this link to verify ${link}`
    }
    const info = transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email: ", error);
        } else {
            console.log("Email sent: ", info.response);
        }
    })


    res.json({message: info});
}))

router.get('/', asyncHandler(async (req, res, next) => {
    const {userID, token} = req.query;

    const userToken = await VerificationToken.findOne({
        where: {
            user_id: userID
        }
    })

    if (userToken.token === token){
        await User.update({ verified: true }, {
            where: {
                id: userID
            }
        })
    }

    const redirectLink = process.env.NODE_ENV === 'production' ? '': 'http://localhost:3000/'
    res.redirect(redirectLink) //////////////////////////////////////////// redirect to production link
}))

module.exports = router;
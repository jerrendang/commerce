const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator')

const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');
const { setTokenCookie } = require('../../utils/auth');

const validateSignup = [
    check('username')
        .exists({ checkFalsey: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters'),
    check('email')
        .exists({ checkFalsey: true })
        .isEmail()
        .withMessage('Please provide a valid email'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email'),
    check('password')
        .exists({ checkFalsey: true })
        .isLength({ min: 6 })
        .withMessage('Please provide a password with at least 6 characters'),
    handleValidationErrors
]

router.get('/', asyncHandler(async (req, res, next) => {
    const {
        id
    } = req.query;

    const user = await User.findByPk(id);

    return res.json({user})
}))

router.post('/', validateSignup, asyncHandler(async (req, res, next) => {
    const { email, username, password } = req.body;
    const user = await User.signup(
        username,
        email,
        password
    )

    setTokenCookie(res, user);
    return res.json({ user });
}))

router.put('/', asyncHandler(async (req, res, next) => {
    const { field, value, id } = req.body;
    await User.update({ [field]: value}, {
        where: {
            id
        }
    })
    
    const user = await User.scope('currentUser').findByPk(id)

    return res.json({user})
}))

module.exports = router;
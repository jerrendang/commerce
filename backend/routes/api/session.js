const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const router = express.Router();

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
    check('credential')
        .exists({ checkFalsey: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username'),
    check('password')
        .exists({ checkFalsey: true })
        .withMessage('Please provide a password'),
    handleValidationErrors
]

router.get('/', restoreUser, asyncHandler(async (req, res, next) => { // restoring user with cookies
    const { user } = req;

    if (user) {
        return res.json({user})
    }
    return res.json({});
}))

router.post('/', validateLogin, asyncHandler(async (req, res, next) => { // login route
    const { credential, password } = req.body;
    const user = await User.login( credential, password );
    if (user) {
        setTokenCookie(res, user);
        
        return res.json({ user })
    }
    const err = new Error('Login failed.');
    err.title = "Login failed.";
    err.errors = ["The provided credentials were incorrect."];
    err.status = 401;
    return next(err);
}))

router.delete('/', (req, res) => { // logout route
    res.clearCookie('token');
    return res.json({ message: 'success' });
})

module.exports = router;
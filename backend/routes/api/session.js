const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const router = express.Router();

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Notification } = require('../../db/models');
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

router.get('/notification', asyncHandler(async (req, res, next) => {
    const {
        user_id
    } = req.query;

    const notifications = await Notification.findAll({
        where: {
            user_id
        }
    })

    res.json({notifications})
}))

router.get('/', restoreUser, asyncHandler(async (req, res, next) => { // restoring user with cookies
    const { user } = req;

    if (user) {
        const safeUser = await User.scope('currentUser').findByPk(user.id);
        return res.json({user: safeUser})
    }
    return res.json({});
}))

router.put('/notification', asyncHandler(async (req, res, next) => {   
    const {
        notifications
    } = req.body;

    for (let i of notifications){
        const notification = await Notification.findByPk(i.id);
        await notification.update({checked: true})
    }

    res.json({message: 'success'})
}))

router.post('/notification', asyncHandler(async (req, res, next) => {
    // user_id | buyer_id | message | item_id
    const {
        user_id,
        buyer_id,
        item_id,
        address
    } = req.body

    const notification = await Notification.create({
        seller_id: user_id,
        buyer_id,
        address,
        item_id
    })
    
    res.json({notification})
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
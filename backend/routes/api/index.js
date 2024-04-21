const express = require('express');
const router = express.Router();
const sessionRouter = require('./session');
const userRouter = require('./user');
const verifyUserRouter = require('./verifyUser');
const itemRouter = require('./item');
const stripeRouter = require('./stripe');

router.use('/session', sessionRouter); // login and restore session
router.use('/user', userRouter); // signup route
router.use('/verify', verifyUserRouter) // verify user
router.use('/item', itemRouter) // items
router.use('/stripe', stripeRouter) // stripe integration/handling

module.exports = router;
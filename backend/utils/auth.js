const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

const setTokenCookie = (res, user) => { // sending JWT token
    const token = jwt.sign(
        { data: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn) }
    )

    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('token', token, {
        maxAge: expiresIn * 1000,
        httpOnly: false,
        path: '/',
        secure: isProduction,
        sameSite: isProduction ? 'none': 'Lax'
    });

    return token;
}

const restoreUser = (req, res, next) => {
    const { token } = req.cookies;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.scope('currentUser').findByPk(id);
        } catch (e) {
            res.clearCookie('token');
            return next;
        }

        if (!req.user) res.clearCookie('token');

        return next();
    })
}

const requireAuth = [
    restoreUser,
    (req, res, next) => {
        if (req.user) return next();

        const err = new Error('unauthorized');
        err.title = 'Unauthorized';
        err.errors = ['Unauhorized'];
        err.status = 400;
        return next(err);
    }
];

module.exports = { setTokenCookie, restoreUser, requireAuth }
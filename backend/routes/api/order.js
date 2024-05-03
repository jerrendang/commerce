const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { Order } = require('../../db/models');

router.get('/', asyncHandler(async (req, res, next) => {
    const {
        buyer_id
    } = req.query

    const orders = await Order.findAll({
        where: {
            buyer_id: buyer_id
        }
    })

    res.json({orders});
}))

module.exports = router;
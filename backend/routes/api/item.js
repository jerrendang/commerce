const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const { Op } = require('sequelize');

const { Item } = require('../../db/models');

// another route for mass fetch/explore page by category and popularity
router.get('/explore', asyncHandler(async (req, res, next) => {
    const {
        category,
        count,
        page,
        user_id
    } = req.query;

    let items;

    if (category === 'All'){
        items = await Item.findAll({
            where: {
                user_id: {
                    [Op.ne]: user_id
                },
                sold: false,
                in_cart: false
            },
            order: [
                ['popularity_score', 'DESC'],
            ],
            limit: count,
            offset: (page - 1) * count
        })
    }
    else{
        items = await Item.findAll({
            where: {
                category: category,
                user_id: {
                    [Op.ne]: user_id
                },
                sold: false,
                in_cart: false
            },
            order: [
                ['popularity_score', 'DESC'],
            ],
            limit: count,
            offset: (page - 1) * count
        })
    }

    res.json({items});
}))

router.get('/:itemId', asyncHandler(async (req, res, next) => {
    const {
        itemId
    } = req.params;

    const item = await Item.findByPk(itemId);

    res.json({item})
}))

router.get('/', asyncHandler(async (req, res, next) => {
    const {
        user_id,
        sold
    } = req.query
    
    const items = await Item.findAll({
        where: {
            user_id,
            sold
        }
    })

    res.json({items});
}))

router.put('/', asyncHandler(async (req, res, next) => {
    const {
        item_id,
        field,
        value
    } = req.query
    
    const item = await Item.findByPk(item_id);

    await item.update({[field]: value});

    res.json({item});
}))

router.delete('/', asyncHandler(async (req, res, next) => {
    const {
        item_id
    } = req.query;

    const item = await Item.destroy({
        where: {
            id: item_id
        }
    })

    res.json({message: 'success'})
}))

router.post('/', asyncHandler(async (req, res, next) => {
    const {
        userID,
        price,
        name,
        description,
        category,
        photo_key
    } = req.body;

    const item = await Item.create({
        user_id: userID,
        price,
        name,
        description,
        category,
        photo_key
    })

    res.json({item});
}))

module.exports = router;
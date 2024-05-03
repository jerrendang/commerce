const express = require('express');
const { addAbortSignal } = require('stream');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);

const {User, Order, Notification} = require('../../db/models');

router.put('/checkout', async (req, res, next) => {
    const {
        price,
        destination_stripe_account_id,
        user_id,
        address,
        seller_id
    } = req.query

    const {
        items
    } = req.body

    let itemIDStr = '';

    for (let item of items){
        itemIDStr += item.id
    }

    const stripePrice = await stripe.prices.create({
        currency: 'usd',
        unit_amount: price * 100,
        product_data: {
            name: 'Cloud Nine purchase',
        },
    });

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
            {
                price: stripePrice.id,
                quantity: 1,
            },
        ],
        payment_intent_data: {
            application_fee_amount: 123 + (price * 100) * .05,
            transfer_data: {
                destination: destination_stripe_account_id,
            },
        },
        success_url: `http://localhost:8000/api/stripe/success?user_id=${user_id}&price=${price}&address=${address}&seller_id=${seller_id}`,
        cancel_url: 'http://localhost:3000/',
    });

    res.json({ session });
})

router.get('/secret', async (req, res, next) => {
    const {cost} = req.query;
    const intent = await stripe.paymentIntents.create({
        amount: cost,
        currency: 'usd',
    })
    
    res.json({ client_secret: intent.client_secret });
        
});

// success_url: `http://localhost:8000/api/stripe/success?user_id=${user_id}&price=${price}`
router.get('/success', async (req, res, next) => {
    const {
        user_id,
        price,
        address,
        seller_id
    } = req.query;

    const order = await Order.create({
        buyer_id: user_id,
        price: price,
        seller_id
    });

    const redirectLink = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000/success'

    res.redirect(redirectLink)
})

router.get('/return', async (req, res, next) => {
    const {user_id, stripe_account} = req.query;
    const user = await User.findByPk(user_id);
    if (user.stripe_account_id === stripe_account){
        await user.update({stripe_verified: true})
    }

    const redirectLink = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000/'
    res.redirect(redirectLink); // set production link here too ////////////////////////////////////
})

router.post('/account', async (req, res, next) => {
    const {user_id} = req.body;
    const user = await User.findByPk(user_id);

    const stripe_account = await stripe.accounts.create({
        type: 'express',
        country: 'US',
        default_currency: 'usd',
        email: user.email,
    })

    await user.update({stripe_account_id: stripe_account.id})

    const scoped_user = await User.scope('currentUser').findByPk(user_id);

    res.json({user: scoped_user})
})

router.post('/accountlink', async (req, res, next) => {
    const {account_id, refresh_url, return_url} = req.body;
    
    const stripe_account_link = await stripe.accountLinks.create({
        account: account_id,
        refresh_url,
        return_url,
        type: 'account_onboarding'
    })

    res.json({url: stripe_account_link.url})
})

module.exports = router;
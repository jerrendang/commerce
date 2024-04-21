const express = require('express');
const { addAbortSignal } = require('stream');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);

router.get('/secret', async (req, res) => {
    const {cost} = req.query;
    const intent = await stripe.paymentIntents.create({
        amount: cost,
        currency: 'usd',
    })
    
    res.json({ client_secret: intent.client_secret });
        
});
module.exports = router;
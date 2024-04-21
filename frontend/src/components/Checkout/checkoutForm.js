import React from "react";
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js'

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: process.env.NODE_ENV === 'production' ? '': 'http://localhost:3000',
            },
        });

        if (result.error) {
            console.log(result.error.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    }
  return (
    <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button type='submit'>Submit</button>
    </form>
  )
};

export default CheckoutForm;

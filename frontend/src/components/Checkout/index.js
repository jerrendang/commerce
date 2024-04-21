import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {useNavigate} from 'react-router-dom';

import { getItemsFromIdArr } from "../../store/cartReducer";
import { createPaymentIntent } from "../../store/payment";
import Loading from "../Loading";
import CheckoutForm from "./checkoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const Checkout = ({isLoaded}) => {
    const [checkoutLoading, setCheckoutLoading] = useState(true);
    const [checkoutItems, setCheckoutItems] = useState([]);
    const [options, setOptions] = useState({});
    const {user} = useSelector(state => state.session);
    const {itemIds} = useSelector(state => state.cart);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded) {
            if (JSON.stringify(user) === '{}') {
                navigate('/')
            }
            else if (!user.verified) {
                navigate('/verify')
            }
        }
    }, [isLoaded, user, navigate])

    useEffect(() => {
        setCheckoutLoading(true);
        if (itemIds.length > 0) {
            getItemsFromIdArr(itemIds)
                .then(data => setCheckoutItems(data))
                .then(() => createPaymentIntent(checkoutItems))
                .then(clientSecret => setOptions({clientSecret: clientSecret}))
                .then(() => setCheckoutLoading(false))
        }
        else {
            setCheckoutLoading(false);
            setCheckoutItems([])
        }
    }, [itemIds])

    if (checkoutLoading){
        return <Loading />
    }

    return (
        <>
            {
                isLoaded && (
                    <div>
                        <Elements stripe={stripePromise} options={options}>
                            <CheckoutForm />
                        </Elements>
                    </div>
                )
            }
        </>
  )
};

export default Checkout;

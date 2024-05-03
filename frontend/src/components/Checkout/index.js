import React, { useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {useNavigate} from 'react-router-dom';

import { getItemsFromIdArr } from "../../store/cartReducer";
import { createPaymentIntent } from "../../store/payment";
import { createCheckoutSession } from "../../store/payment";
import Loading from "../Loading";
import CheckoutForm from "./checkoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const Checkout = ({isLoaded}) => {
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [checkoutItems, setCheckoutItems] = useState([]);
    const [options, setOptions] = useState({});
    const [checkoutUrl, setCheckoutUrl] = useState('');
    const [address, setAddress] = useState('');
    const [addressSubmit, setAddressSubmit] = useState(false);
    const {user} = useSelector(state => state.session);
    const {itemIds} = useSelector(state => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        setAddressSubmit(true);
        localStorage.setItem('address',address)
    }

    useEffect(() => {
        if (isLoaded) {
            if (JSON.stringify(user) === '{}' || itemIds.length <= 0) {
                navigate('/')
            }
            else if (!user.verified) {
                navigate('/verify')
            }
        }
    }, [isLoaded, user, navigate, itemIds])

    useEffect(() => {
        if (addressSubmit){
            setCheckoutLoading(true)
            if (itemIds.length > 0) {
                getItemsFromIdArr(itemIds)
                    .then(data => setCheckoutItems(data))
            }
        }
    }, [itemIds, addressSubmit])

    useEffect(() => {
        if (checkoutItems.length > 0) {
            createCheckoutSession(checkoutItems, user.stripe_account_id, user.id, address)
                .then(data => setCheckoutUrl(data.session.url))
        }
    }, [checkoutItems])

    useEffect(() => {
        if (checkoutUrl){
            window.location.href = checkoutUrl
        }
    }, [checkoutUrl])

    if (checkoutLoading){
        return <Loading />
    }

    return (
        <form onSubmit={handleAddressSubmit}>
            <label>Where should we send your order?</label>
            <input type='text' onChange={e => setAddress(e.target.value)}></input>
            <button type='submit'>Submit</button>
        </form>
    )
};

export default Checkout;

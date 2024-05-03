import React, {useState, useEffect} from "react";
import {useSelector} from 'react-redux';
import {redirect} from 'react-router-dom'

import { createAccountLink } from "../../store/stripe";
import Loading from "../Loading";

const VerifyStripe = ({isLoaded}) => {
    const [onboardUrl, setOnboardUrl] = useState('');
    const {user} = useSelector(state => state.session);
    // home or verifyStripe
    // -> verifyStripe directly to stripe onboard url

    useEffect(() => {
        if (isLoaded && JSON.stringify(user) !== '{}'){
            createAccountLink(user.stripe_account_id, user.id)
                .then(data => setOnboardUrl(data))
        }
    }, [isLoaded])

    useEffect(() => {
        if (onboardUrl){
            window.location.href = onboardUrl;
        }
    }, [onboardUrl])

    if (!onboardUrl){
        return <Loading />
    }
};

export default VerifyStripe;

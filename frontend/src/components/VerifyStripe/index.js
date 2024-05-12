import React, {useState, useEffect} from "react";
import {useSelector} from 'react-redux';

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

    if (!onboardUrl){
        return <Loading />
    }

    return (
        <div className='w-[100%] h-[100%] flex justify-center items-center text-[black]'>
            Click <a href={onboardUrl}>here</a> to get onboarded with Stripe and start selling now!
        </div>
    )
};

export default VerifyStripe;

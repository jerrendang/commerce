import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import { fetcher } from '../../store/fetch';
import { restoreSession } from '../../store/sessionReducer';

const VerifyPage = ({isLoaded}) => {
    const {user} = useSelector(state => state.session);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleVerifyUser = async () => {
        const res = await fetcher(`/api/verify/send?userID=${user.id}&to=${user.email}`,{
            method: 'GET'
        });
        if (res.ok){
            dispatch(restoreSession());
        }
    }

    useEffect(() => {
        if (isLoaded) {
            console.log(user.verified)
            if (JSON.stringify(user) === '{}') {
                navigate('/')
            }
            else if (user.verified) {
                navigate('/home')
            }
        }
    }, [isLoaded, user, navigate])

    useEffect(() => {
        if (isLoaded){
            if (JSON.stringify(user) !== '{}'){
                if (!user.verified) {
                    handleVerifyUser()
                }
            }
        }
    }, [isLoaded])

  return (
    <>
        {
            isLoaded && (
                <div>
                    {
                        user.verified && (
                            <div>
                                email verified!
                                {/* link to home maybe */}
                            </div>
                        )
                    }
                    {
                        !user.verified && (
                            <div>
                                email has been sent to {user.email}
                                {/* send another if not sent within 5 minutes */}
                            </div>
                        )
                    }
                </div>
            )
        }
    </>
  )
};

export default VerifyPage;

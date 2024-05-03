import React, { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import profileDefault from '../../assets/user.svg';
import './Profile.css';
import EditFirstName from './EditFirstName';
import EditLastName from './EditLastName';
import EditUsername from "./EditUsername";
import Notifications from "./Notifications";

const Profile = ({isLoaded}) => {
    const {user} = useSelector(state => state.session);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [file, setFile] = useState();

    useEffect(() => {
        if (isLoaded){
            if (JSON.stringify(user) === '{}') {
                navigate('/')
            }
            else if (!user.verified) {
                navigate('/verify')
            }
        }
    }, [])
    
    return (
        <>
            {
                (isLoaded && JSON.stringify(user) !== '{}') && (
                    <div className='flex flex-row'>
                        <div className='h-[100%] w-[100%] flex flex-col justify-center items-center'>
                            <div className='profilePic relative h-[10em] w-[10em] m-[1em]
                            border-black border-[1px] border-solid flex items-center justify-center overflow-hidden'>
                                <img src={profileDefault} alt='profile pic' className='bg-cover h-[100%] w-[100%]' />
                                {/* <input className='hidden' 
                                    id='photoUpload' type='file' accept="image/png, image/jpeg" onChange={handleFileUpload}></input>
                                <label className='h-[100%] w-[100%] absolute hidden text-[3em] text-[white] bg-[rgba(0,0,0,.1)] cursor-pointer'
                                htmlFor="photoUpload">+</label> */}
                            </div>
                            <div className='items-start'>
                                <EditFirstName />
                                <EditLastName />
                                <EditUsername />
                            </div>
                        </div>
                        <div>
                            <Notifications />
                        </div>
                    </div>
                )
            }
        </>
    )
};

export default Profile;

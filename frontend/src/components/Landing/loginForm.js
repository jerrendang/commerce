import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import { login } from '../../store/sessionReducer';
import Loading from '../Loading';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loggingIn, setLogginIn] = useState(false);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(login(credential, password))
            .then(() => setLogginIn(true))
            .then(() => navigate('/home'))
            .catch(err => setErrors(err.errors))
        
    }

    if (loggingIn){
        return <Loading />
    }

    return (
        <div className='bg-[rgba(255,255,255,.3)] text-center h-[100%] w-[100%] p-[3vw] flex flex-col items-start justify-center overflow-hidden rounded-tr-2xl rounded-tl-2xl'>
            <div className='font-[norm-b] text-[1.5em]'>Login</div>
            <div>
                {
                    errors.map((err, idx) => (
                        <div key={idx} className='errors flex flex-row items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height='1em' className='mr-[5px]'>
                                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
                                    fill='white' />
                            </svg>
                            {err}
                        </div>
                    ))
                }
            </div>
            <form className='flex flex-col w-[100%] login-form'
            onSubmit={handleSubmit}>
                <span className='text-start w-[100%]'>
                    <label>Username or Email</label><br/>
                    <input type='text' className='border-black border-[1px] border-solid' onChange={e => setCredential(e.target.value)}></input>
                </span>
                <span className='text-start w-[100%]'>
                    <label>Password</label><br/>
                    <input type='text' className='border-black border-[1px] border-solid' onChange={e => setPassword(e.target.value)}></input>
                </span>
                <button type="submit" className=''>Login</button>
            </form>
        </div>
    )
}

export default LoginForm;
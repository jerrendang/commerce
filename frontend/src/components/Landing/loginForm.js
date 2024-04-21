import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import { login } from '../../store/sessionReducer';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(login(credential, password))
            .then(() => navigate('/home'))
            .catch(err => setErrors(err.errors))
        
    }

    return (
        <div>
            <div>Login</div>
            <div>
                {
                    errors.map((err, idx) => (
                        <span key={idx}>{err}</span>
                    ))
                }
            </div>
            <form onSubmit={handleSubmit}>
                <span>
                    <label>Username or Email</label>
                    <input type='text' className='border-black border-[1px] border-solid' onChange={e => setCredential(e.target.value)}></input>
                </span>
                <span>
                    <label>Password</label>
                    <input type='text' className='border-black border-[1px] border-solid' onChange={e => setPassword(e.target.value)}></input>
                </span>
                <button type="submit" className='border-black border-[1px] border-solid'>Login</button>
            </form>
        </div>
    )
}

export default LoginForm;
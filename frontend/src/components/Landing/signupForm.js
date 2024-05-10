import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {signup} from '../../store/sessionReducer';
import { createStripeAccount } from "../../store/stripe";

const SignupForm = () => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const {user} = useSelector(state => state.session);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === passwordConfirm){
            dispatch(signup(username, email, password))
                .then(() => navigate('/verify'))
                .catch(err => setErrors(err.errors))
        }
        else{
            setErrors([...errors, 'Passwords must match.'])
        }
    }

  return (
      <div className='bg-[rgba(255,255,255,.3)] text-start h-[100%] w-[100%] p-[3vw] flex flex-col items-start justify-center overflow-hidden rounded-tr-2xl rounded-tl-2xl'>
          <div className='font-[norm-b] text-[1.5em]'>Create an account with us!</div>
          <div>
              {
                  errors.map((err, idx) => (
                    <div key={idx} className='errors flex flex-row items-center'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height='1em' className='mr-[5px]'>
                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" 
                            fill='white'/>
                        </svg>
                        {err}
                    </div>
                  ))
              }
          </div>
          <form className='text-start signup-form'
          onSubmit={handleSubmit}>
              <span>
                  <label>Username</label>
                  <input type='text' className='' onChange={e => setUsername(e.target.value)}></input>
              </span>
              <span>
                <label>Email</label>
                <input type='text' className='' onChange={e => setEmail(e.target.value)}></input>
              </span>
              <span>
                  <label>Password</label>
                  <input type='text' className='' onChange={e => setPassword(e.target.value)}></input>
              </span>
              <span>
                  <label>Confirm Password</label>
                  <input type='text' className='' onChange={e => setPasswordConfirm(e.target.value)}></input>
              </span>
              <button type="submit" className='mt-[10px]'>Sign Up</button>
          </form>
    </div>
  )
};

export default SignupForm;

import { useState } from "react";
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {signup} from '../../store/sessionReducer';

const SignupForm = () => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(signup(username, email, password))
            .then(() => navigate('/home'))
            .catch(err => setErrors(err.errors))
    }
  return (
    <div>
          <div>Signup</div>
          <div>
              {
                  errors.map((err, idx) => (
                      <span key={idx}>{err}</span>
                  ))
              }
          </div>
          <form onSubmit={handleSubmit}>
              <span>
                  <label>Username</label>
                  <input type='text' className='border-black border-[1px] border-solid' onChange={e => setUsername(e.target.value)}></input>
              </span>
              <span>
                <label>Email</label>
                  <input type='text' className='border-black border-[1px] border-solid' onChange={e => setEmail(e.target.value)}></input>
              </span>
              <span>
                  <label>Password</label>
                  <input type='text' className='border-black border-[1px] border-solid' onChange={e => setPassword(e.target.value)}></input>
              </span>
              <button type="submit" className='border-black border-[1px] border-solid'>Login</button>
          </form>
    </div>
  )
};

export default SignupForm;

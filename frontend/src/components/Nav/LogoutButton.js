import React from "react"
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import { logout } from "../../store/sessionReducer";
import { changePage } from "../../store/navReducer";

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        dispatch(logout())
          .then(() => dispatch(changePage(0)))
          .then(() => navigate('/'))
    }
  return (
    <div className='w-fit p-[10px] rounded-2xl'>
      <label htmlFor='logout' className='hover:cursor-pointer'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height='1.2em'>
          <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" 
        fill="white"/>
        </svg>
      </label>
      <button id="logout" onClick={handleLogout} className='hidden'>Logout</button>
    </div>
  )
};

export default LogoutButton;

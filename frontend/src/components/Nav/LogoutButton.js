import React from "react"
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import { logout } from "../../store/sessionReducer";

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        dispatch(logout())
          .then(() => navigate('/'))
    }
  return (
    <button onClick={handleLogout}>Logout</button>
  )
};

export default LogoutButton;

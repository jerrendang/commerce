import { useState, useEffect } from "react";
import {redirect, useNavigate, useLocation} from 'react-router-dom';
import {useSelector } from 'react-redux';

import LoginForm from "./loginForm";
import SignupForm from "./signupForm";

const Landing = ({isLoaded}) => {
    const [login, setLogin] = useState(true);
    const navigate = useNavigate();
    const {user} = useSelector(state => state.session);

    useEffect(() => {
        if (isLoaded){
            if (JSON.stringify(user) !== "{}"){
                navigate('/home');
            }
        }
    }, [user])

    const form = login ? <LoginForm />: <SignupForm />;

    return (
        <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
            <div className='border-black border-[3px] border-solid'>
                {form}
                <button onClick={() => setLogin(!login)}>switch</button>
            </div>
        </div>
    )
}

export default Landing;
import { useState, useEffect } from "react";
import {redirect, useNavigate, useLocation} from 'react-router-dom';
import {useSelector } from 'react-redux';

import LoginForm from "./loginForm";
import SignupForm from "./signupForm";
import './Landing.css'

const img1 = require('../../assets/img1.jpg');
const logo = require('../../assets/logo.png');
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthsOfYear = ['Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']

const Landing = ({isLoaded}) => {
    const [login, setLogin] = useState(true);
    const [day, setDay] = useState();
    const [month, setMonth] = useState();
    const [date, setDate] = useState();
    const [year, setYear] = useState();
    const navigate = useNavigate();
    const {user} = useSelector(state => state.session);

    useEffect(() => {
        if (isLoaded){
            if (JSON.stringify(user) !== "{}"){
                navigate('/home');
            }
        }
    }, [user])

    useEffect(() => {
        const newDate = new Date();
        setDate(newDate.getDate());
        setDay(daysOfWeek[newDate.getDay()]);
        setMonth(monthsOfYear[newDate.getMonth()])
        setYear(newDate.getFullYear())
    }, [])


    return (
        <div className='h-[100%] w-[100%] overflow-hidden landing'>
            {/* logo link back to landing */}
            <div className='h-[100%] w-[100%] overflow-hidden absolute min-w-[1400px]'>
                <img src={img1} alt='landing' className="object-contain w-[100%] left-0 top-0"/>
            </div>

            {/* logo */}
            <div className='absolute left-0 top-0 p-[5px]'>
                <img src={logo} alt='logo' height='100px' width='100px'/>
            </div>

            <div className='absolute top-0 bottom-0 my-auto ml-[3vw] h-fit'>
                <div className='font-[norm-b] text-center'>
                    <div className='text-[2em] text-brown-brownblack text-start leading-[1em]'>{day} {month} {date}, {year}</div>
                    <div className='text-[9.5em] leading-[1.25em]'>Cloud<span className='text-brown-lightbrown'>Nine</span></div>
                    <div className='flex flex-col text-[2em] items-end'>
                        <div>Fashion Marketplace</div>
                        <div>Where Trends Soar</div>
                    </div>
                    <div className='flex flex-row text-[1.5em] justify-center items-center'>
                        
                    </div>
                </div>
                <div>

                </div>
            </div>

            <div className='z-[1] flex absolute left-[60%] w-[40%] h-[50%] mb-[auto] mt-[auto] top-0 bottom-0 text-center justify-center items-center'>
                <div className='relative h-[100%] w-[100%] mr-[3vw] min-w-[400px]'>
                    <div className={`${login ? 'show-form' : 'hide-form'} absolute top-0 h-[100%] w-[100%]`}>
                        <LoginForm />
                        <button onClick={() => setLogin(!login)} className='rounded-br-2xl rounded-bl-2xl'>Create an account</button>
                    </div>
                    <div className={`${login ? 'hide-form' : 'show-form'} h-[100%] w-[100%]`}>
                        <SignupForm />
                        <button onClick={() => setLogin(!login)} className='rounded-br-2xl rounded-bl-2xl'>Already have an account? Log in</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing;
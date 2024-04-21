import {useState, useEffect} from "react"
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import LogoutButton from "./LogoutButton";

const Nav = ({isLoaded}) => {
    const [showNav, setShowNav] = useState(false);
    const {user} = useSelector(state => state.session);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded){
            if (JSON.stringify(user) !== '{}'){ // there is a user
                if (user.verified === false) { // not verified
                    setShowNav(false);
                }
                else{ // verified
                    setShowNav(true);
                }
            }
            else{ // no user
                setShowNav(false);
            }
        }
    }, [user]);
    
    return (
    <>
    {
        showNav && (
            <div className='flex flex-col sticky bg-[red] w-[8vw] h-[100vh]'>
                <span><button onClick={e => navigate('/home')}>Home</button></span>
                <span><button onClick={e => navigate('/explore')}>Explore</button></span>
                <span><button onClick={e => navigate('/cart')}>Cart</button></span>
                <span><button onClick={e => navigate('/profile')}>Profile</button></span>
                <span>
                    <LogoutButton />
                </span>
            </div>
        )
    }
    </>
    )
};

export default Nav;

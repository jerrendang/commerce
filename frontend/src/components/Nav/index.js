import {useState, useEffect} from "react"
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import LogoutButton from "./LogoutButton";
import { getNotifications } from "../../store/sessionReducer";
import { changePage } from "../../store/navReducer";
import './Nav.css';


const Nav = ({isLoaded}) => {
    const [showNav, setShowNav] = useState(false);
    const [notif, setNotif] = useState(false);
    const {user} = useSelector(state => state.session);
    const {page} = useSelector(state => state.nav);
    const {itemIds} = useSelector(state => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlePageChange = (path, num) => {
        navigate(path)
        dispatch(changePage(num))
    }

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

    useEffect(() => {
        if (JSON.stringify(user) !== '{}'){
            getNotifications(user.id)
                .then(data => {
                    let set = false;
                    for (let notification of data.notifications) {
                        if (!notification.checked) {
                            set = true;
                        }
                    }
                    setNotif(set)
                })
        }
    })
    
    return (
    <>
    {
        showNav && (
            <div className='flex flex-col fixed bg-brown-brownblack w-[10em] h-[100vh] p-[1em] color-[white] z-[2]'>
                <span><button className={`text-[1.5em] ${page === 0 ? 'pageSelected': ''}`}
                onClick={e => handlePageChange('/home', 0)}>Your Shop</button></span>

                <span><button className={`text-[1.5em] ${page === 1 ? 'pageSelected': ''}`} 
                onClick={e => handlePageChange('/explore', 1)}>Explore</button></span>

                <span><button className={`text-[1.5em] flex flex-row items-center justify-center ${page === 2 ? 'pageSelected' : ''}`} 
                onClick={e => handlePageChange('/profile', 2)}>
                    <span>Profile</span>
                    <span className={`${notif ? '': 'hidden'} right-0`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height='.8em' width='1em' className='bell'>
                            <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" 
                        fill='white'/>
                        </svg>
                    </span>
                </button></span>

                <span><button className={`text-[1.5em] ${page === 3 ? 'pageSelected': ''}`}
                onClick={e => handlePageChange('/orders', 3)}>Orders</button></span>

                <div className={`flex flex-row justify-between absolute w-auto bottom-0 right-0 left-0 p-[1em]`}>
                    <div onClick={e => handlePageChange('/cart', 4)} className={`relative p-[10px] rounded-2xl ${page === 4 ? 'pageSelected' : ''}`}>
                        <span className={`absolute right-0 top-0 text-[.7em] h-[.7em] w-[.7em] rounded-full p-[.5em] bg-[rgba(0,0,255,1)] ${itemIds.length > 0 ? '':'hidden'}`}></span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" height='1.2em'>
                            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" 
                        fill='white'/> 
                        </svg>
                    </div>
                    <div>
                        <LogoutButton />
                    </div>
                </div>
            </div>
        )
    }
    </>
    )
};

export default Nav;

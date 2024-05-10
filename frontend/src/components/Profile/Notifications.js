import React, {useState, useEffect} from "react"
import {useSelector} from 'react-redux';

import Loading from "../Loading";
// import { getNotifications, checkNotifications, getUser } from "../../store/sessionReducer";
import { getNotifications, checkNotifications, getUser } from '../../store/sessionReducer'
import { getItemsFromNotif } from "../../utils/notifications";

const Notifications = () => {
    const [loadingNotifications, setLoadingNotifications] = useState(true);
    const [notifs, setNotifs] = useState([]);
    const [items, setItems] = useState([]);
    const {user} = useSelector(state => state.session);

    useEffect(() => {
        getNotifications(user.id)
            .then(data => setNotifs(data.notifications))
    }, [user])

    useEffect(() => {
        if (notifs.length > 0){
            checkNotifications(notifs)
                .then(() => getItemsFromNotif(notifs))
                .then((data) => setItems(data)) 
                .then(setLoadingNotifications(false))
        }
        else{
            setLoadingNotifications(false)
        }
    }, [notifs])

    if (loadingNotifications){
        return (<Loading />)
    }

    if (items.length <= 0){
        return (
            <div className='text-[black]'>No notifications yet.</div>
        )
    }

    return (
        <div className='p-[1em]'>
            <div className='text-[2em] mb-[1em]'>Items Sold</div>
            <div className='flex flex-row'>
                {
                    items.length > 0 && notifs.map((notif, idx) => {
                        return (
                            <div key={idx} className='bg-brown-brownwhite text-[white] p-[1em] m-[.5em]'>
                                <div className='italic text-[rgba(255,255,255,.6)] text-[1.1em]'>Item Sold</div>
                                <div className='text-[1.3em] font-[1000]'>{items[idx].name}</div>
                                <div className='italic text-[rgba(255,255,255,.6)]'>To be delivered to:</div>
                                {notif.address}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default Notifications;

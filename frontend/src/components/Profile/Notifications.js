import React, {useState, useEffect} from "react"
import {useSelector} from 'react-redux';

import Loading from "../Loading";
import { getNotifications } from "../../store/sessionReducer";

const Notifications = () => {
    const [loadingNotifications, setLoadingNotifications] = useState(true);
    const [notifs, setNotifs] = useState([]);
    const {user} = useSelector(state => state.session);

    useEffect(() => {
        getNotifications(user.id)
            .then(data => setNotifs(data.notifications))
            .then(() => setLoadingNotifications(false))
    }, [user])

    if (loadingNotifications){
        return (<Loading />)
    }

    return (
    <div>
        {
            notifs.map((notif, idx) => {
                return (
                    <div key={idx}>
                        {notif.address}
                        <div>buyer_id {notif.buyer_id}</div>
                        <div>item_id {notif.item_id}</div>
                    </div>
                )
            })
        }
    </div>
    )
};

export default Notifications;

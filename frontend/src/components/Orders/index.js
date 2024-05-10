import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import { getUserOrders } from "../../store/fetch";
import Loading from "../Loading";
import OrderTile from "./OrderTile";

const Orders = ({isLoaded}) => {
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [userOrders, setUserOrders] = useState([]);
    const {user} = useSelector(state => state.session);
    const navigate = useNavigate();

    const dispatch = useDispatch()

    useEffect(() => {
        if (isLoaded) {
            if (JSON.stringify(user) === '{}') {
                navigate('/')
            }
            else if (!user.verified) {
                navigate('/verify')
            }
        }
    }, [isLoaded, user, navigate])

    useEffect(() => {
        if (JSON.stringify(user) !== '{}'){
            setOrdersLoading(true)
            getUserOrders(user.id)
                .then(data => setUserOrders(data.orders))
                .then(() => setOrdersLoading(false))
        }
    }, [isLoaded, user])

    if (ordersLoading){
        return <Loading />
    }

    if (userOrders.length <= 0){
        return (
            <div className='text-[black]'>No orders placed yet!</div>
        )
    }

    return (
    <div className='flex flex-col overflow-x-hidden'>
        <div className='text-[1.5em] text-[black]'>Orders Placed</div>
        <div className='flex flex-row flex-wrap overflow-x-hidden'>
        {
            userOrders.map((order, idx) => {
                return (
                    <div key={idx}>
                        <OrderTile order={order}/>
                    </div>
                )
            })
        }
        </div>
    </div>
    )
};

export default Orders;

import React, {useState, useEffect} from "react"
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import { editItemFunc, getItem, getItemByID } from "../../store/item";
import { resetCart } from "../../store/cartReducer";
import { newNotification } from "../../store/sessionReducer";
import { sendEmail } from "../../utils/email";
import { fetcher } from "../../store/fetch";

const OrderSuccess = ({isLoaded}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector(state => state.session);
    const {itemIds} = useSelector(state => state.cart);

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
        // reset cart and set items to sold
        // 
        // get items from idarr
        // set to sold for each
        // reset cart reducer
        // reset localstorage
        if (itemIds.length > 0 && JSON.stringify(user) !== '{}'){
            const address = localStorage.getItem('address');
            new Promise((resolve, reject) => {
                for (let id of itemIds) {
                    editItemFunc(id, 'sold', true);
                    // to subject message
                    getItemByID(id)
                        .then(data => {
                            const message = `${data.item.name} has been sold to ${user.username}.`
                            newNotification(data.item.user_id, user.id, address, id)
                            sendEmail(data.item.user_id, 'Item Sold', message)
                        })
                }
                resolve()
            })
                .then(() => {
                    dispatch(resetCart([]))
                    localStorage.setItem('cart', [])
                })
        }

    }, [itemIds, user])

    // export const editItemFunc = async (item_id, field, value) => {
    //     const res = await fetcher(`/api/item?item_id=${item_id}&field=${field}&value=${value}`, {
    //         method: 'PUT'
    //     })

    //     if (res.ok) {
    //         return await res.json();
    //     }
    // }


    return (
    <div>
        Your order has been placed! 
    </div>
    )
}

export default OrderSuccess;

import React, {useState, useEffect} from "react"

import { convertDate } from "../../utils/date";
import { getUser } from "../../store/sessionReducer";

const OrderTile = ({order}) => {
    const {year, month, day, dayOfWeek} = convertDate(order.createdAt);
    const [seller, setSeller] = useState();
    console.log(order)

    useEffect(() => {  
        getUser(order.seller_id)
            .then(data => console.log(data))
    })

    return (
    <div className='bg-brown-brownwhite text-[white] p-[1em] m-[1em]'>
        <div className='text-[rgba(255,255,255,.6)] italic'>Placed on:</div>
        <div className='font-[1000] text-[1.1em]'>{dayOfWeek} {month}/{day}/{year}</div>
        <div className='text-[rgba(255,255,255,.6)] italic'>Total:</div>
        <div>${order.price}</div>
    </div>
    )
};

export default OrderTile;

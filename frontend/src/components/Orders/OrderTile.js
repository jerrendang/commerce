import React from "react"

const OrderTile = ({order}) => {
    return (
    <div className='bg-[red]'>
        <div>{order.price}</div>
        <div>{order.id}</div>    
    </div>
    )
};

export default OrderTile;

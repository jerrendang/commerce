import React, {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';

import { changeModal } from "../../store/itemModal";
import { addToCart } from "../../store/cartReducer";
import { rerender } from "../../store/sessionReducer";

const ItemModal = ({isLoaded}) => {
    const user = useSelector(state => state.session.user);
    const show = useSelector(state => state.itemModal.showModal);
    const item = useSelector(state => state.itemModal.item);
    const imageLink = useSelector(state => state.itemModal.imageLink);
    const dispatch = useDispatch();

    const handleAddToCart = (e) => {
        dispatch(addToCart(item.id))
            .then(() => dispatch(changeModal(false)))
            .then(() => dispatch(rerender()))

    }

    const handleBackgroundClick = (e) => {
        e.stopPropagation();
        dispatch(changeModal(false))
    }

    useEffect(() => {
        if (isLoaded) {
            if (JSON.stringify(user) === '{}' || !user.verified || JSON.stringify(item) === '{}') {
                dispatch(changeModal(false));
            }
        }
    }, [isLoaded, user])

    return (
    <div className={`${show ? '' : 'hidden'} absolute z-[2] w-[100vw] h-[100vh] bg-[rgba(0,0,0,.6)] flex items-center justify-center
    hover:cursor-pointer`}
    onClick={handleBackgroundClick}>
        <div className='h-[40%] w-[40%] bg-[red]
        hover:cursor-default'
        onClick={e => e.stopPropagation()}>
            {/* <img src={imageLink} alt={item.name}/> */}

            {/* check cart before adding for dupes */}
            {/* also set modal to false */}
            <div className='hover:cursor-pointer'
            onClick={handleAddToCart}>add to cart</div> 
        </div>
    </div>
    )
};

export default ItemModal;

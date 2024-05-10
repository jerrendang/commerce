import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';

import { changeModal } from "../../store/itemModal";
import { addToCart } from "../../store/cartReducer";
import { rerender } from "../../store/sessionReducer";
import { getUser } from "../../store/sessionReducer";

const ItemModal = ({isLoaded}) => {
    const [modalSeller, setModalSeller] = useState();
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

    useEffect(() => {
        if (show) {
            getUser(item.user_id)
                .then(data => setModalSeller(data.user))
        }
    }, [show])  

    if (JSON.stringify(user) !== '{}' && modalSeller){
    return (
    <div className={`${show ? '' : 'hidden'} absolute z-[2] w-[100vw] h-[100vh] bg-[rgba(0,0,0,.6)] flex items-center justify-center
    hover:cursor-pointer`}
    onClick={handleBackgroundClick}>
        <div className='h-[40%] w-[40%] flex flex-row bg-brown-brownblack text-[white]
        hover:cursor-default'
        onClick={e => e.stopPropagation()}>
            <div className='h-[100%] w-[40%] flex justify-center items-center p-[1em]'>
                <img src={imageLink} alt={item.name} className='object-contain w-[100%]'/>
            </div>
            <div className='overflow-scroll p-[1em]'>
                <div className='text-[2em] font-norm-b font-[1000]'>{item.name}</div>
                <div className='italic text-[rgba(255,255,255,.6)]'>{modalSeller.username}</div>
                <div className='font-norm-b leading-[2em] text-[2em]'>${item.price}</div>
                <div className='flex flex-wrap'>{item.description}</div>
                <button className='hover:cursor-pointer text-brown-brownblack bg-[white] px-[1em] my-[1em]'
                onClick={handleAddToCart}>Add to cart</button> 
            </div>
        </div>
    </div>
    )
    }
};

export default ItemModal;

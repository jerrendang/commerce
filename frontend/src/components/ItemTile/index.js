import React, { useEffect, useState } from "react"
import {useSelector, useDispatch} from 'react-redux';

import { editItemFunc, signURL } from "../../store/item";
import { changeEditModal, changeModal } from "../../store/itemModal";

const ItemTile = ({item, sold = false, seller = false}) => {
    const [imageURL, setImageURL] = useState('');
    const dispatch = useDispatch();

    const handleGetURL = async () => {
        const url = await signURL(item.photo_key)
        setImageURL(url)
    }

    const handleModalShow = (e) => {
        if (seller){
            dispatch(changeEditModal(true, item))
        }
        else{
            editItemFunc(item.id, 'popularity_score', item.popularity_score + 1)
                .then(() => dispatch(changeModal(true, item, imageURL)))
        }          
    }

    useEffect(() => {
        if (item){
            handleGetURL();
        }
    }, [item])

    return (
        // delete item
        // edit item

        <div className='hover:cursor-pointer w-[10em] h-[10em] bg-[blue]' onClick={handleModalShow}>
            {/* <img src={imageURL} alt={item.photo_key}/> */}
            <span>
                {/* bold */}
                <p>Name:</p>
                {item.name}
            </span>
            <span>
                {/* normal */}
                <p>Price:</p>
                {item.price} 
            </span>
        </div>
    )
};

export default ItemTile;

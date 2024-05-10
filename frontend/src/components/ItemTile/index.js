import React, { useEffect, useState } from "react"
import {useSelector, useDispatch} from 'react-redux';

import { editItemFunc, signURL } from "../../store/item";
import { changeEditModal, changeModal } from "../../store/itemModal";
import Loading from "../Loading";
import { fetcher } from "../../store/fetch";
import { getUser } from "../../store/sessionReducer";

import './ItemTile.css';

const ItemTile = ({item, sold = false, seller = false}) => {
    const [itemLoading, setItemLoading] = useState(true);
    const [imageURL, setImageURL] = useState('');
    const [itemSeller, setItemSeller] = useState();
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
            new Promise((resolve, reject) => {
                handleGetURL();
                resolve();
            })
                .then(() => getUser(item.user_id)) 
                .then(data => setItemSeller(data.user))
                .then(() => setItemLoading(false))
        }
    }, [item])

    if (itemLoading){
        return <Loading />
    }

    return (
        <div className='itemTile hover:cursor-pointer w-[15em] h-[15em] mr-[4em] text-[black] rounded-2xl ' onClick={handleModalShow}>
            <div className='w-[100%] h-[50%] p-[.5em] flex justify-center items-center relative overflow-hidden object-contain'>
                <img src={imageURL} alt={item.photo_key} className="object-contain h-[100%]"/>
            </div>
            <div className='m-[1em]'>
                <div className='flex flex-row justify-between items-center text-[1.3em]'>
                    <div className='font-norms-b font-[1000]'>{item.name}</div>
                    <div className='font-norms-b font-[1000]'>${item.price}</div>
                </div>
                <div className='font-[500] text-[rgba(0,0,0,.6)]'><i>{itemSeller.username}</i></div>
            </div>
        </div>
    )
};

export default ItemTile;

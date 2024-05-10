import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';

import { changeEditModal } from "../../store/itemModal";
import { deleteItem } from "../../store/item";
import { rerender } from "../../store/sessionReducer";
import { editItemFunc } from "../../store/item";

const EditItem = ({isLoaded}) => {
    const {editItem, showEditModal} = useSelector(state => state.itemModal);
    const {user} = useSelector(state => state.session);
    const [itemNameField, setItemNameField] = useState('');
    const [itemDescField, setItemDescField] = useState('');
    const [itemPriceField, setItemPriceField] = useState();
    const [itemQuantityField, setItemQuantityField] = useState();

    const [editError, setEditError] = useState(false);
    const dispatch = useDispatch();

    const handleSaveEdits = (e) => {
        if (itemNameField === '' || itemDescField === '' || itemPriceField < 0 || itemQuantityField <= 0){
            // no name
            // no description
            // price less than 0
            // quantity less than 1
            setEditError(true);
        }
        else{
            setEditError(false);
            editItemFunc(editItem.id, 'name', itemNameField)
                .then(() => editItemFunc(editItem.id, 'description', itemDescField))
                .then(() => editItemFunc(editItem.id, 'price', itemPriceField))
                .then(() => editItemFunc(editItem.id, 'quantity', itemQuantityField))
                .then(() => dispatch(changeEditModal(false)))
                .then(() => dispatch(rerender()))
        }
    }

    const handleEditItemBackgroundClick = (e) => {
        dispatch(changeEditModal(false));
    }

    const handleDeleteItem = (e) => { 
        deleteItem(editItem.id, editItem.photo_key)
            .then(() => dispatch(changeEditModal(false)))
            .then(() => dispatch(rerender()))
    }

    useEffect(() => {
        if (isLoaded) {
            if (JSON.stringify(user) === '{}' || !user.verified || JSON.stringify(editItem) === '{}') {
                dispatch(changeEditModal(false));
            }
        }
    }, [isLoaded, user])

    useEffect(() => {
        if (JSON.stringify(editItem) !== '{}' && editItem){
            setItemNameField(editItem.name);
            setItemDescField(editItem.description);
            setItemPriceField(editItem.price);
            setItemQuantityField(editItem.quantity);
        }
    }, [editItem])
    
    return (
        <div className={`${showEditModal ? '': 'hidden'} 
        absolute z-[2] w-[100vw] h-[100vh] bg-[rgba(0,0,0,.6)] flex items-center justify-center hover:cursor-pointer`}
        onClick={handleEditItemBackgroundClick}>
            <div className='h-[40%] w-[40%] p-[1em] bg-brown-brownblack relative
            hover:cursor-default'
            onClick={e => e.stopPropagation()}>
                {/* delete */}
                <div onClick={handleDeleteItem}
                    className={`hover:cursor-pointer p-[1em] absolute right-0 bottom-0`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height='1em'>
                        <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" 
                        fill='white'/>
                    </svg>
                </div>

                {/* form errors */}
                {
                    editError && (
                        <div>
                            All fields must have a value.
                        </div>
                    )
                }

                {/* edit fields */}
                <div className='text-[1.5em]'>Edit item</div>
                <div>
                    <span>Name: </span>
                    <input id='editItemName' value={itemNameField ? itemNameField: ''} onChange={e => setItemNameField(e.target.value)}/>
                </div>
                <div>
                    <span>Description: </span>
                    <input id='' value={itemDescField ? itemDescField : ''} onChange={e => setItemDescField(e.target.value)} />
                </div>
                <div>
                    <span>Price</span>
                    <input id='' type='number' min={0} step={.01} value={itemPriceField ? itemPriceField : ''} onChange={e => setItemPriceField(e.target.value)} />
                </div>
                <div>
                    <span>Quantity</span>
                    <input id='' type='number' min={0} step={1} value={itemQuantityField ? itemQuantityField : ''} onChange={e => setItemQuantityField(e.target.value)} />
                </div>
                <button onClick={handleSaveEdits}
                className={`hover:cursor-pointer w-fit px-[1em] mt-[1em] bg-brown-brownwhite`}
                >Save</button>
                
            </div>
        </div>
    )
    };

export default EditItem;

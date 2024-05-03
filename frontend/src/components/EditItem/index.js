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
            <div className='h-[40%] w-[40%] bg-[red]
            hover:cursor-default'
            onClick={e => e.stopPropagation()}>
                {/* delete */}
                <div onClick={handleDeleteItem}
                className={`hover:cursor-pointer`}
                >Delete</div>

                {/* form errors */}
                {
                    editError && (
                        <div>
                            All fields must have a value.
                        </div>
                    )
                }

                {/* edit fields */}
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
                className={`hover:cursor-pointer`}
                >Save</button>
            </div>
        </div>
    )
    };

export default EditItem;

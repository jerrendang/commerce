import { fetcher } from "./fetch";
import { getItemByID } from "./item";

const ADD = 'cart/add_to_cart';
const REMOVE = 'cart/remove_from_cart';
const RESET = 'cart/reset_cart';

export const getItemsFromIdArr = async (idArr) => {
    const res = [];
    for (let id of idArr){
        let {item} = await getItemByID(id);
        res.push(item);
    }

    return res;
}

export const resetCart = (idArr) => {
    return {
        type: RESET,
        idArr
    }
}

const add = (itemId) => {
    return {
        type: ADD,
        itemId
    }
}

export const addToCart = (itemId) => async (dispatch) => {
    const res = await fetcher(`/api/item?item_id=${itemId}&field=in_cart&value=true`, {
        method: 'PUT'
    })

    if (res.ok){
        const data = await res.json();
        dispatch(add(itemId))
    }
}

// router.put('/', asyncHandler(async (req, res, next) => {
//     const {
//         item_id,
//         field,
//         value
//     } = req.query

//     const item = await Item.findByPk(item_id);

//     await item.update({ [field]: value });

//     res.json({ item });

export const removeFromCart = (itemId) => {
    return {
        type: REMOVE,
        itemId
    }
}

export const cartReducer = (state = {itemIds: []}, action) => {
    let newState;
    switch(action.type){
        case ADD:
            let addRef = [...state.itemIds];
            addRef.push(action.itemId);
            newState = {
                ...state,
                itemIds: addRef
            }
            localStorage.setItem('cart', JSON.stringify(newState.itemIds))
            return newState;
        case REMOVE:
            let removeRef = [];
            for (let i of state.itemIds){
                if (i !== action.itemId){
                    removeRef.push(i);
                }
            }
            newState = {
                ...state,
                itemIds: removeRef
            }
            localStorage.setItem('cart', JSON.stringify(newState.itemIds))
            return newState;
        case RESET:
            newState = {
                ...state,
                itemIds: action.idArr
            }
            return newState;
        default:
            return state;
    }
}
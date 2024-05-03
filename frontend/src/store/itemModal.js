const SHOW = 'itemModal/show_modal';
const HIDE = 'itemModal/hide_modal';
const SHOW_EDIT = 'itemModal/show_edit_modal';
const HIDE_EDIT = 'itemModal/hide_edit_modal';

export const changeEditModal = (show, item = {}) => {
    return {
        type: show ? SHOW_EDIT: HIDE_EDIT,
        item
    }   
}

export const changeModal = (show, item = {}, imageLink = '') => {
    return {
        type: show ? SHOW : HIDE,
        item,
        imageLink
    }
}

export const itemModalReducer = (state = {showModal: false, item: {}, showEditModal: false, editItem: {}}, action) => {
    let newState;
    switch(action.type){
        case SHOW:
            newState = {
                ...state,
                showModal: true,
                item: action.item,
                imageLink: action.imageLink
            }
            return newState;
        case HIDE:
            newState = {
                ...state,
                showModal: false,
                item: {},
                imageLink: ''
            }
            return newState;
        case SHOW_EDIT:
            newState = {
                ...state,
                showEditModal: true,
                editItem: action.item,
            }
            return newState;
        case HIDE_EDIT:
            newState = {
                ...state,
                showEditModal: false,
                editItem: {}
            }
            return newState;
        default:
            return state;
    }
}
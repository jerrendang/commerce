const SHOW = 'itemModal/show_modal';
const HIDE = 'itemModal/hide_modal';

export const changeModal = (show, item = {}, imageLink = '') => {
    return {
        type: show ? SHOW : HIDE,
        item,
        imageLink
    }
}

export const itemModalReducer = (state = {showModal: false, item: {}}, action) => {
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
        default:
            return state;
    }
}
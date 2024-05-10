const CHANGE_PAGE = 'nav/change_page';

export const changePage = page => {
    return {
        type: CHANGE_PAGE,
        page
    }
}

export const navReducer = (state = { page: 0 }, action) => {
    let newState;
    switch(action.type){
        case CHANGE_PAGE:
            newState = {
                ...state,
                page: action.page
            }
            return newState;
        default: 
            return state;
    }
}
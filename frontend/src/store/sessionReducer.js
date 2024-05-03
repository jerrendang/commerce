import { fetcher } from "./fetch";
import { createStripeAccount } from "./stripe";

const ADD = 'session/ADD';
const REMOVE = 'session/REMOVE';
const RERENDER = 'session/RERENDER_APP';

export const newNotification = async (seller_id, buyer_id, address, item_id) => {
    const res = await fetcher('/api/session/notification', {
        method: 'POST',
        body: JSON.stringify({
            user_id: seller_id,
            buyer_id,
            item_id,
            address
        })
    })

    const data = res.json();

    return data;
}

export const getNotifications = async (user_id) => {
    const res = await fetcher(`/api/session/notification?user_id=${user_id}`, {
        method: 'GET'
    })

    return res.json();
}

export const rerender = () => {
    return {
        type: RERENDER
    }
}

const restore = (user) => {
    return {
        type: ADD,
        user
    }
}

export const restoreSession = () => async dispatch => {
    const res = await fetcher('/api/session', {
        method: 'GET',
        credentials: 'include'
    })

    if (res.ok){
        const data = await res.json();
        if (data.user){
            dispatch(restore(data.user))
        }
    }
}

const removeSession = () => {
    return {
        type: REMOVE
    }
}

export const logout = () => async (dispatch) => {
    const res = await fetcher('/api/session', {
        method: 'DELETE',
        credentials: 'include'
    })
    if (res.ok){
        dispatch(removeSession());
        return;
    }
}

const addSession = (user) => {
    return {
        type: ADD,
        user
    }
}

export const login = ( credential, password ) => async (dispatch) => {
    const res = await fetcher('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        }),
        credentials: 'include',
    });
    if (res.ok) {
        const { user } = await res.json();
        return dispatch(addSession(user));
    }
}

export const signup = ( username, email, password ) => async (dispatch) => {
    const res = await fetcher('/api/user/', {
        method: 'POST',
        body: JSON.stringify({
            email,
            username,
            password
        }),
        credentials: 'include'
    })
    if (res.ok){
        const {user} = await res.json();
        createStripeAccount(user.id);
        return dispatch(addSession(user));
    }
}

export const editUser = (field, value, userID) => async dispatch => {
    const res = await fetcher('/api/user/', {
        method: 'PUT',
        body: JSON.stringify({
            field,
            value,
            id: userID
        })
    })

    if (res.ok){
        const {user} = await res.json();
        return dispatch(addSession(user))
    }
}

export const sessionReducer = (state = {user: {}}, action) => {
    let newState;
    switch(action.type){
        case(ADD):
            newState = {
                ...state,
                user: action.user
            }
            return newState;
        case(REMOVE):
            newState = {
                ...state,
                user: {}
            }
            return newState;
        case RERENDER:
            newState = {
                ...state,
                user: {
                    ...state.user,
                    rerender: state.rerender ? !state.rerender: true
                }
            }
            return newState;
        default:
            return state;
    }
}
import {
    GET_USERS,
    USERS_LOADING,
    GO_USERS,
    GET_THIS_USER,
} from '../types';

const initialState = {
    users: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case GET_THIS_USER:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case USERS_LOADING:
            return {
                ...state,
                loading: true
            }
        case GO_USERS:
            return {
                ...state,
                users: []
            }
        default:
            return state;
    }
}
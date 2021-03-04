import {
    GET_REPLIES,
    ADD_REPLIES,
    REPLIES_LOADING,
    GO_REPLIES,
    GET_THIS_REPS
} from '../types';

const initialState = {
    replies: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_REPLIES:
            return {
                ...state,
                replies: action.payload,
                loading: false
            }
        case GET_THIS_REPS:
            return {
                ...state,
                replies: action.payload,
                loading: false
            }
        case ADD_REPLIES:
            return {
                ...state,
                replies: [...state.replies, action.payload]
            }
        case REPLIES_LOADING:
            return {
                ...state,
                loading: true
            }
        case GO_REPLIES:
            return {
                ...state,
                replies: []
            }
        default:
            return state;
    }
}
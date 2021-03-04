import {GET_SUBS, GO_SUBS} from '../types';

const initialState = {
    subscribers: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_SUBS:
            return {
                ...state,
                subscribers: action.payload,
                loading: false
            }
        case GO_SUBS:
            return {
                ...state,
                subscribers: []
            }
        default:
            return state;
    }
}
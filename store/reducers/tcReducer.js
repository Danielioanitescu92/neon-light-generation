import {
    GET_TC,
    TC_LOADING,
    GO_TC
} from '../types';

const initialState = {
    tc: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_TC:
            return {
                ...state,
                tc: action.payload,
                loading: false
            }
        case TC_LOADING:
            return {
                ...state,
                loading: true
            }
        case GO_TC:
            return {
                ...state,
                tc: []
            }
        default:
            return state;
    }
}
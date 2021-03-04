import {
    GET_AB,
    AB_LOADING,
    GO_AB
} from '../types';

const initialState = {
    ab: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_AB:
            return {
                ...state,
                ab: action.payload,
                loading: false
            }
        case AB_LOADING:
            return {
                ...state,
                loading: true
            }
        case GO_AB:
            return {
                ...state,
                ab: []
            }
        default:
            return state;
    }
}
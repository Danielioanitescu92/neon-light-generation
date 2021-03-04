import {
    GET_PP,
    PP_LOADING,
    GO_PP
} from '../types';

const initialState = {
    pp: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_PP:
            return {
                ...state,
                pp: action.payload,
                loading: false
            }
        case PP_LOADING:
            return {
                ...state,
                loading: true
            }
        case GO_PP:
            return {
                ...state,
                pp: []
            }
        default:
            return state;
    }
}
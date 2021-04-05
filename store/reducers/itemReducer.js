import { 
    GET_ITEMS, 
    GET_THIS_ITEMS,
    GET_PAGINATED_ITEMS,
    GET_NEWEST_ITEMS,
    GET_POPULAR_ITEMS,
    ITEMS_LOADING,
    GO_ITEMS
} from '../types';

const initialState = {
    items: [],
    newest: [],
    popular: [],
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case GET_PAGINATED_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case GET_NEWEST_ITEMS:
            return {
                ...state,
                newest: action.payload,
                loading: false
            }
        case GET_POPULAR_ITEMS:
            return {
                ...state,
                popular: action.payload,
                loading: false
            }
        case GET_THIS_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            }
        case GO_ITEMS:
            return {
                ...state,
                items: []
            }
        default:
            return state;
    }
};
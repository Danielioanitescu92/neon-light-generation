import {
    GET_FILE,
    FILE_LOADING,
    AVATAR_FILES_LOADING,
    GO_FILE,
    GET_THIS_FILE,
    GET_ITEMS_FILES,
    GET_AVATARS_FILE,
    GO_ITEMS_FILE,
    GO_AVATARS_FILE,
} from '../types';

const initialState = {
    files: {
        items: [],
        avatars: []
    },
    loadingIt: false,
    loadingAv: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_FILE:
            return {
                ...state,
                files: action.payload,
                loading: false
            }
        case GET_THIS_FILE:
            return {
                ...state,
                files: action.payload,
                loading: false
            }
        case GET_ITEMS_FILES:
            return {
                ...state,
                files: {
                    ...state.files,
                    items:  
                        state.files.items.some((element) => element.filename === action.payload[0].filename) ? 
                            [ ...state.files.items ]
                        : [ ...state.files.items, action.payload[0] ]
                },
                loadingIt: false
            }
        case GET_AVATARS_FILE:
            return {
                ...state,
                files: {
                    ...state.files,
                    avatars: 
                        state.files.avatars.some((element) => element.filename === action.payload[0].filename) ? 
                            [ ...state.files.avatars ]
                        : [ ...state.files.avatars, action.payload[0] ]
                },
                loadingAv: false
            }
        case GO_FILE:
            return {
                ...state,
                files: []
            }
        case GO_ITEMS_FILE:
            return {
                ...state,
                files: {
                    ...state.files,
                    items: []
                }
            }
        case GO_AVATARS_FILE:
            return {
                ...state,
                files: {
                    ...state.files,
                    avatars: []
                }
            }
            case FILE_LOADING:
                return {
                    ...state,
                    loadingIt: true
                }
        case AVATAR_FILES_LOADING:
            return {
                ...state,
                loadingAv: true
            }
        default:
            return state;
    }
}
import axios from 'axios';
import {
    GET_FILE,
    GO_FILE,
    FILE_LOADING,
    GET_ITEMS_FILES,
    GET_AVATARS_FILE,
    GO_ITEMS_FILE,
    GO_AVATARS_FILE,
    AVATAR_FILES_LOADING
} from '../types';
import { returnErrors } from './errorActions';

export const getFiles = () => {
    return function(dispatch) {
        dispatch(setFilesLoading());
        axios.get('/api/uploads/files')
            .then(res => {
                dispatch({
                    type: GET_FILE,
                    payload: res.data
                })
            }
            )
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
};

export const getItemsFiles = picsArray => {
    return function(dispatch) {
        // dispatch(goItemsFiles());
        dispatch(setFilesLoading());
        if(picsArray) {
            picsArray.map(filename => { 
                axios
                .get(`/api/uploads/files/${filename}`)
                .then(res => {
                    dispatch({
                        type: GET_ITEMS_FILES,
                        payload: res.data
                    })
                }
                )
                .catch(err => 
                    dispatch(returnErrors(err.response.data, err.response.status))
                )
            })
        }
    }
};

export const getAvatarsFile = avatarsArray => {
    console.log("111 present avatars: ", avatarsArray)
    return function(dispatch) {
        dispatch(setAvatarFilesLoading());
        dispatch(goAvatarsFile());
        avatarsArray.map(filename => {
            console.log("222 map each avatars: ", filename)
            axios
            .get(`/api/uploads/files/${filename}`)
            .then(res => {
                console.log("333 res.data: ", res.data)
                dispatch({
                    type: GET_AVATARS_FILE,
                    payload: res.data
                })
            }
            )
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
        })
    }
};

export const goFiles = () => {
    return {
        type: GO_FILE
    }
}

export const goItemsFiles = () => {
    return {
        type: GO_ITEMS_FILE
    }
}

export const goAvatarsFile = () => {
    return {
        type: GO_AVATARS_FILE
    }
}

export const setFilesLoading = () => {
    return {
        type: FILE_LOADING
    };
};

export const setAvatarFilesLoading = () => {
    return {
        type: AVATAR_FILES_LOADING
    };
};
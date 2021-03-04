import axios from 'axios';
import {
    GET_USERS,
    USERS_LOADING,
    GO_USERS,
    GET_THIS_USER
} from '../types';
import { returnErrors } from './errorActions';

// Get list of users (for admin only)
export const getUsers = () => {
    return function(dispatch) {
        dispatch(setUsersLoading());
        axios.get('/api/users/allUsers')
            .then(res => 
                dispatch({
                    type: GET_USERS,
                    payload: res.data
                })
            )
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
};

// Get this item
export const getThisUser = name => {
    return function(dispatch) {
        dispatch(setUsersLoading());
        axios
        .get(`/api/users/getThisUser/${name}`)
        .then(res => {
            dispatch({
                type: GET_THIS_USER,
                payload: res.data
            })
        })
    }
};

// Contact admin
export const contAdmin = ({ name, email, subject, text }) => {
    return function(dispatch) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        } 
        const body = JSON.stringify({ name, email, subject, text });

        axios.post(`/api/users/contactadmin`, body, config)
        .then(res => {
            dispatch(returnErrors(res.data, res.status, 'EMAIL_SENT'));
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'CANNOT_CONTACT_ADMIN'));
        })
    }
}

export const goUsers = () => {
    return {
        type: GO_USERS
    }
}

export const setUsersLoading = () => {
    return {
        type: USERS_LOADING
    };
};

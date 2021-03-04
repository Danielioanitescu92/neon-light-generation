import axios from 'axios';
import {
    GET_SUBS,
    SUBSCRIBE_FAIL,
    GO_SUBS
} from '../types';
import { returnErrors } from './errorActions';

// Add Subscriber
export const subscribe = ({ email, orig }) => {
    return function(dispatch) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ email, orig });

        axios.post('/api/subscribers', body, config)
        .then(res => {
            dispatch(returnErrors(res.data, res.status, 'ACC_LOADED'));
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'SUBSCRIBE_FAIL'));
            dispatch({
                type: SUBSCRIBE_FAIL
            })
        })
    }
}

// Open Unsub Url From Email
export const unsubEmail = token => {
    return function(dispatch) {
        axios.get(`/api/subscribers/unsubscribe/${token}`)
            .then(res => {
                dispatch({
                    type: GET_SUBS,
                    payload: res.data.subscriber
                })
                dispatch(returnErrors(res.data.msg, res.status, 'ACC_LOADED'))
            })
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
};

// Delete Subscriber
export const unsubscribe = sub => {
    return function(dispatch) {
        axios
            .delete(`/api/subscribers/${sub}`)
            .then(res => {
                dispatch(returnErrors(res.data.msg, res.status, 'ACC_LOADED'));
            })
            .catch(err => 
                dispatch(returnErrors(err.response.data.msg, err.response.status))
            )
    }
};

export const goSubs = () => {
    return {
        type: GO_SUBS
    }
}
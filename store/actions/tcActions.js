import axios from 'axios';
import {
    GET_TC,
    TC_LOADING,
    GO_TC
} from '../types';
import { returnErrors } from './errorActions';

export const getTc = () => {
    return function(dispatch) {
        dispatch(setTcLoading());
        axios.get('/api/termscons')
            .then(res => 
                dispatch({
                    type: GET_TC,
                    payload: res.data
                })
            )
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
};

export const goTc = () => {
    return {
        type: GO_TC
    }
}

export const setTcLoading = () => {
    return {
        type: TC_LOADING
    };
};

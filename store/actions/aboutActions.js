import axios from 'axios';
import {
    GET_AB,
    AB_LOADING,
    GO_AB
} from '../types';
import { returnErrors } from './errorActions';

export const getAb = () => {
    return function(dispatch) {
        dispatch(setAbLoading());
        axios.get('/api/aboutus')
            .then(res => {
                dispatch({
                    type: GET_AB,
                    payload: res.data
                })
            }
            )
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
};

export const goAb = () => {
    return {
        type: GO_AB
    }
}

export const setAbLoading = () => {
    return {
        type: AB_LOADING
    };
};

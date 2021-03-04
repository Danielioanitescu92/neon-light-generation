import axios from 'axios';
import {
    GET_PP,
    PP_LOADING,
    GO_PP
} from '../types';
import { returnErrors } from './errorActions';

export const getPp = () => {
    return function(dispatch) {
        dispatch(setPpLoading());
        axios.get('/api/privpols')
            .then(res => 
                dispatch({
                    type: GET_PP,
                    payload: res.data
                })
            )
            .catch(err => 
                dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
};

export const goPp = () => {
    return {
        type: GO_PP
    }
}

export const setPpLoading = () => {
    return {
        type: PP_LOADING
    };
};

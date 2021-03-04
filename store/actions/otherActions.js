import axios from 'axios';
import { returnErrors } from './errorActions';

export const addView = ({ way, unique, screenSize }) => {
    return function(dispatch) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        } 
        const body = JSON.stringify({ way, unique, screenSize });
        axios.post(`/api/other`, body, config)
        .catch(err => { dispatch(returnErrors(err.response.data, err.response.status, 'ACC_LOADED')); })
    }
};
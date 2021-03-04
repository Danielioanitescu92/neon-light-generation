import axios from 'axios';
import { 
    GET_REPLIES,
    ADD_REPLIES,
    REPLIES_LOADING,
    GO_REPLIES,
    GET_THIS_REPS
} from '../types';

export const getReplies = () => {
    return function(dispatch) {
        dispatch(setRepliesLoading());
        axios.get('/api/replies')
            .then(res => 
                dispatch({
                    type: GET_REPLIES,
                    payload: res.data
                })
            )
    }
};

export const getThisReps = id => {
    return function(dispatch) {
        dispatch(setRepliesLoading());
        axios
        .get(`/api/replies/getThisReps/${id}`)
        .then(res => {
            dispatch({
                type: GET_THIS_REPS,
                payload: res.data
            })
        })
    }
};

export const addReply = replies => {
    return function(dispatch) {
        axios
            .post('/api/replies', replies)
            .then(res => {
                dispatch({
                    type: ADD_REPLIES,
                    payload: res.data
                })
                dispatch(getThisReps(replies.forWich))}
            )
    }
};

export const addRLike = ({ replyId, userId, itemId }) => {
    return function(dispatch) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ replyId, userId });

        axios.post(`/api/replies/like`, body, config)
            .then(res => {
                dispatch(getThisReps(itemId))
            }
        )
    }
};

export const removeRLike = ({ replyId, userId, itemId }) => {
    return function(dispatch) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ replyId, userId });

        axios.post(`/api/replies/unlike`, body, config)
            .then(res => {
                dispatch(getThisReps(itemId))
            }
        )
    }
};

export const goReplies = () => {
    return {
        type: GO_REPLIES
    }
}

export const setRepliesLoading = () => {
    return {
        type: REPLIES_LOADING
    };
};

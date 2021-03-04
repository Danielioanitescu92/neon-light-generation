import axios from 'axios';
import { 
    GET_COMMENTS,
    ADD_COMMENTS,
    COMMENTS_LOADING,
    GO_COMMENTS,
    GET_THIS_COMMS
} from '../types';

export const getComments = () => {
    return function(dispatch) {
        dispatch(setCommentsLoading());
        axios.get('/api/comments')
            .then(res => 
                dispatch({
                    type: GET_COMMENTS,
                    payload: res.data
                })
            )
    }
};

export const getThisComms = id => {
    return function(dispatch) {
        dispatch(setCommentsLoading());
        axios
        .get(`/api/comments/getThisComms/${id}`)
        .then(res => {
            dispatch({
                type: GET_THIS_COMMS,
                payload: res.data
            })
        })
    }
};

export const addComment = comments => {
    return function(dispatch) {
        axios
            .post('/api/comments', comments)
            .then(res => {
                dispatch({
                    type: ADD_COMMENTS,
                    payload: res.data
                })
                dispatch(getThisComms(comments.forWich))}
            )
    }
};

export const addLike = ({ commentId, userId, itemId }) => {
    return function(dispatch) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ commentId, userId });

        axios.post(`/api/comments/like`, body, config)
            .then(res => {
                dispatch(getThisComms(itemId))
            }
        )
    }
};

export const removeLike = ({ commentId, userId, itemId }) => {
    return function(dispatch) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ commentId, userId });

        axios.post(`/api/comments/unlike`, body, config)
            .then(res => {
                dispatch(getThisComms(itemId))
            }
        )
    }
};

export const goComments = () => {
    return {
        type: GO_COMMENTS
    }
};

export const setCommentsLoading = () => {
    return {
        type: COMMENTS_LOADING
    };
};

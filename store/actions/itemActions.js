import {
    GET_ITEMS,
    GET_PAGINATED_ITEMS,
    GET_NEWEST_ITEMS,
    GET_POPULAR_ITEMS,
    ITEMS_LOADING,
    GO_ITEMS,
    GET_THIS_ITEMS
} from '../types';
import axios from 'axios';
import { returnErrors } from './errorActions';
// import { getItemsFiles, goItemsFiles, getAvatarsFile, goAvatarsFile } from './imageActions';
import { goComments } from './commentActions';
import { goReplies } from './replyActions';
import { goSubs } from './subActions';
import { goTc } from './tcActions';
import { goPp } from './ppActions';
import { goAb } from './aboutActions';

export const getItems = () => {
    return function(dispatch) {
        dispatch(setItemsLoading());
        axios
        .get('/api/items')
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
        .catch(err => 
            dispatch(returnErrors(err.response.data, err.response.status))
        )
    }
};

export const getThisItem = id => {
    return function(dispatch) {
        dispatch(setItemsLoading());
        axios
        .get(`/api/items/getThisItem/${id}`)
        .then(res => {
            dispatch({
                type: GET_THIS_ITEMS,
                payload: res.data
            })
        })
        .catch(err => 
            dispatch(returnErrors(err.response.data, err.response.status))
        )
    }
};

export const addView = ({ post, way, unique, screenSize }) => {
    console.log("A ACTION item addView: ", post, way, unique, screenSize )
    return function(dispatch) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        } 
        const body = JSON.stringify({ post, way, unique, screenSize });
        axios.post(`/api/items/getThisItem/view`, body, config)
        .then(res => {
            console.log("B ACTION item addView res.data: ", res.data)
        })
        .catch(err => {
            console.log("B ACTION item addView err: ", res.data)
            dispatch(returnErrors(err.response.data, err.response.status));
        })
    }
};

export const getSpecificItems = (search, author, page, sort) => {
    return function(dispatch) {
        dispatch(setItemsLoading());
        // let firstArray = []
        // let picsArray = []
        dispatch(goItems())
        dispatch(goComments())
        dispatch(goReplies())
        dispatch(goSubs())
        dispatch(goTc())
        dispatch(goPp())
        dispatch(goAb())
        axios.get(
            search ?
                author ?
                    page ?
                        sort ? 
                            `/api/items/search/${search}/author/${author}/page/${page}/sort/${sort}`
                        : `/api/items/search/${search}/author/${author}/page/${page}`
                    : sort ? 
                        `/api/items/search/${search}/author/${author}/sort/${sort}`
                    : `/api/items/search/${search}/author/${author}`
                : page ?
                    sort ?
                        `/api/items/search/${search}/page/${page}/sort/${sort}`
                    : `/api/items/search/${search}/page/${page}`
                : sort ?
                    `/api/items/search/${search}/sort/${sort}`
                : `/api/items/search/${search}`
            : author ?
                page ?
                    sort ? 
                        `/api/items/author/${author}/page/${page}/sort/${sort}`
                    : `/api/items/author/${author}/page/${page}`
                : sort ? 
                    `/api/items/author/${author}/sort/${sort}`
                : `/api/items/author/${author}`
            : page ?
                sort ?
                    `/api/items/page/${page}/sort/${sort}`
                : `/api/items/page/${page}`
            : sort ?
                `/api/items/sort/${sort}`
            : `/api/items`
        )
        .then(res => {
                dispatch({
                    type: GET_PAGINATED_ITEMS,
                    payload: res.data
                })
            }
        )
        .catch(err => {
            console.log(err)
            dispatch(returnErrors(err.response.data, err.response.status))
        }
        )
    }
};

export const getNewestArticles = () => {
    return function(dispatch) {
        dispatch(setItemsLoading());
        axios.get(`/api/items/newpop/sort/descending`)
        .then(res => {
                dispatch({
                    type: GET_NEWEST_ITEMS,
                    payload: res.data
                })
            }
        )
        .catch(err => {
            console.log(err)
            dispatch(returnErrors(err.response.data, err.response.status))
        }
        )
    }
};

export const getPopularArticles = () => {
    return function(dispatch) {
        dispatch(setItemsLoading());
        axios.get(`/api/items/newpop/sort/popular`)
        .then(res => {
                dispatch({
                    type: GET_POPULAR_ITEMS,
                    payload: res.data
                })
            }
        )
        .catch(err => {
            console.log(err)
            dispatch(returnErrors(err.response.data, err.response.status))
        }
        )
    }
};

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}

export const goItems = () => {
    return {
        type: GO_ITEMS
    }
}
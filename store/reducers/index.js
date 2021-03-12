import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import commentReducer from './commentReducer';
import replyReducer from './replyReducer';
import userReducer from './userReducer';
import subReducer from './subReducer';
import ppReducer from './ppReducer';
import tcReducer from './tcReducer';
import imageReducer from './imageReducer';
import aboutReducer from './aboutReducer';

export default combineReducers({
    item: itemReducer,
    error: errorReducer,
    comment: commentReducer,
    reply: replyReducer,
    user: userReducer,
    sub: subReducer,
    privpol: ppReducer,
    termscons: tcReducer,
    file: imageReducer,
    about: aboutReducer
});
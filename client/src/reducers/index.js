import {combineReducers} from 'redux';
import itemReducer from './itemReducer';
import liftReducer from './liftReducer';
import cardioReducer from './cardioReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';


export default combineReducers({
    item: itemReducer,
    lift: liftReducer,
    cardio: cardioReducer,
    error: errorReducer,
    auth: authReducer
}); 
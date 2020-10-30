import axios from 'axios';
import {GET_LIFTS, ADD_LIFT, DELETE_LIFT, LIFTS_LOADING, GET_LIFT_CATEGORIES} from './types';
import {tokenConfig} from './authActions';
import {returnErrors} from './errorActions';

export const getLifts = (user) => dispatch => {
   dispatch(setLiftsLoading());
   axios
    .get(`/api/lifts/${user}`)
    .then(res => 
        dispatch({
            type: GET_LIFTS, 
            payload: res.data
        }))
    .catch(err => dispatch(returnErrors(err.response.data, err.reponse.status)));
};

export const getLiftCategories = (user, lift) => dispatch => {
    dispatch(setLiftsLoading());
    axios
        .get(`/api/lifts/${user}/${lift}`)
        .then(res => 
            dispatch({
                type: GET_LIFT_CATEGORIES,
                payload: res.data
            }))
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const addLift = (lift) => (dispatch, getState) => {
    axios
        .post('/api/lifts', lift, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_LIFT,
                payload: res.data
            })})
            .catch(err => dispatch(returnErrors(err.response.data, err.reponse.status)));
};

export const deleteLift = (id) => (dispatch, getState) => {
    axios
    .delete(`/api/lifts/${id}`, tokenConfig(getState))
    .then(res => 
        dispatch({
            type: DELETE_LIFT,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.reponse.status)));
};



export const setLiftsLoading = () =>{
    return {
        type: LIFTS_LOADING
    }
}

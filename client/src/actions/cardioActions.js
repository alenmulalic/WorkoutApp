import axios from 'axios';
import {GET_CARDIO, ADD_CARDIO, DELETE_CARDIO, CARDIO_LOADING} from './types';
import { tokenConfig } from './authActions';
import {returnErrors} from './errorActions';

export const getCardio = (user) => dispatch => {
   dispatch(setCardioLoading());
   axios
    .get(`/api/cardios/${user}`)
    .then(res => 
        dispatch({
            type: GET_CARDIO, 
            payload: res.data
        })
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.reponse.status)));
};

export const getCardioType = (user, type) => dispatch => {
    dispatch(setCardioLoading());
    axios
        .get(`/api/cardios/${user}/${type}`)
        .then(res =>
            dispatch({
                type: GET_CARDIO,
                payload: res.data
            }))
            .catch(err => dispatch(returnErrors(err.response.data, err.reponse.status)));
}

export const addCardio = (cardio) => (dispatch, getState) => {
    axios
        .post('./api/cardios', cardio, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: ADD_CARDIO,
                payload: res.data
            }))
};

export const deleteCardio = (id) => (dispatch, getState) => {
    axios
    .delete(`/api/cardios/${id}`, tokenConfig(getState))
    .then(res => 
        dispatch({
            type: DELETE_CARDIO,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.reponse.status)));
};



export const setCardioLoading = () =>{
    return {
        type: CARDIO_LOADING
    }
}

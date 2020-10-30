import {GET_LIFTS, ADD_LIFT, DELETE_LIFT, LIFTS_LOADING, GET_LIFT_CATEGORIES} from '../actions/types';

const initialState = {
    lifts: [],
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type){
        case GET_LIFTS:
            return {
                ...state,
                lifts: action.payload,
                loading: false
            };
        case DELETE_LIFT:
            return {
                ...state,
                lifts: state.lifts.filter(lift => lift._id !== action.payload)
            };
        case ADD_LIFT:
            return {
                ...state,
                lifts: [action.payload, ...state.lifts]
            };
        case LIFTS_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_LIFT_CATEGORIES:
            return {
                ...state,
                lifts: action.payload,
                loading: false
            }
        default:
            return state;
    }
}
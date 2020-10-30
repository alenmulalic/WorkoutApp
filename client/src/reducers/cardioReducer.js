import {GET_CARDIO, ADD_CARDIO, DELETE_CARDIO, CARDIO_LOADING} from '../actions/types';

const initialState = {
    cardios: [],
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type){
        case GET_CARDIO:
            return {
                ...state,
                cardios: action.payload,
                loading: false
            };
        case DELETE_CARDIO:
            return {
                ...state,
                cardios: state.cardios.filter(cardio => cardio._id !== action.payload)
            };
        case ADD_CARDIO:
            return {
                ...state,
                cardios: [action.payload, ...state.cardios]
            };
        case CARDIO_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}
import {
    FETCH_FLIGHTS,
    FETCH_FLIGHTS_SUCCESS,
    FETCH_FLIGHTS_ERROR,
} from "../constants/actionTypes";

const initialState = {
    list: [],
    isLoading: false,
    isFailed: false,
    errors: [],
}

export default function flights(state = initialState, action) {
    switch (action.type) {
        case FETCH_FLIGHTS:
            return {
                ...state,
                isLoading: true,
            };
        case FETCH_FLIGHTS_SUCCESS:
            return {
                ...state,
                list: action.payload,
                isLoading: false,
            };
        case FETCH_FLIGHTS_ERROR:
            return {
                ...state,
                isLoading: false,
                isFailed: true,
                errors: action.payload,
            };
        default:
            return state;
    }
}
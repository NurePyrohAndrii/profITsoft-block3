import {
    FETCH_FLIGHT_DETAILS,
    FETCH_FLIGHT_DETAILS_SUCCESS,
    FETCH_FLIGHT_DETAILS_ERROR,
    EDIT_FLIGHT_DETAILS,
    EDIT_FLIGHT_DETAILS_SUCCESS,
    EDIT_FLIGHT_DETAILS_ERROR,
    CREATE_FLIGHT_DETAILS,
    CREATE_FLIGHT_DETAILS_SUCCESS,
    CREATE_FLIGHT_DETAILS_ERROR,
} from "../constants/actionTypes";

const initialState = {
    flight: {},
    isLoading: false,
    isFetchFailed: false,
    isEditFailed: false,
    isCreateFailed: false,
    errors: [],
}

export default function flightDetails(state = initialState, action) {
    switch (action.type) {
        case FETCH_FLIGHT_DETAILS:
            return {
                ...state,
                isLoading: true,
                isFetchFailed: false,
            };
        case FETCH_FLIGHT_DETAILS_SUCCESS:
            return {
                ...state,
                flight: action.payload,
                isLoading: false,
                isFetchFailed: false,
            };
        case FETCH_FLIGHT_DETAILS_ERROR:
            return {
                ...state,
                isLoading: false,
                isFetchFailed: true,
                errors: action.payload,
            };
        case EDIT_FLIGHT_DETAILS:
            return {
                ...state,
                isLoading: true,
                isEditFailed: false,
            };
        case EDIT_FLIGHT_DETAILS_SUCCESS:
            return {
                ...state,
                flight: action.payload,
                isLoading: false,
                isEditFailed: false,
            };
        case EDIT_FLIGHT_DETAILS_ERROR:
            return {
                ...state,
                isLoading: false,
                isEditFailed: true,
                errors: action.payload,
            };
        case CREATE_FLIGHT_DETAILS:
            return {
                ...state,
                isLoading: true,
                isCreateFailed: false,
            };
        case CREATE_FLIGHT_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isCreateFailed: false,
            };
        case CREATE_FLIGHT_DETAILS_ERROR:
            return {
                ...state,
                isLoading: false,
                isCreateFailed: true,
                errors: action.payload,
            };
        default:
            return state;
    }
}
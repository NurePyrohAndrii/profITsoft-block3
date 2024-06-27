import {
    FETCH_FLIGHTS,
    FETCH_FLIGHTS_SUCCESS,
    FETCH_FLIGHTS_ERROR,
    DELETE_FLIGHT,
    DELETE_FLIGHT_SUCCESS,
    DELETE_FLIGHT_ERROR
} from "../constants/actionTypes";

const initialState = {
    list: [],
    isLoading: false,
    isFetchFailed: false,
    isDeleteFailed: false,
    errors: [],
    page: 0,
    size: 5,
    totalPages: 0,
    totalElements: 0,
}

export default function flights(state = initialState, action) {
    switch (action.type) {
        case FETCH_FLIGHTS:
            return {
                ...state,
                isLoading: true,
                isFetchFailed: false,
            };
        case FETCH_FLIGHTS_SUCCESS:
            return {
                ...state,
                list: action.payload,
                isLoading: false,
                isFetchFailed: false,
                page: action.page,
                size: action.size,
                totalPages: action.totalPages,
                totalElements: action.totalElements,
            };
        case FETCH_FLIGHTS_ERROR:
            return {
                ...state,
                isLoading: false,
                isFetchFailed: true,
                errors: action.payload,
            };
        case DELETE_FLIGHT:
            return {
                ...state,
                isLoading: true,
                isDeleteFailed: false,
            };
        case DELETE_FLIGHT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isDeleteFailed: false,
            };
        case DELETE_FLIGHT_ERROR:
            return {
                ...state,
                isLoading: false,
                isDeleteFailed: true,
                errors: action.payload,
            };

        default:
            return state;
    }
}
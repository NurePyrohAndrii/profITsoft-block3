import {
    FETCH_AIRPORTS,
    FETCH_AIRPORTS_ERROR,
    FETCH_AIRPORTS_SUCCESS
} from "../constants/actionTypes";

// TODO по нормальному би винести це в відповідний airports пакет, коли зв'явиться потреба у імплементації сторінки з аеропортами
const initialState = {
    list: [],
    isLoading: false,
    isFetchFailed: false,
    errors: [],
}

export default function airports(state = initialState, action) {
    switch (action.type) {
        case FETCH_AIRPORTS:
            return {
                ...state,
                isLoading: true,
                isFetchFailed: false,
            };
        case FETCH_AIRPORTS_SUCCESS:
            return {
                ...state,
                list: action.payload,
                isLoading: false,
                isFetchFailed: false,
            };
        case FETCH_AIRPORTS_ERROR:
            return {
                ...state,
                isLoading: false,
                isFetchFailed: true,
                errors: action.payload,
            };
        default:
            return state;
    }
}
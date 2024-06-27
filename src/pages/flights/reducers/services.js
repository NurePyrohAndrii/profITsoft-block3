import {
    FETCH_SERVICES,
    FETCH_SERVICES_ERROR,
    FETCH_SERVICES_SUCCESS
} from "../constants/actionTypes";

// TODO по нормальному би винести це в app модуль, бо оце і в flights і в flightDetails використовується,
//  але краще в відповідний services, коли зв'явиться потреба у імплементації сторінки з сервісами
const initialState = {
    list: [],
    isLoading: false,
    isFetchFailed: false,
    errors: [],
}

export default function services(state = initialState, action) {
    switch (action.type) {
        case FETCH_SERVICES:
            return {
                ...state,
                isLoading: true,
                isFetchFailed: false,
            };
        case FETCH_SERVICES_SUCCESS:
            return {
                ...state,
                list: action.payload,
                isLoading: false,
                isFetchFailed: false,
            };
        case FETCH_SERVICES_ERROR:
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
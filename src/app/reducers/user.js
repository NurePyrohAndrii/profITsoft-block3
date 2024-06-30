import {
    ERROR_RECEIVE_USER,
    ERROR_SIGN_IN,
    RECEIVE_USER,
    REQUEST_SIGN_IN,
    REQUEST_USER,
    SUCCESS_SIGN_IN,
} from '../constants/actionTypes';
import {ENABLE_SEE_SECRET_PAGE} from 'constants/authorities';

const initialState = {
    name: '',
    email: '',
    authority: '',
    errors: [],
    isAuthorized: false,
    isFailedSignIn: false,
    isFetchingSignIn: false,
    isFetchingUserInfo: false,
};

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_SIGN_IN: {
            return {
                ...state,
                errors: initialState.errors,
                isFailedSignIn: false,
                isFetchingSignIn: true,
            }
        }
        case SUCCESS_SIGN_IN: {
            const user = action.payload;
            return {
                ...state,
                name: user.name || initialState.name,
                email: user.email || initialState.email,
                authority: ENABLE_SEE_SECRET_PAGE,
                isAuthorized: true,
            };
        }
        case ERROR_SIGN_IN: {
            return {
                ...state,
                errors: action.payload,
                authority: '',
                isAuthorized: false,
                isFailedSignIn: true,
                isFetchingSignIn: false,
            };
        }
        case REQUEST_USER: {
            return {
                ...state,
                isFetchingUser: true,
            };
        }
        case RECEIVE_USER: {
            const user = action.payload;
            return {
                ...state,
                name: user.name || initialState.name,
                email: user.email || initialState.email,
                authority: ENABLE_SEE_SECRET_PAGE,
                isAuthorized: true,
                isFetchingUser: false,
            };
        }
        case ERROR_RECEIVE_USER: {
            return {
                ...state,
                errors: action.payload,
                authority: '',
                isAuthorized: false,
                isFetchingUser: false,
            };
        }
        default: {
            return state;
        }
    }
}

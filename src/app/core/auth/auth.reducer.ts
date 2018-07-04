import { Actions, AuthActionTypes } from './auth.actions';
import { initialState, AuthState } from './auth.state';

export function authReducer(state = initialState, action: Actions): AuthState {
    switch (action.type) {
        case AuthActionTypes.LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case AuthActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLoggedin: true,
                token: action.payload.token
            };
        case AuthActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        case AuthActionTypes.LOGOUT:
            return {
                ...state,
                isLoading: false,
                error: null,
                isLoggedin: false,
                token: null
            };            
        default: {
            return state;
        }
    }
}

// selectors
export const selectorAuth = state => state.auth;

export const getIsAuthenticated = state => state.auth.isLoggedin;
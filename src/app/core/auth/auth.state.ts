export interface AuthState {
    isLoading: boolean;
    error: string;
    isLoggedin: boolean,
    token: string
}

export const initialState: AuthState = {
    isLoading: false,
    error: null,
    isLoggedin: false,
    token: null
}
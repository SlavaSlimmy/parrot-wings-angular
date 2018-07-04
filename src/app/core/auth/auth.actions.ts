import { Action } from '@ngrx/store';

export enum AuthActionTypes {
    LOGIN_REQUEST = '[auth] Login Request',
    LOGIN_FAILURE = '[auth] Login Failure',
    LOGIN_SUCCESS = '[auth] Login Success',
    LOGOUT = '[auth] Logout'
}

export class LoginRequestAction implements Action {
    readonly type = AuthActionTypes.LOGIN_REQUEST;
    constructor(public payload: { email: string; password: string }) {}
}

export class LoginFailureAction implements Action {
    readonly type = AuthActionTypes.LOGIN_FAILURE;
    constructor(public payload: { error: string }) {}
}

export class LoginSuccessAction implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public payload: { token: string }) {}
}

export class LogoutAction implements Action {
    readonly type = AuthActionTypes.LOGOUT;
}

export type Actions = LoginRequestAction | LoginFailureAction | LoginSuccessAction | LogoutAction;
  
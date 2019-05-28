/* tslint:disable:max-classes-per-file */

import { Action } from '@ngrx/store';

import { IAuth, IUser } from 'src/app/entities/auth.model';

export const AuthActionType = {
    LOGIN: '[Auth] Logging ing',
    GET_USER_DATA: '[Auth] Getting user data',
    LOGIN_SUCCESS: '[Auth] Logging in succeed',
    LOGIN_FAIL: '[Auth] Login failed',
    LOGOUT: '[Auth] Logging out',
    LOGOUT_SUCCESS: '[Auth] Logging out succeed',
    LOGOUT_FAIL: '[Auth] Logging out failed',
};

export class Login implements Action {
    readonly type = AuthActionType.LOGIN;
    constructor(public payload: IAuth) { }
}

export class GetUserData implements Action {
    readonly type = AuthActionType.GET_USER_DATA;
}

export class LoginSuccess implements Action {
    readonly type = AuthActionType.LOGIN_SUCCESS;
    constructor(public payload: IUser) { }
}

export class LoginFail implements Action {
    readonly type = AuthActionType.LOGIN_FAIL;
    constructor(public payload: Error) { }
}

export class Logout implements Action {
    readonly type = AuthActionType.LOGOUT;
}

export class LogoutSuccess implements Action {
    readonly type = AuthActionType.LOGOUT_SUCCESS;
}

export class LogoutFail implements Action {
    readonly type = AuthActionType.LOGOUT_FAIL;
    constructor(public payload: Error) { }
}

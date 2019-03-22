import { Action } from '@ngrx/store';

import { IAuth, IUser } from 'src/app/entities/auth.model';

export const AuthActionType = {
    LOGIN: '[Auth] Login',
    GET_USER_DATA: '[Auth] Get user data',
    LOGIN_SUCCESS: '[Auth] Login success',
    LOGIN_FAIL: '[Auth] Login failed',
    LOGOUT: '[Auth] Logout',
    LOGOUT_SUCCESS: '[Auth] Logout success',
    LOGOUT_FAIL: '[Auth] Logout failed'
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

export class LoginFailed implements Action {
    readonly type = AuthActionType.LOGIN_FAIL;
    constructor(public payload: Error) { }
}

export class Logout implements Action {
    readonly type = AuthActionType.LOGOUT;
}

export class LogoutSuccess implements Action {
    readonly type = AuthActionType.LOGOUT_SUCCESS;
}

export class LogoutFailed implements Action {
    readonly type = AuthActionType.LOGOUT_FAIL;
    constructor(public payload: Error) { }
}

// export type AuthAction = Login | GetUserData | LoginSuccess | LoginFailed | Logout | LogoutSuccess | LogoutFailed;

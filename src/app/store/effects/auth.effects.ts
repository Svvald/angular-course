import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { AuthService } from '../../services/auth-service/auth.service';
import { AuthActionType, GetUserData, Login, LoginFail, LoginSuccess, LogoutFail, LogoutSuccess } from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
    @Effect() login$: Observable<Action> = this.actions$.pipe(
        ofType<Login>(AuthActionType.LOGIN),
        switchMap(action => this.authService.logIn(action.payload).pipe(
            map(res => res.token),
            tap(token => localStorage.setItem('token', token)),
        )),
        map(_ => new GetUserData()),
        catchError(err => of(new LoginFail(err))),
    );

    @Effect() getUserData$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionType.GET_USER_DATA),
        switchMap(_ => this.authService.getUserInfo().pipe(
            map(userdata => new LoginSuccess(userdata)),
        )),
    );

    @Effect({ dispatch: false }) loginSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionType.LOGIN_SUCCESS),
        tap(_ => this.router.navigateByUrl('courses')),
    );

    @Effect({ dispatch: false }) loginFailed$: Observable<Error> = this.actions$.pipe(
        ofType<LoginFail>(AuthActionType.LOGIN_FAIL),
        map(action => action.payload),
        tap(err => console.error(err)),
    );

    @Effect() logout$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionType.LOGOUT),
        tap(_ => localStorage.clear()),
        map(_ => new LogoutSuccess()),
        catchError(err => of(new LogoutFail(err))),
    );

    @Effect({ dispatch: false }) logoutSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionType.LOGOUT_SUCCESS),
        tap(_ => this.router.navigateByUrl('login')),
    );

    @Effect({ dispatch: false }) logoutFailed$: Observable<Error> = this.actions$.pipe(
        ofType<LogoutFail>(AuthActionType.LOGOUT_FAIL),
        map(action => action.payload),
        tap(err => console.error(err)),
    );

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
    ) { }
}

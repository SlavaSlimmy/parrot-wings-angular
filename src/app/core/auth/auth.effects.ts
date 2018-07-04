import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap  } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

import { AuthService } from './auth.service';
import * as authActions from './auth.actions';

@Injectable()
export class AuthEffects {
    constructor(private authService: AuthService, private actions$: Actions, private router: Router) {}
    
    @Effect()
    loginRequestEffect$: Observable<Action> = this.actions$.pipe(
        ofType<authActions.LoginRequestAction>(authActions.AuthActionTypes.LOGIN_REQUEST),
        switchMap(action => 
            this.authService.login(action.payload.email, action.payload.password)
            .pipe(
                tap(data => {
                    let decoded = jwt_decode(data.id_token); 
                    let saveData = {
                        token: data.id_token,
                        expDate: new Date().valueOf() + decoded.exp
                    };
                    localStorage.setItem('jwt', JSON.stringify(saveData))
                }),
                map(data => new authActions.LoginSuccessAction({ token: data.id_token })),
                tap(() => this.router.navigate(['/'])),
                catchError(data => of(new authActions.LoginFailureAction({ error:data.error }))),
            )
        )
    )

    @Effect({ dispatch: false })
    logoutEffect$: Observable<Action> = this.actions$.pipe(
        ofType<authActions.LogoutAction>(authActions.AuthActionTypes.LOGOUT),
        tap(() => localStorage.removeItem('jwt')),
        tap(() => this.router.navigate(['/login']))
    )    
}
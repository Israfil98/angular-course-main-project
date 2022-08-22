import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';

import { environment } from '../../../environments/environment';
import * as AuthActions from './auth.actions';
import { User } from './../user.model';
import { AuthService } from './../auth.service';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  localId: string,
  idToken: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, localId, idToken, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email: email,
    id: localId,
    token: idToken,
    expirationDate: expirationDate,
    isRedirect: true,
  });
};

const handleErrors = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred';

  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }

  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email is already exists';
      break;
    case 'OPERATION_NOT_ALLOWED':
      errorMessage = 'Bla bla';
      break;
    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      errorMessage = 'Bla bla';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email is incorrect';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is invalid';
      break;
    case 'USER_DISABLED':
      errorMessage = 'The user account has been disabled by an administrator';
      break;
    default:
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  @Effect() authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((authData: AuthActions.SignupStart) => {
      return this.http
        .post<AuthResponseData>(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          tap((resData) => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map((resData) => {
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken
            );
          }),
          catchError((errorRes) => {
            return handleErrors(errorRes);
          })
        );
    })
  );

  @Effect() authLogin = this.actions$.pipe(
    ofType(AuthActions.START_LOGIN),
    switchMap((authData: AuthActions.StartLogin) => {
      return this.http
        .post<AuthResponseData>(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          tap((resData) => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map((resData) => {
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken
            );
          }),
          catchError((errorRes) => {
            return handleErrors(errorRes);
          })
        );
    })
  );

  @Effect() authAutoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData = JSON.parse(localStorage.getItem('userData'));

      if (!userData) {
        return { type: 'Dummy' };
      }

      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        const expDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();

        this.authService.setLogoutTimer(expDuration);

        return new AuthActions.AuthenticateSuccess({
          email: loadedUser.email,
          id: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate),
          isRedirect: false,
        });
      }

      return { type: 'Dummy' };
    })
  );

  @Effect({ dispatch: false }) authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((authActions: AuthActions.AuthenticateSuccess) => {
      if (authActions.payload.isRedirect) {
        this.router.navigate(['/']);
      }
    })
  );

  @Effect({ dispatch: false }) authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
      this.authService.clearLogoutTimer();
      this.router.navigate(['/auth']);
    })
  );
}

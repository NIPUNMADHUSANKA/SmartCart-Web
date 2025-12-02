import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../service/auth-service';
import { initAuthFromStorage, initAuthFromStorageFailure, initAuthFromStorageSuccess, login, loginFailure, loginSuccess, logout } from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthTokenResponse } from '../../interfaces/userProfile';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ payload }) =>
        this.authService.loginUser(payload).pipe(
          map((response) => {
            const token = response?.accessToken;
            if (
              token &&
              isPlatformBrowser(this.platformId) &&
              typeof localStorage !== 'undefined'
            ) {
              localStorage.setItem('token', token.toString());
            }
            return loginSuccess({ response });
          }),
          catchError((error) =>
            of(
              loginFailure({
                error: error?.error?.message || 'Login Failed',
              })
            )
          )
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      tap(() => {
        if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
          localStorage.removeItem('token');
        }
      })
    ),
    { dispatch: false }
  );

  initAuthFromStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initAuthFromStorage),
      switchMap(() =>
        this.authService.me().pipe(
          map((res: AuthTokenResponse) => {
            const token = this.authService.getToken();
            const response = { ...res, accessToken: token ?? null };
            return initAuthFromStorageSuccess({ response });
          }),
          catchError((error) =>
            of(
              initAuthFromStorageFailure({
                error: error?.error?.message || 'Login Failed',
              })
            )
          )
        )
      )
    )
  );


}

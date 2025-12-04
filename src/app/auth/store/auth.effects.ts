import { Inject, inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../service/auth-service";
import { initAuthFromStorage, initAuthFromStorageFailure, initAuthFromStorageSuccess, login, loginFailure, loginSuccess, logout, register, registerFailure, registerSuccess } from "./auth.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { isPlatformBrowser } from "@angular/common";
import { AuthTokenResponse } from "../../interfaces/userProfile";
import { Router } from "@angular/router";


@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private authService = inject(AuthService);

    constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) { }

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(login),
            switchMap(({ payload }) =>
                this.authService.loginUser(payload).pipe(
                    map((response) => {
                        const token = response?.accessToken;
                        if (token && isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
                            localStorage.setItem('token', token.toString());
                        }
                        this.router.navigate(['']);
                        return loginSuccess({ response, message: 'Login Successful'});
                    }),
                    catchError((error) =>
                        of(
                            loginFailure({ error: error?.error?.message || 'Login Failed' })
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
                        return initAuthFromStorageSuccess({ response, message: 'Login Successful'});
                    }),
                    catchError((error) =>
                        of(
                            initAuthFromStorageFailure({
                                error: error?.error?.message || 'Login Failed'
                            })
                        )
                    )
                )
            )
        )

    );

    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(register),
            switchMap(({ payload }) =>
                this.authService.saveUser(payload).pipe(
                    map(() =>{
                        this.router.navigate(['/login']);
                        return registerSuccess({message: 'Register Successful'})
                    }
                    ),
                    catchError((error) =>
                        of(
                            registerFailure({
                                error: error?.error?.message || 'Register Failed'
                            })
                        )
                    )
                )
            )
        )
    );


}
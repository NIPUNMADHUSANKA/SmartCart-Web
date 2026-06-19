import { Inject, inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../service/auth-service";
import { autoLogout, deleteProfile, deleteProfileFailure, deleteProfileSuccess, initAuthFromStorage, initAuthFromStorageFailure, initAuthFromStorageSuccess, loadUserInfo, login, loginFailure, loginSuccess, logout, register, registerFailure, registerSuccess, updatePassword, updatePasswordFailure, updatePasswordSuccess } from "./auth.actions";
import { catchError, EMPTY, map, of, switchMap, takeUntil, tap, timer } from "rxjs";
import { isPlatformBrowser } from "@angular/common";
import { AuthTokenResponse, userPayload } from "../../interfaces/userProfile";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";


@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private authService = inject(AuthService);
    private toastServie = inject(ToastrService);

    constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) { }

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(login),
            switchMap(({ payload }) =>
                this.authService.loginUser(payload).pipe(
                    map((response) => {
                        const token = response?.accessToken;
                        if (token && isPlatformBrowser(this.platformId) && typeof sessionStorage !== 'undefined') {
                            sessionStorage.setItem('token', token.toString());
                        }
                        this.router.navigate(['']);
                        return loginSuccess({ response, message: 'Login Successful' });
                    }),
                    catchError((error) =>
                        of(
                            loginFailure({ error: this.getErrorMessage(error, 'Login Failed') })

                        )
                    )
                )
            )
        )
    );

    tokenExpiryAutoLogout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginSuccess),
            switchMap(({ response, message }) => {
                if (!response) return EMPTY;

                const expMs = this.authService.getJwtExpMs(response.accessToken ?? '');
                if (!expMs) return EMPTY;

                const msUntilExp = expMs - Date.now();
                if (msUntilExp <= 0) {
                    return of(autoLogout({ reason: 'TOKEN_EXPIRED' }));
                }
                return timer(msUntilExp).pipe(
                    map(() => autoLogout({ reason: 'TOKEN_EXPIRED' })),
                    takeUntil(this.actions$.pipe(ofType(logout)))
                );
            })
        )
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(autoLogout, logout),
            tap(() => {
                this.authService.logout()
                this.router.navigate(['/login'])
                window.location.reload();
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
                        return initAuthFromStorageSuccess({ response, message: 'Login Successful' });
                    }),
                    catchError((error) =>
                        of(
                            initAuthFromStorageFailure({
                                error: this.getErrorMessage(error, 'Login Failed')
                            })
                        )
                    )
                )
            )
        )

    );

    loadUserInfo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(initAuthFromStorageSuccess, loginSuccess),
            switchMap(() =>
                this.authService.info().pipe(
                    map((res: userPayload) => loadUserInfo({ payload: res })),
                    catchError(() => EMPTY)
                )
            )
        )
    );


    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(register),
            switchMap(({ payload }) =>
                this.authService.saveUser(payload).pipe(
                    map(() => {
                        this.router.navigate(['/login']);
                        return registerSuccess({ message: 'Register Successful' })
                    }
                    ),
                    catchError((error) =>
                        of(
                            registerFailure({
                                error: this.getErrorMessage(error, 'Register Failed')
                            })
                        )
                    )
                )
            )
        )
    );

    deleteProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteProfile),
            switchMap(() =>
                this.authService.deleteUser().pipe(
                    switchMap(() => [
                        deleteProfileSuccess({ message: 'Profile Deleted Successfully' }),
                        logout()
                    ]),
                    catchError((error) =>
                        of(
                            deleteProfileFailure({
                                error: this.getErrorMessage(error, 'Failed to Delete Profile'),
                            })
                        )
                    )
                )
            )
        )
    );

    updatePassword$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updatePassword),
            switchMap(({ currentPassword, newPassword }) =>
                this.authService.updatePassword(currentPassword, newPassword).pipe(
                    map(() => {
                        logout()
                        return updatePasswordSuccess({ message: 'Password changed successfully' })
                    }),
                    catchError((error) =>
                        of(
                            updatePasswordFailure({
                                error: this.getErrorMessage(error, 'Failed to change password')
                            })
                        )
                    )
                )
            )
        )
    );

    successToast$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginSuccess, registerSuccess, updatePasswordSuccess),
            tap(({ message }) => {
                this.toastServie.success(message);
            })
        ),
        { dispatch: false }
    );

    failedToast$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginFailure, registerFailure, updatePasswordFailure),
            tap(({ error }) => this.toastServie.error(error))
        ),
        { dispatch: false }
    );


    private getErrorMessage(error: unknown, defaultMessage: string): string {
        if (!error) return defaultMessage;

        if (typeof error === 'string' && error.trim()) return error;

        const anyErr = error as any;

        const details = anyErr?.details;
        if (typeof details === 'string' && details.trim()) return details;

        const errString = anyErr?.error;
        if (typeof errString === 'string' && errString.trim()) return errString;

        const nestedErrString = anyErr?.error?.error;
        if (typeof nestedErrString === 'string' && nestedErrString.trim()) return nestedErrString;

        const errMsg = anyErr?.error?.message;
        if (typeof errMsg === 'string' && errMsg.trim()) return errMsg;

        const topMessage = anyErr?.message;
        if (typeof topMessage === 'string' && topMessage.trim()) return topMessage;

        const statusText = anyErr?.statusText;
        if (typeof statusText === 'string' && statusText.trim()) return statusText;

        return defaultMessage;
    }

}

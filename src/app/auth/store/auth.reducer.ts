import { createFeature, createReducer, on } from "@ngrx/store";
import { AuthState } from "./auth.state";
import { initAuthFromStorageFailure, initAuthFromStorageSuccess, login, loginFailure, loginSuccess, logout } from "./auth.actions";

export const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
}

export const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        initialState,
        on(login, (state) => ({
            ...state,
            loading: true,
            error: null,
        })),

        on(loginSuccess, (state, { response }) => ({
            ...state,
            loading: false,
            user: { userName: response.userName, userId: response.userId },
            token: response.accessToken ?? null,
            isAuthenticated: !!response.accessToken,
            error: null,
        })
        ),

        on(loginFailure, (state, { error }) => ({
            ...state,
            loading: false,
            error,
        })),


        on(logout, () => ({
            ...initialState
        })),

        on(initAuthFromStorageSuccess, (state, { response }) => ({
            ...state,
            loading: false,
            user: { userName: response.userName, userId: response.userId },
            token: response.accessToken ?? null,
            isAuthenticated: true,
            error: null
        })),

        on(initAuthFromStorageFailure, (state) => ({
            ...state,
            loading: false,
            error: null
        }))

    )
})


export const {
    selectAuthState
} = authFeature;

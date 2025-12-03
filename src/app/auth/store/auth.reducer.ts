import { createReducer, on } from "@ngrx/store";
import { AuthUser } from "../../interfaces/userProfile";
import { initAuthFromStorage, initAuthFromStorageFailure, initAuthFromStorageSuccess, login, loginFailure, loginSuccess, logout } from "./auth.actions";

export interface AuthState {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

export const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
}

export const AuthReducer = createReducer(
    initialState,
    
    on(login, (state)=>({
        ...state,
        loading: true,
        error: null,
    })),

    on(loginSuccess, (state, {response}) =>({
        ...state,
        user: {userName: response.userName, userId: response.userId},
        token: response.accessToken ?? null,
        isAuthenticated: true,
        loading: false,
    })),

    on(loginFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error
    })),    

    on(logout, ()=>({
        ...initialState
    })),

    on(initAuthFromStorage, (state)=>({
        ...state,
        loading: true,
        error: null
    })),
    
    on(initAuthFromStorageSuccess, (state, {response})=>({
        ...state,
        user: {userName: response.userName, userId: response.userId},
        token: response.accessToken ?? null,
        isAuthenticated: true,
        loading: false
    })),

    on(initAuthFromStorageFailure, (state, {error})=>({
        ...state,
        loading: false,
        error
    }))


)

import { createReducer, on } from "@ngrx/store";
import { AuthUser, userPayload } from "../../interfaces/userProfile";
import { deleteProfileFailure, deleteProfileSuccess, initAuthFromStorage, initAuthFromStorageFailure, initAuthFromStorageSuccess, loadUserInfo, login, loginFailure, loginSuccess, logout, register, registerFailure, registerSuccess, updatePassword, updatePasswordFailure, updatePasswordSuccess } from "./auth.actions";

export interface AuthState {
    user: AuthUser | null;
    userInfo: userPayload | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    message: string | null;
}

export const initialState: AuthState = {
    user: null,
    userInfo: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    message: null
}

export const AuthReducer = createReducer(
    initialState,
    
    on(login, (state)=>({
        ...state,
        loading: true,
        error: null,
        message: null
    })),

    on(loginSuccess, (state, {response, message}) =>({
        ...state,
        user: {userName: response.userName, userId: response.userId},
        token: response.accessToken ?? null,
        isAuthenticated: true,
        loading: false,
        message
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
        error: null,
    })),
    
    on(initAuthFromStorageSuccess, (state, {response, message})=>({
        ...state,
        user: {userName: response.userName, userId: response.userId},
        token: response.accessToken ?? null,
        isAuthenticated: true,
        loading: false,
        message
    })),

    on(initAuthFromStorageFailure, (state, {error})=>({
        ...state,
        loading: false,
        error
    })),

    on(register, (state)=>({
        ...state,
        loading: true,
        error: null,
        message: null
    })),

    on(registerSuccess, (state, {message})=>({
        ...state,
        loading: false,
        message
    })),

    on(registerFailure, (state, {error})=>({
        ...state,
        loading: false,
        error
    })),

    on(loadUserInfo, (state, {payload})=>({
        ...state,
        userInfo: payload
    })),

    on(deleteProfileSuccess, (state, {message}) =>({
        ...state,
        message
    })),

    on(deleteProfileFailure, (state, {error})=>({
        ...state,
        error
    })),

    on(updatePassword, (state)=>({
        ...state,
        error: null,
        message: null,
        loading: true,
    })),

    on(updatePasswordSuccess, (state, {message})=>({
        ...state,
        loading: false,
        message
    })),

       on(updatePasswordFailure, (state, {error})=>({
        ...state,
        loading: false,
        error
    })),

)

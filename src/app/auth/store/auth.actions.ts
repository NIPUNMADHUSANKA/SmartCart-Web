import { createAction, props } from "@ngrx/store";
import { AuthTokenResponse, LoginPayload, RegisterPayload, userPayload } from "../../interfaces/userProfile";

export const login = createAction(
    '[Auth] login',
    props<{ payload: LoginPayload }>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ response: AuthTokenResponse, message: string }>()
);

export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: string }>()
);

export const loadUserInfo = createAction(
    '[Auth] Load User Info',
    props<{payload: userPayload}>()
);

export const logout = createAction(
    '[Auth] Logout'
);

export const autoLogout = createAction(
    '[Auth] Auto Logout',
    props<{ reason: string}>()
);


export const initAuthFromStorage = createAction(
    '[Auth] Init From Storage'
);

export const initAuthFromStorageSuccess = createAction(
    '[Auth] Init From Storage Success',
    props<{ response: AuthTokenResponse , message:string}>()
);

export const initAuthFromStorageFailure = createAction(
    '[Auth] Init From Storage Failure',
    props<{ error: string }>()
);

export const register = createAction(
    '[Auth] Register',
    props<{payload: RegisterPayload}>()
)

export const registerSuccess = createAction(
     '[Auth] Register Success',
     props<{message: string}>()
)

export const registerFailure = createAction(
    '[Auth] Register Failure',
    props<{ error: string }>()
);

export const deleteProfile = createAction(
    '[Auth] Delete Profile',
)

export const deleteProfileSuccess = createAction(
     '[Auth] Delete Profile Success',
     props<{message: string}>()
)

export const deleteProfileFailure = createAction(
    '[Auth] Delete Profile Failure',
    props<{ error: string }>()
);
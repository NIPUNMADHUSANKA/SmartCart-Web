import { createAction, props } from "@ngrx/store";
import { AuthTokenResponse, LoginPayload } from "../../interfaces/userProfile";


export const login = createAction(
    '[Auth] Login',
    props<{ payload: LoginPayload }>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ response: AuthTokenResponse }>()
);

export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: string }>()
);

export const logout = createAction(
    '[Auth] Logout'
);

export const initAuthFromStorage = createAction(
    '[Auth] Init From Storage'
);

export const initAuthFromStorageSuccess = createAction(
  '[Auth] Init From Storage Success',
  props<{ response: AuthTokenResponse }>()
);

export const initAuthFromStorageFailure = createAction(
    '[Auth] Init From Storage Failure',
    props<{error: string}>()
);

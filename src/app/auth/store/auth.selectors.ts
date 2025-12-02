import { createSelector } from '@ngrx/store';
import { selectAuthState } from './auth.reducer';
import { AuthState } from './auth.state';

export const selectAuthUser = createSelector(
    selectAuthState,
    (state: AuthState) => state.user
);

export const selectAuthLoading = createSelector(
    selectAuthState,
    (state: AuthState) => state.loading
)

export const selectAuthError = createSelector(
    selectAuthState,
    (state: AuthState) => state.error
)

export const selectAuthToken = createSelector(
    selectAuthState,
    (state) => state.token
);

export const selectIsLoggedIn = createSelector(
    selectAuthState,
    (state) => state.isAuthenticated
);


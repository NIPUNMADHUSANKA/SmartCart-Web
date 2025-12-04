import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CategoryState } from "./category.reducer";

export const selectCategoryState = createFeatureSelector<CategoryState>('categories');

export const selectCategories = createSelector(
    selectCategoryState,
    state => state.categories
)

export const selectLoading = createSelector(
    selectCategoryState,
    state=> state.loading
)

export const selectAuthError = createSelector(
    selectCategoryState,
    state=> state.error
)

export const selectAuthMessage = createSelector(
    selectCategoryState,
    state=> state.message
)

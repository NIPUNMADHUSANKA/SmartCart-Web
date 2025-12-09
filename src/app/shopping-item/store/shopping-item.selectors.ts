import { createFeatureSelector, createSelector } from "@ngrx/store";
import { shoppingItemState } from "./shopping-item.reducer";

export const selectShoppingItemState = createFeatureSelector<shoppingItemState>('shoppingItems');

export const selectShoppingItems = createSelector(
    selectShoppingItemState,
    state => state.shoppingItems
);

export const selectShoppingItemsLoading = createSelector(
    selectShoppingItemState,
    state => state.loading
);

export const selectShoppingItemsError = createSelector(
    selectShoppingItemState,
    state => state.error
);

export const selectShoppingItemsMessage = createSelector(
    selectShoppingItemState,
    state => state.message
)
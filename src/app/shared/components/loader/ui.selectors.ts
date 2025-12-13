import { createSelector } from "@ngrx/store";
import { selectAuthLoading } from "../../../auth/store/auth.selectors";
import { selectCategoriesLoading } from "../../../shopping-list/store/category.selectors";
import { selectShoppingItemsLoading } from "../../../shopping-item/store/shopping-item.selectors";


export const selectGlobalLoading = createSelector(
    selectAuthLoading,
    selectCategoriesLoading,
    selectShoppingItemsLoading,
    (isAuthLoading, isCategoryLoading, isShoppingItem) => isAuthLoading || isCategoryLoading || isShoppingItem 
);
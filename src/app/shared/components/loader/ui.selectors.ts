import { createSelector } from "@ngrx/store";
import { selectAuthLoading } from "../../../auth/store/auth.selectors";
import { selectCategoriesLoading } from "../../../shopping-list/store/category.selectors";
import { selectShoppingItemsLoading } from "../../../shopping-item/store/shopping-item.selectors";
import { selectAILoading } from "../../../ai-suggestion/store/ai-suggestion.selectors";


export const selectGlobalLoading = createSelector(
    selectAuthLoading,
    selectCategoriesLoading,
    selectShoppingItemsLoading,
    selectAILoading,
    (isAuthLoading, isCategoryLoading, isShoppingItem, isAIPage) => isAuthLoading || isCategoryLoading || isShoppingItem || isAIPage
);
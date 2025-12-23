import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CategoryState } from "./category.reducer";
import { selectShoppingItems } from "../../shopping-item/store/shopping-item.selectors";

export const selectCategoryState = createFeatureSelector<CategoryState>('categories');

export const selectCategories = createSelector(
    selectCategoryState,
    state => state.categories
)

export const selectCategoriesLoading = createSelector(
    selectCategoryState,
    state => state.loading
)

export const selectCategoriesError = createSelector(
    selectCategoryState,
    state => state.error
)

export const selectCategoriesMessage = createSelector(
    selectCategoryState,
    state => state.message
)


export const selectCategoryStats = createSelector(
    selectCategories,
    (category) => {
        const total = category.length;
        const open = category.filter(i => i.status === 'active').length;
        const close = total - open;
        return {
            total,
            open,
            close
        }
    }
)

export const selectCategoryWithItems = createSelector(
    selectCategories,
    selectShoppingItems,
    (categories, items) => {
        return categories.map(category => {
            const itemsData = items.filter(item => item.categoryId === category.categoryId);
            const totalItems = itemsData.length;
            const closeItems = itemsData.filter(item => item.status != 'active').length;
            const openPre = ((closeItems / totalItems) * 100) || 0;

            return {
                ...category,
                items: itemsData,
                closeItems,
                totalItems,
                openPre
            }
        })
    }
)
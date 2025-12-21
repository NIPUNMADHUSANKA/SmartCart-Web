import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CategoryState } from "../../shopping-list/store/category.reducer";
import { shoppingItemState } from "./shopping-item.reducer";

export const selectShoppingItemState = createFeatureSelector<shoppingItemState>('shoppingItems');

export const selectShoppingItems = createSelector(
    selectShoppingItemState,
    state => state.shoppingItems
);

const selectCategoryState = createFeatureSelector<CategoryState>('categories');

const selectCategoriesFromState = createSelector(
    selectCategoryState,
    state => state.categories
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

export const selectShoppingItemsStats  = createSelector(
    selectShoppingItems,
    (items) =>{
        return items.filter(i => i.status === 'active').length
    }
)

export const selectActiveCategoryInfo = createSelector(
    selectCategoriesFromState,
    selectShoppingItems,
    (cat, items) => {
        const category = cat.find(c => c.status === 'active');
        if (!category) return null;
        const categoryItems = items.filter(i => i.categoryId === category.categoryId);
        const totoaItems = categoryItems.length;
        const openItems = categoryItems.filter(i => i.status === 'active').length;
        const closeItems = totoaItems - openItems;

        return {
            category,
            categoryItems,
            totoaItems,
            openItems,
            closeItems
        }
    }
)

export const selectItemsByCategory = (categoryId: string) =>
    createSelector(
        selectCategoriesFromState,
        selectShoppingItems,
        (categories, items) => {
            const category = categories.find(c => c.categoryId === categoryId && c.status === 'active');
            if (!category) return null;

            const categoryItems = items.filter(i => i.categoryId === categoryId);
            return {
                category,
                items: categoryItems
            };
        }
    );

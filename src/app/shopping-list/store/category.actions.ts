import { createAction, props } from "@ngrx/store";
import { CategoryModel } from "../../interfaces/shoppingList";

export const createCategory = createAction(
    '[Category] Create Category',
    props<{category: CategoryModel}>()
);

export const createCategorySuccess = createAction(
    '[Category] Create Category Success',
    props<{category: CategoryModel, message: string}>()
);

export const createCategoryFailure = createAction(
    '[Category] Create Category Failure',
    props<{error: string}>()
);

export const loadCategories = createAction(
    '[Category] Load Categories'
);

export const loadCategoriesSuccess = createAction(
    '[Category] Load Categories Success',
    props<{categories: CategoryModel[], message: string}>()
);

export const loadCategoriesFailure = createAction(
    '[Category] Load Categories Failure',
    props<{error: string}>()
);

export const updateCategory = createAction(
    '[Category] Update Category',
    props<{categoryId: string, category: CategoryModel}>()
);

export const updateCategorySuccess = createAction(
    '[Category] Update Category Success',
    props<{category: CategoryModel, message: string}>()
);

export const updateCategoryFailure = createAction(
    '[Category] Update Category Failure',
    props<{error: string}>()
);

export const deleteCategory = createAction(
    '[Category] Delete Category',
    props<{categoryId: string}>()
);

export const deleteCategorySuccess = createAction(
    '[Category] Delete Category Success',
    props<{categoryId: string, message: string}>()
);

export const deleteCategoryFailure = createAction(
    '[Category] Delete Category Failure',
    props<{error: string}>()
);

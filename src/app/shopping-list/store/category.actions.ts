import { createAction, props } from "@ngrx/store";
import { RegisterPayload } from "../../interfaces/userProfile";
import { CategoryModel } from "../../interfaces/shoppingList";

export const createCategory = createAction(
    '[Category] Create Category',
    props<{payload: RegisterPayload}>()
);

export const createCategorySuccess = createAction(
    '[Category] Create Category Success',
    props<{message: string}>()
);

export const createCategoryFailure = createAction(
    '[Category] Create Category Failure',
    props<{error: string}>()
);

export const loadCategories = createAction(
    '[Category] Load Categories'
);

export const loadCategoriesSuccess = createAction(
    '[Category] Load Category Success',
    props<{categories: CategoryModel[], message: string}>()
);

export const loadCategoryFailure = createAction(
    '[Category] Load Category Failure',
    props<{error: string}>()
);

export const updateCategory = createAction(
    '[Category] Update Category',
    props<{payload: RegisterPayload}>()
);

export const updateCategorySuccess = createAction(
    '[Category] Update Category Success',
    props<{message: string}>()
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
    props<{message: string}>()
);

export const deleteCategoryFailure = createAction(
    '[Category] Delete Category Failure',
    props<{error: string}>()
);

import { createReducer, on } from "@ngrx/store";
import { CategoryModel } from "../../interfaces/shoppingList";
import { createCategory, createCategoryFailure, createCategorySuccess, deleteCategory, deleteCategoryFailure, deleteCategorySuccess, loadCategories, loadCategoriesFailure, loadCategoriesSuccess, updateCategory, updateCategoryFailure, updateCategorySuccess } from "./category.actions";

export interface CategoryState {
    categories: CategoryModel[]
    loading: boolean;
    error: string | null;
    message: string | null;
};

export const initialState: CategoryState ={
    categories: [],
    loading: false,
    error: null,
    message: null,
}

export const CategoryReducer = createReducer(
    initialState,

    on(loadCategories, (state)=>({
        ...state,
        loading: true,
        error: null,
        message: null
    })),

    on(loadCategoriesSuccess, (state, {categories, message}) =>({
        ...state,
        loading: false,
        categories,
        message
    })),

    on(loadCategoriesFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error
    })),

    on(createCategory, (state) => ({
        ...state,
        loading: true,
        error: null,
        message: null
    })),

    on(createCategorySuccess, (state, {category, message}) => ({
        ...state,
        categories: [category as CategoryModel, ...state.categories],
        loading: false,
        message
    })),

    on(createCategoryFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error
    })),

    on(updateCategory, (state) => ({
        ...state,
        loading: true,
        message: null,
        error: null
    })),

    on(updateCategorySuccess, (state, {category, message}) => ({
        ...state,
        categories: state.categories.map(cat => cat.categoryId === category.categoryId ? category : cat),
        loading: false,
        message
    })),

    on(updateCategoryFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error
    })),

    on(deleteCategory, (state) =>({
        ...state,
        loading: true,
        message: null,
        error: null
    })),

    on(deleteCategorySuccess, (state, {categoryId, message}) =>({
        ...state,
        loading: false,
        message,
        categories: state.categories.filter(cat => cat.categoryId !== categoryId)
    })),

    on(deleteCategoryFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error
    })),
)

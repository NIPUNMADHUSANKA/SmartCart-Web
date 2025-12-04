import { createReducer, on } from "@ngrx/store";
import { CategoryModel } from "../../interfaces/shoppingList";
import { loadCategories, loadCategoriesSuccess, loadCategoryFailure } from "./category.actions";


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

    on(loadCategoryFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error
    })),
)
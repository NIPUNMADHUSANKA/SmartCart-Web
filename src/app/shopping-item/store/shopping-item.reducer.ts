import { createReducer, on } from "@ngrx/store";
import { ShoppingItemModel } from "../../interfaces/shoppingList";
import { createShoppingItem, createShoppingItemFailure, createShoppingItemSuccess, deleteShoppingItem, deleteShoppingItemFailure, deleteShoppingItemSuccess, loadShoppingItems, loadShoppingItemsFailure, loadShoppingItemsSuccess, updateShoppingItem, updateShoppingItemFailure, updateShoppingItemSuccess, updateStatusShoppingItem, updateStatusShoppingItemFailure, updateStatusShoppingItemSuccess } from "./shopping-item.actions";

export interface shoppingItemState {
    shoppingItems: ShoppingItemModel[]
    loading: boolean;
    error: string | null;
    message: string | null;
}

export const initialState: shoppingItemState = {
    shoppingItems: [],
    loading: false,
    error: null,
    message: null,
}

export const shoppingItemReducer = createReducer(
    initialState,

    on(loadShoppingItems, (state) => ({
        ...state,
        loading: true,
        error: null,
        message: null
    })),

    on(loadShoppingItemsSuccess, ((state, { shoppingItems, message }) => ({
        ...state,
        loading: false,
        shoppingItems,
        message
    }))),

    on(loadShoppingItemsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(createShoppingItem, (state) => ({
        ...state,
        loading: true,
        error: null,
        message: null
    })),

    on(createShoppingItemSuccess, (state, { shoppingItem, message }) => ({
        ...state,
        shoppingItems: [shoppingItem as ShoppingItemModel, ...state.shoppingItems],
        loading: false,
        message
    })),

    on(createShoppingItemFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(updateShoppingItem, (state) => ({
        ...state,
        loading: true,
        error: null,
        message: null
    })),

    on(updateShoppingItemSuccess, (state, {shoppingItem, message})=>({
        ...state,
        shoppingItems: state.shoppingItems.map(item => item.itemId === shoppingItem.itemId ? shoppingItem : item),
        loading: false,
        message
    })),

    on(updateShoppingItemFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error
    })),

    on(deleteShoppingItem, (state) => ({
        ...state,
        loading:true,
        error: null,
        message: null
    })),

    on(deleteShoppingItemSuccess, (state, {shoppingItemId, message}) => ({
        ...state,
        shoppingItems: state.shoppingItems.filter(item => item.itemId !== shoppingItemId),
        loading: false,
        message
    })),

    on(deleteShoppingItemFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error
    })),

    on(updateStatusShoppingItem, (state) => ({
        ...state,
        loading: true,
        error: null,
        message: null
    })),

    on(updateStatusShoppingItemSuccess, (state, {shoppingItem, message})=> ({
        ...state,
        loading: false,
        message,
        shoppingItems: state.shoppingItems.map(item => item.itemId === shoppingItem.itemId ? shoppingItem : item)
    })),

    on(updateStatusShoppingItemFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error
    })),

)

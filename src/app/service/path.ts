const host = 'http://localhost:3000'

export const SAVE_CATEGORY = `${host}/api/smart-cart/category`;
export const GET_ALL_CATEGORY = `${host}/api/smart-cart/category`;
export const DELETE_CATEGORY = `${host}/api/smart-cart/category/:categoryId`;
export const GET_CATEGORY = `${host}/api/smart-cart/category/:categoryId`;
export const UPDATE_CATEGORY = `${host}/api/smart-cart/category/:categoryId`;


export const SAVE_SHOPPING_ITEM = `${host}/api/smart-cart/shopping-item`;
export const GET_ALL_SHOPPING_ITEM = `${host}/api/smart-cart/shopping-item`;
export const DELETE_SHOPPING_ITEM = `${host}/api/smart-cart/shopping-item/:itemId`;
export const GET_SHOPPING_ITEM = `${host}/api/smart-cart/shopping-item/:itemId`;
export const UPDATE_SHOPPING_ITEM = `${host}/api/smart-cart/shopping-item/:itemId`;
export const GET_ALL_SHOPPING_ITEM_BY_CATEGORY = `${host}/api/smart-cart/shopping-item/findByCategory/:categoryId`;


export const CREATE_USER = `${host}/api/smart-cart/auth/register`;
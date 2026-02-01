const host = 'https://smart-cart-app-taupe.vercel.app'

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
export const LOGIN_USER = `${host}/api/smart-cart/auth/login`;
export const ME = `${host}/api/smart-cart/auth/me`;
export const INFO = `${host}/api/smart-cart/auth/info`;
export const REMOVE_USER = `${host}/api/smart-cart/auth/remove`;
export const RESET_PASSWORD = `${host}/api/smart-cart/auth/resetPassword`;

export const GENERATE_AI_PROMPT = `${host}/api/smart-cart/ai-model`;
export const GET_ALL_AI_CATEGORY = `${host}/api/smart-cart/ai-model`;
export const DELETE_AI_CATEGORY = `${host}/api/smart-cart/ai-model/:categoryId`;
export const DELETE_AI_ALL_CATEGORY = `${host}/api/smart-cart/ai-model/deleteAISuggestion/:suggestionId`;
export const DELETE_AI_SHOPPING_ITEM = `${host}/api/smart-cart/ai-model/deleteAIShoppingItem/:categoryId/:itemId`;
export const UPDATE_AI_SHOPPING_ITEM = `${host}/api/smart-cart/ai-model/updateAIShoppingItem`;
export const REGENERATE_AI_PROMPT = `${host}/api/smart-cart/ai-model/regenerateAIShopping`;
export const CONFIRM_AI_CATEGORY = `${host}/api/smart-cart/ai-model/confirmAIShopping`;
export const ADD_AI_SHOPPING_ITEM = `${host}/api/smart-cart/ai-model/addAIShoppingItem`;
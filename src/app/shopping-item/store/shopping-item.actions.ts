import { createAction, props } from "@ngrx/store";
import { ShoppingItemModel } from "../../interfaces/shoppingList";

export const createShoppingItem = createAction(
    '[Shopping Item] Create Shopping Item',
    props<{shoppingItem:ShoppingItemModel}>()
);

export const createShoppingItemSuccess = createAction(
    '[Shopping Item] Create Shopping Item Success',
    props<{shoppingItem:ShoppingItemModel, message: string}>()
)

export const createShoppingItemFailure = createAction(
    '[Shopping Item] Create Shopping Item Failure',
    props<{error: string}>()
)

export const loadShoppingItems = createAction(
    '[Shopping Item] Load Shopping Items'
);

export const loadShoppingItemsSuccess = createAction(
    '[Shopping Item] Load Shopping Items Success',
    props<{shoppingItems: ShoppingItemModel[], message: string}>()
);

export const loadShoppingItemsFailure = createAction(
    '[Shopping Item] Load Shopping Items Failure',
    props<{error: string}>()
);

export const updateShoppingItem = createAction(
    '[Shopping Item] Update Shopping Item',
    props<{shoppingItemId: string, shoppingItem: ShoppingItemModel}>()
);

export const updateShoppingItemSuccess = createAction(
    '[Shopping Item] Update Shopping Item Success',
    props<{shoppingItem: ShoppingItemModel, message: string}>()
);

export const updateShoppingItemFailure = createAction(
    '[Shopping Item] Update Shopping Item Failure',
    props<{error: string}>()
);

export const deleteShoppingItem = createAction(
    '[Shopping Item] Delete Shopping Item',
    props<{shoppingItemId: string}>()
);

export const deleteShoppingItemSuccess = createAction(
    '[Shopping Item] Delete Shopping Item Success',
    props<{shoppingItemId: string, message: string}>()
);

export const deleteShoppingItemFailure = createAction(
    '[Shopping Item] Delete Shopping Item Failure',
    props<{error: string}>()
);

export const updateStatusShoppingItem = createAction(
    '[Shopping Item] Update Status Shopping Item',
    props<{shoppingItemId: string, status: string}>()
)

export const updateStatusShoppingItemSuccess = createAction(
    '[Shopping Item] Update Status Shopping Item Success',
    props<{shoppingItem: ShoppingItemModel, message: string}>()
);

export const updateStatusShoppingItemFailure = createAction(
    '[Shopping Item] Update Status Shopping Item Failure',
    props<{error: string}>()
);

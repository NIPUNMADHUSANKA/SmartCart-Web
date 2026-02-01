import { createAction, props } from "@ngrx/store";
import { AIItem, AISuggestionResult } from "../../interfaces/aiSuggestion";


export const createAIShoppingList = createAction(
    '[AI Shopping List] Create AI Shopping List',
    props<{prompt:string}>()
);

export const createAIShoppingListSuccess = createAction(
    '[AI Shopping List] Create AI Shopping List Success',
    props<{shoppingList:AISuggestionResult, message: string}>()
)

export const createAIShoppingListFailure = createAction(
    '[AI Shopping List] Create AI Shopping List Failure',
    props<{error: string}>()
)

export const loadAIShoppingList = createAction(
    '[AI Shopping List] Load AI Shopping List'
);

export const loadAIShoppingListSuccess = createAction(
    '[AI Shopping List] Load AI Shopping List Success',
    props<{shoppingList:AISuggestionResult[], message: string}>()
);

export const loadAIShoppingListFailure = createAction(
    '[AI Shopping List] Load AI Shopping List Failure',
    props<{error: string}>()
);

export const deleteAIShoppingList = createAction(
    '[AI Shopping List] Delete AI Shopping List',
    props<{suggestionId: string, categoryId: string}>()
);

export const deleteAIShoppingListSuccess = createAction(
    '[AI Shopping List] Delete AI Shopping List Success',
    props<{suggestionId: string, categoryId: string, message: string}>()
);

export const deleteAIShoppingListFailure = createAction(
    '[AI Shopping List] Delete AI Shopping List Failure',
    props<{error: string}>()
);

export const deleteAIShoppingListAll = createAction(
    '[AI Shopping List] Delete All AI Shopping List',
    props<{suggestionId: string}>()
);

export const deleteAIShoppingListAllSuccess = createAction(
    '[AI Shopping List] Delete All AI Shopping List Success',
    props<{suggestionId: string, message: string}>()
);

export const deleteAIShoppingListAllFailure = createAction(
    '[AI Shopping List] Delete All AI Shopping List Failure',
    props<{error: string}>()
);

export const deleteAIShoppingItem = createAction(
    '[AI Shopping Item] Delete AI Shopping Item',
    props<{categoryId: string, itemId: string}>()
);

export const deleteAIShoppingItemSuccess = createAction(
    '[AI Shopping Item] Delete AI Shopping Item Success',
    props<{categoryId: string, itemId: string, message: string}>()
);

export const deleteAIShoppingItemFailure = createAction(
    '[AI Shopping Item] Delete AI Shopping Item Failure',
    props<{error: string}>()
);

export const addAIShoppingItem = createAction(
    '[AI Shopping Item] Add AI Shopping Item',
    props<{shoppingItem: AIItem}>()
);

export const addAIShoppingItemSuccess = createAction(
    '[AI Shopping Item] Add AI Shopping Item Success',
    props<{categoryId: string, shoppingItem: AIItem, message: string}>()
);

export const addAIShoppingItemFailure = createAction(
    '[AI Shopping Item] Add AI Shopping Item Failure',
    props<{error: string}>()
);

export const updateAIShoppingItem = createAction(
    '[AI Shopping Item] Update AI Shopping Item',
    props<{shoppingItem: AIItem}>()
);

export const updateAIShoppingItemSuccess = createAction(
    '[AI Shopping Item] Update AI Shopping Item Success',
    props<{shoppingItem: AIItem, message: string}>()
);

export const updateAIShoppingItemFailure = createAction(
    '[AI Shopping Item] Update AI Shopping Item Failure',
    props<{error: string}>()
);

export const regenerateAIShoppingList = createAction(
    '[AI Shopping List] Regenerate AI Shopping List',
    props<{suggestionId: string, prompt:string}>()
);

export const regenerateAIShoppingListSuccess = createAction(
    '[AI Shopping List] Regenerate AI Shopping List Success',
    props<{suggestionId: string, AISuggestion: AISuggestionResult, message: string}>()
)

export const regenerateAIShoppingListFailure = createAction(
    '[AI Shopping List] Regenerate AI Shopping List Failure',
    props<{error: string}>()
)

export const confirmAICategory = createAction(
    '[AI Shopping List] Confirm AI Shopping Category',
    props<{categoryId: string,}>()
);

export const confirmAICategorySuccess = createAction(
    '[AI Shopping List] Confirm AI Shopping Category Success',
    props<{suggestionId: string, message: string}>()
)

export const confirmAICategoryFailure = createAction(
    '[AI Shopping List] Confirm AI Shopping Category Failure',
    props<{error: string}>()
)
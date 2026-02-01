import { createReducer, on } from '@ngrx/store';
import { AISuggestionResult } from '../../interfaces/aiSuggestion';
import {
  addAIShoppingItem,
  addAIShoppingItemFailure,
  addAIShoppingItemSuccess,
  confirmAICategory,
  confirmAICategoryFailure,
  confirmAICategorySuccess,
  createAIShoppingList,
  createAIShoppingListFailure,
  createAIShoppingListSuccess,
  deleteAIShoppingItem,
  deleteAIShoppingItemFailure,
  deleteAIShoppingItemSuccess,
  deleteAIShoppingList,
  deleteAIShoppingListAll,
  deleteAIShoppingListAllFailure,
  deleteAIShoppingListAllSuccess,
  deleteAIShoppingListFailure,
  deleteAIShoppingListSuccess,
  loadAIShoppingList,
  loadAIShoppingListFailure,
  loadAIShoppingListSuccess,
  regenerateAIShoppingList,
  regenerateAIShoppingListFailure,
  regenerateAIShoppingListSuccess,
  updateAIShoppingItem,
  updateAIShoppingItemFailure,
  updateAIShoppingItemSuccess,
} from './ai-suggestion.actions';

export interface AISuggestionState {
  AISuggestionResult: AISuggestionResult[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

export const initialState: AISuggestionState = {
  AISuggestionResult: [],
  loading: false,
  error: null,
  message: null,
};

export const aiShoppingListReducer = createReducer(
  initialState,

  on(createAIShoppingListFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(createAIShoppingListSuccess, (state, { shoppingList, message }) => ({
    ...state,
    loading: false,
    message,
    AISuggestionResult: [shoppingList, ...state.AISuggestionResult],
  })),

  on(createAIShoppingList, (state) => ({
    ...state,
    message: null,
    loading: true,
    error: null,
  })),

  on(loadAIShoppingList, (state) => ({
    ...state,
    loading: true,
    error: null,
    message: null,
  })),

  on(loadAIShoppingListSuccess, (state, { shoppingList, message }) => ({
    ...state,
    loading: false,
    AISuggestionResult: shoppingList,
    message,
  })),

  on(loadAIShoppingListFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(deleteAIShoppingList, (state) => ({
    ...state,
    loading: true,
    message: null,
    error: null,
  })),

  on(deleteAIShoppingListSuccess, (state, { suggestionId, categoryId, message }) => ({
    ...state,
    loading: false,
    message,
    AISuggestionResult: state.AISuggestionResult.map((sug) => ({
      ...sug,
      categories: sug.categories.filter((cat) => cat.id != categoryId),
    })),
  })),

  on(deleteAIShoppingListFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(deleteAIShoppingListAll, (state) => ({
    ...state,
    loading: true,
    message: null,
    error: null,
  })),

  on(deleteAIShoppingListAllSuccess, (state, { suggestionId, message }) => ({
    ...state,
    loading: false,
    message,
    AISuggestionResult: state.AISuggestionResult.filter((res) => res.id != suggestionId),
  })),

  on(deleteAIShoppingListAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(deleteAIShoppingItem, (state, { categoryId, itemId }) => ({
    ...state,
    loading: true,
    message: null,
    error: null,
  })),

  on(deleteAIShoppingItemSuccess, (state, { categoryId, itemId, message }) => ({
    ...state,
    loading: false,
    message,
    AISuggestionResult: state.AISuggestionResult.map((sug) => ({
      ...sug,
      categories: sug.categories.map((it) => ({
        ...it,
        items: it.items.filter((i) => !(i.categoryId === categoryId && i.id === itemId)),
      })),
    })),
  })),

  on(deleteAIShoppingItemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

   on(addAIShoppingItem, (state, { shoppingItem }) => ({
    ...state,
    loading: true,
    message: null,
    error: null,
  })),

  on(addAIShoppingItemSuccess, (state, { categoryId, shoppingItem, message }) => ({
    ...state,
    loading: false,
    message,
    AISuggestionResult: state.AISuggestionResult.map((sug) => ({
      ...sug,
      categories: sug.categories.map((it)=>({
        ...it,
        items: it.id === categoryId ? [shoppingItem, ...it.items] : [...it.items]
      }))
    }))
  })),

  on(addAIShoppingItemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(updateAIShoppingItem, (state, { shoppingItem }) => ({
    ...state,
    loading: true,
    message: null,
    error: null,
  })),

  on(updateAIShoppingItemSuccess, (state, { shoppingItem, message }) => ({
    ...state,
    loading: false,
    message,
    AISuggestionResult: state.AISuggestionResult.map((sug) => ({
      ...sug,
      categories: sug.categories.map((it) => ({
        ...it,
        items: it.items.map((item) => (item.id === shoppingItem.id ? shoppingItem : item)),
      })),
    })),
  })),

  on(updateAIShoppingItemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(regenerateAIShoppingList, (state, { suggestionId, prompt }) => ({
    ...state,
    loading: true,
    message: null,
    error: null,
  })),

  on(regenerateAIShoppingListSuccess, (state, { suggestionId, AISuggestion, message }) => ({
    ...state,
    loading: false,
    message,
    AISuggestionResult: state.AISuggestionResult.map((sug) =>
      sug.id === suggestionId ? AISuggestion : sug,
    ),
  })),

  on(regenerateAIShoppingListFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(confirmAICategory, (state, { categoryId }) =>({
    ...state,
    loading: true,
    message: null,
    error: null
  })),

  on(confirmAICategorySuccess, (state, {suggestionId, message}) =>({
    ...state,
    loading: false,
    message,
    AISuggestionResult: state.AISuggestionResult.filter((sug) =>
      sug.id != suggestionId
    )
  })),

   on(confirmAICategoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

);

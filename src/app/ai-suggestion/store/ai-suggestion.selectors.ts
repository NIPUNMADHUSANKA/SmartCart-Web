import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AISuggestionState } from "./ai-suggestion.reducer";



export const selectAIShoppingState = createFeatureSelector<AISuggestionState>('aiShoppingList');

export const selectAILoading = createSelector(
    selectAIShoppingState,
    state=> state.loading
)

export const selectAISuggestionResult = createSelector(
    selectAIShoppingState,
    state => state.AISuggestionResult
)


export const selectAIShoppingListSuggestion = createSelector(
    selectAISuggestionResult,
    (result) =>{
        const categories = result.map(i => i.categories);
        return categories;
    }
)




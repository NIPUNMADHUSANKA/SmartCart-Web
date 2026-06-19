import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoryService } from '../../service/category-service';
import { ToastrService } from 'ngx-toastr';
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
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { AICategory, AIItem, AISuggestionResult } from '../../interfaces/aiSuggestion';

@Injectable()
export class AiSuggestionEffects {
  private actions$ = inject(Actions);
  private CategoryService = inject(CategoryService);
  private toastService = inject(ToastrService);

  createAIShoppingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createAIShoppingList),
      mergeMap(({ prompt }) =>
        this.CategoryService.aiCreateCategory(prompt).pipe(
          map((res: AISuggestionResult) =>
            createAIShoppingListSuccess({
              shoppingList: res,
              message: 'AI Shopping List Created Successfully',
            }),
          ),
          catchError((error) =>
            of(
              createAIShoppingListFailure({
                error: this.getErrorMessage(error, 'Failed to Create AI Shopping List'),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  loadAIShoppingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAIShoppingList),
      mergeMap(() =>
        this.CategoryService.getAllAICategory().pipe(
          map((res: AISuggestionResult[]) =>
            loadAIShoppingListSuccess({
              shoppingList: res,
              message: 'AI Shopping List Loaded Successfully',
            }),
          ),
          catchError((error) =>
            of(
              loadAIShoppingListFailure({
                error: this.getErrorMessage(error, 'Failed to Load AI Shopping List'),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  deleteAIShoppingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteAIShoppingList),
      mergeMap(({ suggestionId, categoryId }) =>
        this.CategoryService.deleteAICategory(categoryId).pipe(
          map(() =>
            deleteAIShoppingListSuccess({
              suggestionId,
              categoryId,
              message: 'AI Shopping List Deleted Successfully',
            }),
          ),
          catchError((error) =>
            of(
              deleteAIShoppingListFailure({
                error: this.getErrorMessage(error, 'Failed to Delete AI Shopping List'),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  deleteAIShoppingListAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteAIShoppingListAll),
      mergeMap(({ suggestionId }) =>
        this.CategoryService.deleteALLAICategory(suggestionId).pipe(
          map(() =>
            deleteAIShoppingListAllSuccess({
              suggestionId,
              message: 'All AI Shopping List Deleted Successfully',
            }),
          ),
          catchError((error) =>
            of(
              deleteAIShoppingListAllFailure({
                error: this.getErrorMessage(error, 'Failed to Delete All AI Shopping List'),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  deleteAIShoppingItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteAIShoppingItem),
      mergeMap(({ categoryId, itemId }) =>
        this.CategoryService.deleteAIShoppingItem(categoryId, itemId).pipe(
          map(() =>
            deleteAIShoppingItemSuccess({
              categoryId,
              itemId,
              message: 'AI Shopping Item Deleted Successfully',
            }),
          ),
          catchError((error) =>
            of(
              deleteAIShoppingItemFailure({
                error: this.getErrorMessage(error, 'Failed to Delete AI Shopping Item'),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  updateAIShoppingItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAIShoppingItem),
      mergeMap(({ shoppingItem }) =>
        this.CategoryService.updateAIShoppingItem(shoppingItem).pipe(
          map(() =>
            updateAIShoppingItemSuccess({
              shoppingItem,
              message: 'AI Shopping Item Updated Successfully',
            }),
          ),
          catchError((error) =>
            of(
              updateAIShoppingItemFailure({
                error: this.getErrorMessage(error, 'Failed to update AI Shopping Item'),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  recreateAIShoppingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(regenerateAIShoppingList),
      mergeMap(({ suggestionId, prompt }) =>
        this.CategoryService.aiReCreateCategory(suggestionId, prompt).pipe(
          map((res: AISuggestionResult) =>
            regenerateAIShoppingListSuccess({
              suggestionId,
              AISuggestion: res,
              message: 'AI Shopping List Re-Created Successfully',
            }),
          ),
          catchError((error) =>
            of(
              regenerateAIShoppingListFailure({
                error: this.getErrorMessage(error, 'Failed to Re-Create AI Shopping List'),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  confirmAICategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(confirmAICategory),
      mergeMap(({ categoryId }) =>
        this.CategoryService.aiConfirmCategory(categoryId).pipe(
          map((res: AICategory) => {
            const suggestionId = res.suggestionId;
            return confirmAICategorySuccess({
              suggestionId,
              message: 'Save AI Shopping List Successfully',
            })
          }),
          catchError((error) =>
            of(
              confirmAICategoryFailure({
                error: this.getErrorMessage(error, 'Failed to Save AI Shopping List'),
              }),
            ),
          ),
        ),
      ),
    ),
  );

   addAICategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addAIShoppingItem),
      mergeMap(({ shoppingItem }) =>
        this.CategoryService.addAIShoppingItem(shoppingItem).pipe(
          map((res: AIItem) => {
            const shoppingItem: AIItem = res;
            const categoryId = res.categoryId;
            return addAIShoppingItemSuccess({
              categoryId,
              shoppingItem,
              message: 'Add AI Shopping List Successfully',
            })
          }),
          catchError((error) =>
            of(
              addAIShoppingItemFailure({
                error: this.getErrorMessage(error, 'Failed to Add AI Shopping List'),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  successToasts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          createAIShoppingListSuccess,
          loadAIShoppingListSuccess,
          deleteAIShoppingListSuccess,
          deleteAIShoppingListAllSuccess,
          deleteAIShoppingItemSuccess,
          updateAIShoppingItemSuccess,
          regenerateAIShoppingListSuccess,
          confirmAICategorySuccess,
          addAIShoppingItemSuccess
        ),
        tap(({ message }) => this.toastService.success(message)),
      ),
    { dispatch: false },
  );

  failureToasts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          createAIShoppingListFailure,
          loadAIShoppingListFailure,
          deleteAIShoppingListFailure,
          deleteAIShoppingListAllFailure,
          deleteAIShoppingItemFailure,
          updateAIShoppingItemFailure,
          regenerateAIShoppingListFailure,
          confirmAICategoryFailure,
          addAIShoppingItemFailure
        ),
        tap(({ error }) => this.toastService.error(error)),
      ),
    { dispatch: false },
  );

  private getErrorMessage(error: unknown, defaultMessage: string): string {
        if (!error) return defaultMessage;

        if (typeof error === 'string' && error.trim()) return error;

        const anyErr = error as any;

        const details = anyErr?.details;
        if (typeof details === 'string' && details.trim()) return details;

        const errString = anyErr?.error;
        if (typeof errString === 'string' && errString.trim()) return errString;

        const nestedErrString = anyErr?.error?.error;
        if (typeof nestedErrString === 'string' && nestedErrString.trim()) return nestedErrString;

        const errMsg = anyErr?.error?.message;
        if (typeof errMsg === 'string' && errMsg.trim()) return errMsg;

        const topMessage = anyErr?.message;
        if (typeof topMessage === 'string' && topMessage.trim()) return topMessage;

        const statusText = anyErr?.statusText;
        if (typeof statusText === 'string' && statusText.trim()) return statusText;

        return defaultMessage;
    }
}

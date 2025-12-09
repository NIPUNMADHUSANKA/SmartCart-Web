import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ShoppingItem } from "../../service/shopping-item";
import { createShoppingItem, createShoppingItemFailure, createShoppingItemSuccess, deleteShoppingItem, deleteShoppingItemFailure, deleteShoppingItemSuccess, loadShoppingItems, loadShoppingItemsFailure, loadShoppingItemsSuccess, updateShoppingItem, updateShoppingItemFailure, updateShoppingItemSuccess, updateStatusShoppingItem, updateStatusShoppingItemSuccess } from "./shopping-item.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { ShoppingItemModel } from "../../interfaces/shoppingList";

@Injectable()
export class ShoppingItemEffects {

    private actions$ = inject(Actions);
    private shoppingItemService = inject(ShoppingItem);

    loadShoppingItems$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadShoppingItems),
            mergeMap(({ categoryId }) =>
                this.shoppingItemService.getAllShoppingItem(categoryId).pipe(
                    map((ShoppingItems: ShoppingItemModel[]) => loadShoppingItemsSuccess({ shoppingItems: ShoppingItems, message: 'Shopping Items Loaded Successfully' })),
                    catchError((error) => {
                        return of(
                            loadShoppingItemsFailure({ error: error?.error?.message || 'Failed to Load Shopping Items' })
                        )
                    })
                )
            )
        )
    );

    createShoppingItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createShoppingItem),
            mergeMap(({ shoppingItem }) =>
                this.shoppingItemService.saveShoppingItem(shoppingItem).pipe(
                    map((res: ShoppingItemModel) =>
                        createShoppingItemSuccess({
                            shoppingItem: res,
                            message: 'Shopping Item Created Successfully'
                        })),

                    catchError((error) =>
                        of(
                            createShoppingItemFailure({ error: error?.error?.message || 'Failed to Create Shopping Item' })
                        )
                    )
                )
            )
        )
    );

    updateShoppingItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateShoppingItem),
            mergeMap(({ shoppingItemId, shoppingItem }) =>
                this.shoppingItemService.updateShoppingItem(shoppingItemId, shoppingItem).pipe(
                    map((res: ShoppingItemModel) =>
                        updateShoppingItemSuccess({
                            shoppingItem: res,
                            message: 'Shopping Item Updated Successfully'
                        })),
                    catchError((error) => {
                        return of(
                            updateShoppingItemFailure({ error: error?.error?.message || 'Failed to Update Shopping Item' })
                        )
                    })
                )
            )
        )
    );

    deleteCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteShoppingItem),
            mergeMap(({ shoppingItemId }) =>
                this.shoppingItemService.deleteShoppingItem(shoppingItemId).pipe(
                    map(() => deleteShoppingItemSuccess({ shoppingItemId, message: 'Shopping Item Deleted Successfully' })),
                    catchError((error) =>
                        of(
                            deleteShoppingItemFailure({ error: error?.error?.message || 'Failed to Delete Shopping Item' })
                        )
                    )
                )
            )
        )
    );

    updateStatusShoppingItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateStatusShoppingItem),
            mergeMap(({ shoppingItemId, status }) =>
                this.shoppingItemService.updateStatusofShoppingItemService(shoppingItemId, status).pipe(
                    map((res: ShoppingItemModel) => updateStatusShoppingItemSuccess({ shoppingItem: res, message: 'Shopping Item Status Updated Successfully' })),
                    catchError((error) =>
                        of(
                            updateShoppingItemFailure({ error: error?.error?.message || 'Failed to Update Shopping Item Status' })
                        )
                    )
                )
            )
        )
    );


}
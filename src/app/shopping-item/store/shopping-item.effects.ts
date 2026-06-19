import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ShoppingItem } from "../../service/shopping-item";
import { createShoppingItem, createShoppingItemFailure, createShoppingItemSuccess, deleteShoppingItem, deleteShoppingItemFailure, deleteShoppingItemSuccess, loadShoppingItems, loadShoppingItemsFailure, loadShoppingItemsSuccess, updateShoppingItem, updateShoppingItemFailure, updateShoppingItemSuccess, updateStatusShoppingItem, updateStatusShoppingItemFailure, updateStatusShoppingItemSuccess } from "./shopping-item.actions";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { ShoppingItemModel } from "../../interfaces/shoppingList";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class ShoppingItemEffects {

    private actions$ = inject(Actions);
    private shoppingItemService = inject(ShoppingItem);
    private toastServie = inject(ToastrService);

    loadShoppingItems$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadShoppingItems),
            mergeMap(() =>
                this.shoppingItemService.getAllCategory().pipe(
                    map((shoppingItems: ShoppingItemModel[]) =>
                        loadShoppingItemsSuccess({
                            shoppingItems,
                            message: 'Shopping Items Loaded Successfully',
                        })
                    ),
                    catchError((error) =>
                        of(
                            loadShoppingItemsFailure({
                                error: this.getErrorMessage(error, 'Failed to Load Shopping Items'),
                            })
                        )
                    )
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
                        })
                    ),
                    catchError((error) =>
                        of(
                            createShoppingItemFailure({
                                error: this.getErrorMessage(error, 'Failed to Create Shopping Item'),
                            })
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
                        })
                    ),
                    catchError((error) => {
                        return of(
                            updateShoppingItemFailure({
                                error: this.getErrorMessage(error, 'Failed to Update Shopping Item'),
                            })
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
                    map(() => deleteShoppingItemSuccess({
                        shoppingItemId,
                        message: 'Shopping Item Deleted Successfully'
                    })),
                    catchError((error) =>
                        of(
                            deleteShoppingItemFailure({
                                error: this.getErrorMessage(error, 'Failed to Delete Shopping Item'),
                            })
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
                            updateStatusShoppingItemFailure({
                                error: this.getErrorMessage(error, 'Failed to Update Shopping Item Status'),
                            })
                        )
                    )
                )
            )
        )
    );

    successToast$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createShoppingItemSuccess, updateShoppingItemSuccess, deleteShoppingItemSuccess, updateStatusShoppingItemSuccess),
            tap(({ message }) => {
                this.toastServie.success(message);
            })
        ),
        { dispatch: false }
    );

    failedToast$ = createEffect(() => 
        this.actions$.pipe(
            ofType(createShoppingItemFailure, updateShoppingItemFailure, deleteShoppingItemFailure, updateStatusShoppingItemFailure),
            tap(({error}) => this.toastServie.error(error))
        ),
        { dispatch: false}
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
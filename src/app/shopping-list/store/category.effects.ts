import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CategoryService } from "../../service/category-service";
import { createCategory, createCategoryFailure, createCategorySuccess, deleteCategory, deleteCategoryFailure, deleteCategorySuccess, loadCategories, loadCategoriesFailure, loadCategoriesSuccess, updateCategory, updateCategoryFailure, updateCategorySuccess } from "./category.actions";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { CategoryModel } from "../../interfaces/shoppingList";
import { ToastrService } from "ngx-toastr";


@Injectable()
export class CategoryEffects {
    private actions$ = inject(Actions);
    private categoryService = inject(CategoryService);
    private toastService = inject(ToastrService);


    loadCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCategories),
            mergeMap(() =>
                this.categoryService.getAllCategory().pipe(
                    map((categories: CategoryModel[]) =>
                        loadCategoriesSuccess({
                            categories,
                            message: "Categories Loaded Successfully",
                        })
                    ),
                    catchError((error) =>
                        of(
                            loadCategoriesFailure({
                                error: this.getErrorMessage(error, "Failed to Load Categories"),
                            })
                        )
                    )
                )
            )
        )
    );

    createCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createCategory),
            mergeMap(({ category }) =>
                this.categoryService.saveCategory(category).pipe(
                    map((res: CategoryModel) =>
                        createCategorySuccess({
                            category: res,
                            message: "Category Created Successfully",
                        })
                    ),
                    catchError((error) =>
                        of(
                            createCategoryFailure({
                                error: this.getErrorMessage(error, "Failed to Create Category"),
                            })
                        )
                    )
                )
            )
        )
    );

    updateCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateCategory),
            mergeMap(({ categoryId, category }) =>
                this.categoryService.updateCategory(categoryId, category).pipe(
                    map((res: CategoryModel) =>
                        updateCategorySuccess({
                            category: res,
                            message: "Category Updated Successfully",
                        })
                    ),
                    catchError((error) =>
                        of(
                            updateCategoryFailure({
                                error: this.getErrorMessage(error, "Failed to Update Category"),
                            })
                        )
                    )
                )
            )
        )
    );

    deleteCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteCategory),
            mergeMap(({ categoryId }) =>
                this.categoryService.deleteCategory(categoryId).pipe(
                    map(() =>
                        deleteCategorySuccess({
                            categoryId,
                            message: "Category Deleted Successfully",
                        })
                    ),
                    catchError((error) =>
                        of(
                            deleteCategoryFailure({
                                error: this.getErrorMessage(error, "Failed to Delete Category"),
                            })
                        )
                    )
                )
            )
        )
    );

    successToasts$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(loadCategoriesSuccess, createCategorySuccess, updateCategorySuccess, deleteCategorySuccess),
                tap(({ message }) => this.toastService.success(message))
            ),
        { dispatch: false }
    );

    failureToasts$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(loadCategoriesFailure, createCategoryFailure, updateCategoryFailure, deleteCategoryFailure),
                tap(({ error }) => this.toastService.error(error))
            ),
        { dispatch: false }
    );

    private getErrorMessage(error: unknown, defaultMessage: string): string {
        const message = (error as { error?: { message?: string } })?.error?.message;
        return typeof message === "string" && message.trim().length ? message : defaultMessage;
    }
}

import { Inject, inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CategoryService } from "../../service/category-service";
import { createCategory, createCategoryFailure, createCategorySuccess, deleteCategory, deleteCategorySuccess, loadCategories, loadCategoriesSuccess, loadCategoryFailure, updateCategory, updateCategorySuccess } from "./category.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { CategoryModel } from "../../interfaces/shoppingList";


@Injectable()
export class CategoryEffects {
    private actions$ = inject(Actions);
    private categoryService = inject(CategoryService);

    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    loadCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCategories),
            mergeMap(({ }) =>
                this.categoryService.getAllCategory().pipe(
                    map((res: CategoryModel[]) => loadCategoriesSuccess({ categories: res, message: 'Categories Loaded Successfully' })),
                    catchError((error) =>
                        of(
                            loadCategoryFailure({ error: error?.error?.message || 'Failed to Load Categories' })
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
                    map((res: CategoryModel) => createCategorySuccess({ category: res, message: 'Category Created Successfully' })),
                    catchError((error) =>
                        of(
                            createCategoryFailure({ error: error?.error?.message || 'Failed to Create Category' })
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
                    map((res: CategoryModel) => updateCategorySuccess({ category: res, message: 'Category Updated Successfully' })),
                    catchError((error) =>
                        of(
                            createCategoryFailure({ error: error?.error?.message || 'Failed to Update Category' })
                        )
                    )
                )))
    );

    deleteCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteCategory),
            mergeMap(({ categoryId }) =>
                this.categoryService.deleteCategory(categoryId).pipe(
                    map(() => deleteCategorySuccess({ categoryId, message: 'Category Deleted Successfully' })),
                    catchError((error) =>
                        of(
                            createCategoryFailure({ error: error?.error?.message || 'Failed to Delete Category' })
                        )
                    )
                )))
    );

}
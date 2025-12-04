import { Inject, inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CategoryService } from "../../service/category-service";
import { loadCategories, loadCategoriesSuccess, loadCategoryFailure } from "./category.actions";
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

    


}
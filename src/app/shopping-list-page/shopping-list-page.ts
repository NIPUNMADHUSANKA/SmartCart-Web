import { ChangeDetectionStrategy, Component, inject, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ShoppingList } from '../shopping-list/shopping-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { ShoppingListForm } from '../shopping-list-form/shopping-list-form';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../service/category-service';
import { CategoryModel } from '../interfaces/shoppingList';
import { Store } from '@ngrx/store';
import { selectCategories } from '../shopping-list/store/category.selectors';
import { deleteCategory, loadCategories } from '../shopping-list/store/category.actions';
import { map, Observable, of, take } from 'rxjs';
import { loadShoppingItems } from '../shopping-item/store/shopping-item.actions';

@Component({
  selector: 'app-shopping-list-page',
  imports: [ShoppingList, MatExpansionModule, MatButtonModule, ShoppingListForm, CommonModule],
  templateUrl: './shopping-list-page.html',
  styleUrl: './shopping-list-page.scss',
})
export class ShoppingListPage implements OnInit {

  store = inject(Store);

  readonly pageName = signal('Shopping Lists')

  protected createShoppingList = signal<boolean>(false);

  categories$: Observable<CategoryModel[]> = this.store.select(selectCategories);
  category$: Observable<CategoryModel | null> = of(null);

  constructor(
    private readonly categoryService: CategoryService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
   // this.loadCategories();
  }

  openCreateListDialog() {
    this.createShoppingList.set(!this.createShoppingList());
    //this.loadCategories();
    this.category$ = of(null);
  }

  openUpdateListDialog(id: any) {
    this.category$ = this.store.select(selectCategories).pipe(
      take(1),
      map(categories => categories.find(cat => cat.categoryId === id) || null)
    );
    this.createShoppingList.set(!this.createShoppingList());
    /*this.categoryService.getCategory(id).subscribe({
      next: (res) => {
        this.category = res;
        this.createShoppingList.set(!this.createShoppingList());
      },
      error: () => {
        console.error('Category is not found.');
      }
    })*/
  }

  deleteCategory(id: any) {
    this.store.dispatch(deleteCategory({ categoryId: id }));
    /*this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        alert('Category deleted successfully!');
        this.loadCategories();
      },
      error: (err) => {
        console.error('Failed to delete category', err);
        alert(err?.error?.message ?? 'Failed to delete category.');
      }
    });*/
  }

  /*
  loadCategories() {
    this.store.dispatch(loadCategories());
    this.store.dispatch(loadShoppingItems());
  }*/

}

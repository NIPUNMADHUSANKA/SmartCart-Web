import { ChangeDetectionStrategy, Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ShoppingList } from '../shopping-list/shopping-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { ShoppingListForm } from '../shopping-list-form/shopping-list-form';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../service/category-service';
import { CategoryModel } from '../interfaces/shoppingList';

@Component({
  selector: 'app-shopping-list-page',
  imports: [ShoppingList, MatExpansionModule, MatButtonModule, ShoppingListForm, CommonModule],
  templateUrl: './shopping-list-page.html',
  styleUrl: './shopping-list-page.scss',
})
export class ShoppingListPage implements OnInit {

  readonly pageName = signal('Shopping Lists')

  protected createShoppingList = signal<boolean>(false);

  categories: CategoryModel[] = [];
  category: CategoryModel | null = null;

  constructor(
    private readonly categoryService: CategoryService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.category = null;
    this.loadCategories();
  }

  openCreateListDialog() {
    this.createShoppingList.set(!this.createShoppingList());
    this.loadCategories();
    this.category = null;
  }

  openUpdateListDialog(id: any) {
    this.categoryService.getCategory(id).subscribe({
      next: (res) => {
        this.category = res;
        this.createShoppingList.set(!this.createShoppingList());
      },
      error: () => {
        console.error('Category is not found.');
      }
    })
  }

  deleteCategory(id: any) {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        alert('Category deleted successfully!');
        this.loadCategories();
      },
      error: (err) => {
        console.error('Failed to delete category', err);
        alert(err?.error?.message ?? 'Failed to delete category.');
      }
    });
  }

  loadCategories() {
    this.categoryService.getAllCategory().subscribe({
      next: (value) => {
        this.categories = value;
      },
      error: (err) => {
        console.error('Failed to get categories', err);
      },
    });
  }

}

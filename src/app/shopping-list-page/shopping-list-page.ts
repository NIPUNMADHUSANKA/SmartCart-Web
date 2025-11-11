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

  constructor(
    private readonly categoryService: CategoryService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.categoryService.getAllCategory().subscribe({
      next: (value) => {
        this.categories = value;
      },
      error: (err) => {
        console.error('Failed to get categories', err);
      },
    });
  }

  openCreateListDialog() {
    this.createShoppingList.set(!this.createShoppingList());
  }

  openUpdateListDialog(data: any){
    console.log(data);
  }

}

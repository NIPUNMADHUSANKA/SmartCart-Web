import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { ShoppingList } from '../shopping-list/shopping-list';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { CategoryModel } from '../interfaces/shoppingList';
import { selectCategories } from '../shopping-list/store/category.selectors';

@Component({
  selector: 'app-history',
  imports: [ShoppingList, MatExpansionModule, MatButtonModule, CommonModule],
  templateUrl: './history.html',
  styleUrl: './history.scss',
})
export class History {
  readonly pageName = signal('Histoy');
  store = inject(Store);

  categories$: Observable<CategoryModel[]> = this.store.select(selectCategories).pipe(map(c => c.filter(i => i.status != 'active')));


}

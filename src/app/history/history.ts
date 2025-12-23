import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { ShoppingList } from '../shopping-list/shopping-list';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { CategoryModel } from '../interfaces/shoppingList';
import { selectCategories } from '../shopping-list/store/category.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  imports: [ShoppingList, MatExpansionModule, MatButtonModule, CommonModule],
  templateUrl: './history.html',
  styleUrl: './history.scss',
})
export class History {
  readonly pageName = signal('Histoy');
  store = inject(Store);

  categories$: Observable<CategoryModel[]> = this.store.select(selectCategories).pipe(
    map(c => c.filter(i => i.status != 'active' && i.updatedAt)
    .sort((a,b)=> new Date(a.updatedAt!).getTime() - new Date(b.updatedAt!).getTime())));

  constructor(private router: Router){}
  continueButton(){
    this.router.navigate(['/shopping-list']);
  }

}

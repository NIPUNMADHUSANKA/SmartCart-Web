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
import { Search } from '../search/search';

@Component({
  selector: 'app-history',
  imports: [ShoppingList, MatExpansionModule, MatButtonModule, CommonModule, Search],
  templateUrl: './history.html',
  styleUrl: './history.scss',
})
export class History {
  readonly pageName = signal('Histoy');
  store = inject(Store);

  categories$: Observable<CategoryModel[]> = this.store.select(selectCategories).pipe(
    map(c => c.filter(i => i.status != 'active' && i.updatedAt)
    .sort((a,b)=> new Date(a.updatedAt!).getTime() - new Date(b.updatedAt!).getTime())));

  filteredCategories$: Observable<CategoryModel[]> = this.categories$;

  constructor(private router: Router){}
  continueButton(){
    this.router.navigate(['/shopping-list']);
  }

  onQueryChange(query: string){
    const q = query.trim().toLowerCase();
    this.filteredCategories$ = !q ? this.categories$ : this.categories$.pipe(
      map(cat => cat.filter(item => item.categoryName.toLowerCase().includes(q)))
    )
  }

}

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCategories } from '../shopping-list/store/category.actions';
import { loadShoppingItems } from '../shopping-item/store/shopping-item.actions';
import { selectCategories, selectCategoryStats } from '../shopping-list/store/category.selectors';
import { map } from 'rxjs';
import { selectShoppingItemsStats } from '../shopping-item/store/shopping-item.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit{

  homePageTitle = signal("Shopping Summary");
  homePageSubTitle = signal("Continue Shopping");

  store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(loadCategories());
    this.store.dispatch(loadShoppingItems());    
  }
 
  constructor(private router: Router){}

  allactiveCategory$ = this.store.select(selectCategories).pipe(map(c=>c.filter(i=>i.status ==='active')));
  allCompletedCategory$ = this.store.select(selectCategories).pipe(map(c=>c.filter(i=>i.status !='active')));
  categoryStats$ = this.store.select(selectCategoryStats);

  totalCategories$ = this.categoryStats$.pipe(map(i => i.total));
  openCategories$ = this.categoryStats$.pipe(map(i=> i.open));
  completedCategories$ = this.categoryStats$.pipe(map(i=> i.close));
  totalItems$ = this.store.select(selectShoppingItemsStats);

  continueButton(){
    this.router.navigate(['/shopping-list']);
  }

}

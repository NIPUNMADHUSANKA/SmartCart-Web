import { Component, signal } from '@angular/core';
import { ShoppingList } from '../shopping-list/shopping-list';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-shopping-list-page',
  imports: [ShoppingList, MatExpansionModule],
  templateUrl: './shopping-list-page.html',
  styleUrl: './shopping-list-page.scss',
})
export class ShoppingListPage {

  readonly pageName = signal('Shopping Lists')

}

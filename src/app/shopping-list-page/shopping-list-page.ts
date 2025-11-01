import { Component,OnInit,signal } from '@angular/core';
import { ShoppingList } from '../shopping-list/shopping-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { ShoppingListForm } from '../shopping-list-form/shopping-list-form';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-list-page',
  imports: [ShoppingList, MatExpansionModule, MatButtonModule, ShoppingListForm, CommonModule],
  templateUrl: './shopping-list-page.html',
  styleUrl: './shopping-list-page.scss',
})
export class ShoppingListPage{

  readonly pageName = signal('Shopping Lists')

  protected createShoppingList = signal<boolean>(false);

  openCreateListDialog(){
    this.createShoppingList.set(!this.createShoppingList());
    console.log(this.createShoppingList());
  }

}

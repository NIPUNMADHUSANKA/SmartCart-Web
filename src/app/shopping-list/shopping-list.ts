import { Component, signal } from '@angular/core';
import { ShoppingItem } from '../shopping-item/shopping-item';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ShoppingListItemForm } from '../shopping-list-item-form/shopping-list-item-form';

@Component({
  selector: 'app-shopping-list',
  imports: [ShoppingItem, MatExpansionModule, MatIconModule, NgClass, MatButtonModule, ShoppingListItemForm, CommonModule],
  templateUrl: './shopping-list.html',
  styleUrl: './shopping-list.scss',
})
export class ShoppingList {
  readonly panelOpenState = signal(true);
  
    protected createShoppingItem = signal<boolean>(false);

    openCreateItemDialog(){
      this.createShoppingItem.set(!this.createShoppingItem());
    }
 

}

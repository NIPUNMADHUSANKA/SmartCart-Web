import { Component, Input, Output, signal, EventEmitter, inject, OnChanges, SimpleChanges } from '@angular/core';
import { ShoppingItem } from '../shopping-item/shopping-item';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ShoppingListItemForm } from '../shopping-list-item-form/shopping-list-item-form';
import { CategoryModel, ShoppingItemModel } from '../interfaces/shoppingList';
import { DataService } from '../service/data-service';
import { ShoppingItem as shoppingItemService } from '../service/shopping-item';
import { Store } from '@ngrx/store';
import { selectShoppingItems } from '../shopping-item/store/shopping-item.selectors';
import { map } from 'rxjs';


@Component({
  selector: 'app-shopping-list',
  imports: [ShoppingItem, MatExpansionModule, MatIconModule, NgClass, MatButtonModule, ShoppingListItemForm, CommonModule],
  templateUrl: './shopping-list.html',
  styleUrl: './shopping-list.scss',
})
export class ShoppingList implements OnChanges {
  readonly panelOpenState = signal(true);

  store = inject(Store);

  protected createShoppingItem = signal<boolean>(false);
  shoppingItemService = inject(shoppingItemService)
  shoppingItemsDetails: ShoppingItemModel[] = [];
  shoppingItemDetails!: ShoppingItemModel;

  @Input() categoryDetails!: CategoryModel;
  @Output() updateCategoryDialog = new EventEmitter<string>();
  @Output() deleteShoppingList = new EventEmitter<string>();

  constructor(private dataService: DataService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryDetails']?.currentValue) {
      this.loadShoppingItem();
    }
  }

  openCreateItemDialog() {
    this.dataService.openShoppingList.set(this.categoryDetails.categoryId)
    this.createShoppingItem.set(!this.createShoppingItem());
  }

  openupdateCategoryDialog() {
    this.updateCategoryDialog.emit(this.categoryDetails.categoryId);
  }

  deleteCategory() {
    this.deleteShoppingList.emit(this.categoryDetails.categoryId);
  }

  loadShoppingItem() {
    this.store.select(selectShoppingItems).pipe(
      map(items => items.filter(item => item.categoryId === this.categoryDetails.categoryId))
    ).subscribe((items) => {
      this.shoppingItemsDetails = items;
    });

    /*this.shoppingItemService.getAllShoppingItem(this.categoryDetails.categoryId??'').subscribe({
      next: (res) =>{
        this.shoppingItemsDetails = res;
      },
      error: (err) =>{
        console.error('Failed to get Shopping Items', err);
      }
    })*/

  }

  onShoppingItemUpdated(updatedItem: ShoppingItemModel) {
    const index = this.shoppingItemsDetails.findIndex(item => item.itemId === updatedItem.itemId);
    if (index !== -1) {
      this.shoppingItemsDetails[index] = updatedItem;
      this.shoppingItemsDetails = [...this.shoppingItemsDetails];
    }
  }

  onloadShoppingItems(load: boolean) {
    if (load) {
      this.loadShoppingItem();
    }
  }

  toggleOpenCardItemDialog(itemId: string) {
    const index = this.shoppingItemsDetails.findIndex(item => item.itemId === itemId);
    this.shoppingItemDetails = this.shoppingItemsDetails[index];
    this.createShoppingItem.set(true);
  }

  toggleOpenCreateItemDialog(toggle: boolean) {
    this.createShoppingItem.set(toggle);
  }

}

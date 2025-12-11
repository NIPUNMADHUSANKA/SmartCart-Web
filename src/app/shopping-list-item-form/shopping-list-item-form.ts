import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, signal, SimpleChanges } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Unit } from '../interfaces/shoppingItemList';
import { DataService } from '../service/data-service';
import { ShoppingItem } from '../service/shopping-item';
import { ShoppingItemModel } from '../interfaces/shoppingList';
import { Store } from '@ngrx/store';
import { createShoppingItem, updateShoppingItem } from '../shopping-item/store/shopping-item.actions';

@Component({
  selector: 'app-shopping-list-item-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './shopping-list-item-form.html',
  styleUrl: './shopping-list-item-form.scss',
})
export class ShoppingListItemForm implements OnInit, OnChanges {

  store = inject(Store);
  unit = Unit;
  units = Object.values(this.unit);

  @Input() shoppingItemDetails!: ShoppingItemModel | null;
  @Output() toggleOpenCreateItemDialog = new EventEmitter<boolean>(true);

  fb = inject(NonNullableFormBuilder);
  dataService = inject(DataService);
  shoppingItemService = inject(ShoppingItem)

  // State signals
  isSubmitted = false;
  isUpdate = signal<boolean>(false);
  isValid = signal<boolean>(false);

  shoppingItem = this.fb.group({
    itemName: ['', [Validators.required, Validators.maxLength(30)]],
    description: ['', [Validators.maxLength(180)]],
    quantity: [0, [Validators.required]],
    unit: ['kg', [Validators.required]],
    status: ['active'],
    categoryId: [this.dataService.openShoppingList(), [Validators.required]],
    priority: ['normal'],
  })

  ngOnInit(): void {
    this.applyShoppingItemData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['shoppingItemDetails']) {
      this.applyShoppingItemData();
    }
  }

  private applyShoppingItemData() {
    if (this.shoppingItemDetails) {
      this.isUpdate.set(true);
      this.shoppingItem.patchValue({
        itemName: this.shoppingItemDetails.itemName ?? '',
        description: this.shoppingItemDetails.description ?? '',
        quantity: this.shoppingItemDetails.quantity ?? 0,
        unit: this.shoppingItemDetails.unit ?? 'kg',
        status: this.shoppingItemDetails.status ?? 'active',
        categoryId: this.shoppingItemDetails.categoryId,
        priority: this.shoppingItemDetails.priority ?? 'normal',
      })
    }
  }

  createUpdateShoppingItem() {
    this.isSubmitted = true;
    this.isValid.set(this.shoppingItem.valid);
    if (this.isValid()) {
      const payload = this.shoppingItem.getRawValue() as ShoppingItemModel;
      if (this.isUpdate()) {
        const itemId = this.shoppingItemDetails?.itemId ?? '';
        this.store.dispatch(updateShoppingItem({ shoppingItemId: itemId, shoppingItem: payload }));
        /*this.shoppingItemService.updateShoppingItem(itemId, payload).subscribe({
          next: (res) => {
            alert("Shopping Item updated successfully!");
          },
          error: (err) => {
            console.error('Failed to update Shopping Item', err);
          },
        });*/
      }
      else {
        this.store.dispatch(createShoppingItem({ shoppingItem: payload }));
        this.clearShoppingList();
        /*this.shoppingItemService.saveShoppingItem(payload).subscribe({
          next: (res) => {
            alert("Shopping Item saved successfully!");
            this.clearShoppingList();
          },
          error: (err) => {
            console.error('Failed to save Shopping Item', err);
          }
        })*/
      }
    }
  }

  setStatus(status: string) {
    this.shoppingItem.patchValue({ status: status });
    this.shoppingItem.get('status')?.markAllAsDirty();
  }

  setPriority(priority: string) {
    this.shoppingItem.patchValue({ priority: priority });
    this.shoppingItem.get('priority')?.markAllAsDirty();
  }

  setUnit(unit: string) {
    this.shoppingItem.patchValue({ unit: unit });
    this.shoppingItem.get('unit')?.markAsDirty();
  }

  clearShoppingList() {
    this.isSubmitted = false;
    this.shoppingItem.reset({
      itemName: '',
      description: '',
      quantity: 0,
      unit: 'kg',
      status: 'active',
      categoryId: this.dataService.openShoppingList(),
      priority: 'normal'
    })
  }

  toggleOpenItemDialog() {
    this.toggleOpenCreateItemDialog.emit(false);
  }

}

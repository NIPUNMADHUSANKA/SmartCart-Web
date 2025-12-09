import { CommonModule, NgClass, TitleCasePipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ShoppingItemModel } from '../interfaces/shoppingList';
import { ShoppingItem as ShoppingItemService } from '../service/shopping-item';
import { Store } from '@ngrx/store';
import { deleteShoppingItem, updateStatusShoppingItem } from './store/shopping-item.actions';



@Component({
  selector: 'app-shopping-item',
  imports: [MatCardModule, MatButtonModule, NgClass, MatIconModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './shopping-item.html',
  styleUrl: './shopping-item.scss',
})
export class ShoppingItem {

  @Input() shoppingItemDetails!: ShoppingItemModel;
  @Output() shoppingItemUpdated = new EventEmitter<ShoppingItemModel>();
  @Output() loadshoppingItems = new EventEmitter<boolean>(false);
  @Output() toggleOpenCardItemDialog =new EventEmitter<string>();

  shoppingItemService = inject(ShoppingItemService)
  store = inject(Store);

  status = 'high-piority';

  toggleBuyItem(){
    let itemId = this.shoppingItemDetails.itemId ?? '';
    let status:string = this.shoppingItemDetails.status === 'active' ? 'archived' : 'active';

    this.store.dispatch(updateStatusShoppingItem({shoppingItemId: itemId, status}));
    
    /*this.shoppingItemService.updateStatusofShoppingItemService(itemId, status).subscribe(
      {
        next: (res)=>{
          this.shoppingItemUpdated.emit(res);
        },
        error: (err) =>{
          console.error('Failed to update Shopping Item', err);
        }
      }
    );*/
  }

  toggleDeleteItem(){
    let itemId = this.shoppingItemDetails.itemId ?? '';
    this.store.dispatch(deleteShoppingItem({shoppingItemId: itemId}));
    /*this.shoppingItemService.deleteShoppingItem(itemId).subscribe({
      next: (res)=>{
          this.loadshoppingItems.emit(true);
        },
        error: (err) =>{
          console.error('Failed to Delete Shopping Item', err);
        }
    })*/
  }

  toggleOpenItemDialog(){
    this.toggleOpenCardItemDialog.emit(this.shoppingItemDetails.itemId ?? '');
  }

}

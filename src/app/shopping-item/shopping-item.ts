import { CommonModule, NgClass } from '@angular/common';
import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, input, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ShoppingItemModel } from '../interfaces/shoppingList';
import { ShoppingItem as ShoppingItemService } from '../service/shopping-item';
import { Store } from '@ngrx/store';
import { deleteShoppingItem, updateStatusShoppingItem } from './store/shopping-item.actions';
import { selectItemsByCategory } from './store/shopping-item.selectors';
import { filter, map, of, take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDestructive } from '../confirm-destructive/confirm-destructive';



@Component({
  selector: 'app-shopping-item',
  imports: [MatCardModule, MatButtonModule, NgClass, MatIconModule, CommonModule, ConfirmDestructive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './shopping-item.html',
  styleUrl: './shopping-item.scss',
})
export class ShoppingItem implements OnInit{

  @Input() shoppingItemDetails!: ShoppingItemModel;
  @Output() toggleOpenCardItemDialog =new EventEmitter<string>();

  shoppingItemService = inject(ShoppingItemService)
  store = inject(Store);
  private toastService = inject(ToastrService);
  categoryActivate:boolean = true;

  status = 'high-piority';
  readonly deletePopup = 'this Shopping Item';
  toggleDelete: boolean = false;

  ngOnInit(): void {
    this.store.select(selectItemsByCategory(this.shoppingItemDetails.categoryId ?? '', 'completed')).pipe(
      take(1),
      filter(item => !!item)
    ).subscribe(item =>{
      this.categoryActivate = !(item.category.status != 'active'); 
    })
  }

  isCategoryActive() {
    const categoryId = this.shoppingItemDetails.categoryId;
    if(!categoryId){
      return of(false);
    }

    return this.store.select(selectItemsByCategory(categoryId, 'active')).pipe(
      take(1),
      map((result) => !!result?.category && result.category.status === 'active')
    );
  }

  toggleBuyItem(){
    this.isCategoryActive().subscribe(
      (isActive) => {
        if(isActive){
          let itemId = this.shoppingItemDetails.itemId ?? '';
          let status:string = this.shoppingItemDetails.status === 'active' ? 'archived' : 'active';
          this.store.dispatch(updateStatusShoppingItem({shoppingItemId: itemId, status}));
        }
        else{
          this.toastService.error("This category is currently closed. You can reopen it to manage items again.");
        }
      }
    )
    
    
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
    this.isCategoryActive().subscribe(
      (isActive) => {
        if(isActive){
          this.toggleDelete = true;
        }
        else{
          this.toastService.error("This category is currently closed. You can reopen it to manage items again.");
        }
      }
    )
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
    this.isCategoryActive().subscribe(
      (isActive) => {
        if(isActive){
          this.toggleOpenCardItemDialog.emit(this.shoppingItemDetails.itemId ?? '');
        }
        else{
          this.toastService.error("This category is currently closed. You can reopen it to manage items again.");
        }
      }
    )
  }

  deleteItem(data: boolean){
    if(data){
      let itemId = this.shoppingItemDetails.itemId ?? '';
      this.store.dispatch(deleteShoppingItem({shoppingItemId: itemId}));
    }
    this.toggleDelete = false;
  }
}

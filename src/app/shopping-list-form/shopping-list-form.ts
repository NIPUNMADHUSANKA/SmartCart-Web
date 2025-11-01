import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { formatDateForInput } from '../utils/date-utils';

@Component({
  selector: 'app-shopping-list-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './shopping-list-form.html',
  styleUrl: './shopping-list-form.scss',
})
export class ShoppingListForm {

  fb = inject(NonNullableFormBuilder);

  // State signals
  isUpdate = signal(false);
  isSubmitted = false;

  // --- Default constants (cleaner & reusable) ---
  private DEFAULT_USER_ID = '1001';
  private NEXT_LIST_ID = '1';


  shoppingCart = this.fb.group({
    listId: [this.NEXT_LIST_ID, [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(30)]],
    description: ['', [Validators.maxLength(180)]],
    status: ['active'],
    icon: ['shopping_cart'],
    priority: ['normal'],
    createDateTime: [formatDateForInput(new Date())],
    updateDateTime: [formatDateForInput(new Date())],
    userId: [this.DEFAULT_USER_ID, [Validators.required]]
  });

  constructor() {}

  createList() {
    console.log(this.shoppingCart.value);
    this.isSubmitted = true;
  }

  setStatus(status: string) {
    this.shoppingCart.patchValue({ status: status });
    this.shoppingCart.get('status')?.markAsTouched();
  }

  setPriority(priority: string) {
    this.shoppingCart.patchValue({ priority: priority });
    this.shoppingCart.get('priority')?.markAllAsTouched();
  }

  clearList() {
    this.isSubmitted =false
    this.shoppingCart.reset({
      listId: this.NEXT_LIST_ID,
      name: '',
      description: '',
      status: 'active',
      icon: '',
      priority: 'normal',
      createDateTime: formatDateForInput(new Date()),
      updateDateTime: formatDateForInput(new Date()),
      userId: this.DEFAULT_USER_ID
    });
  }

}

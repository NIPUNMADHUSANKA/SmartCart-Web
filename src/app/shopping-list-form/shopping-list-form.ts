import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-list-form',
  imports: [ReactiveFormsModule],
  templateUrl: './shopping-list-form.html',
  styleUrl: './shopping-list-form.scss',
})
export class ShoppingListForm {

  fb = inject(NonNullableFormBuilder);

  shoppingCart = this.fb.group({
    listId: '1',
    name: ['', [Validators.required]],
    description: '',
    status: '',
    icon: '',
    priority:'',
    createDate: '',
    updateDate: '',
    userId: ''
  })

  


}

import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormArray, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { Store } from '@ngrx/store';
import {
  confirmAICategory,
  createAIShoppingList,
  deleteAIShoppingItem,
  deleteAIShoppingList,
  deleteAIShoppingListAll,
  loadAIShoppingList,
  regenerateAIShoppingList,
} from './store/ai-suggestion.actions';
import { selectAISuggestionResult } from './store/ai-suggestion.selectors';
import { MatIconModule } from '@angular/material/icon';
import { AICategory} from '../interfaces/aiSuggestion';
import { CategoryModel, ShoppingItemModel } from '../interfaces/shoppingList';
import { ShoppingListItemForm } from '../shopping-list-item-form/shopping-list-item-form';
import { DataService } from '../service/data-service';

@Component({
  selector: 'app-ai-suggestion',
  imports: [MatExpansionModule, MatButtonModule, CommonModule, ReactiveFormsModule, MatIconModule, ShoppingListItemForm],
  templateUrl: './ai-suggestion.html',
  styleUrl: './ai-suggestion.scss',
})
export class AiSuggestion {
  readonly pageName = signal('AI Suggestions');

  fb = inject(NonNullableFormBuilder);
  isSubmitted = false;
  addNewItem = false;
  selectedCategory: string = '';
  aiCategory: AICategory | null = null;
  shoppingItem:ShoppingItemModel | null =null;
  newCategory: CategoryModel | null = null;
  newItem: ShoppingItemModel | null = null;
  store = inject(Store);
  private dataService = inject(DataService);
  suggestion$ = this.store.select(selectAISuggestionResult);

  constructor() {
    this.store.dispatch(loadAIShoppingList());
  }

  promptForm = this.fb.group({
    prompt: ['', [Validators.required]],
  });

  editItemsForm = this.fb.group({
    items: this.fb.array([]),
  });

  onClickSelectCategory(catId: string) {
    this.selectedCategory = catId;
  }

  onClickGenrate() {
    this.isSubmitted = true;
    const promptMessage = this.promptForm.get('prompt')?.value;

    if (promptMessage) {
      this.store.dispatch(createAIShoppingList({ prompt: promptMessage }));
    }
  }

  onClickClear() {
    this.isSubmitted = false;
    this.promptForm.reset({
      prompt: '',
    });
  }

  onClickRemoveCategory(suggestionId: string, catId: string) {
    if (catId) {
      this.store.dispatch(deleteAIShoppingList({ suggestionId, categoryId: catId }));
    }
  }

  onClickRemovePrompt(suggestionId: string) {
    if (suggestionId) {
      this.store.dispatch(deleteAIShoppingListAll({ suggestionId: suggestionId }));
    }
  }

  onClickRegenerate(id: string, prompt: string) {
    if (id && prompt) {
      this.store.dispatch(regenerateAIShoppingList({ suggestionId: id, prompt }));
    }
  }

  onClickConfirmCategory(id: string) {
    if(!this.selectedCategory) return
    this.store.dispatch(
      confirmAICategory({
        categoryId: this.selectedCategory,
      }),
    );
  }

  onClickDeleteItem(categoryId: string, itemId: string) {
    if (categoryId && itemId) {
      this.store.dispatch(deleteAIShoppingItem({ categoryId, itemId }));
    }
  }

  
  onClickUpdateItem(
    categoryId: string,
    itemId: string,
    itemName: HTMLInputElement,
    itemQty: HTMLInputElement,
    itemUnit: HTMLInputElement,
  ) {
    const name = itemName.value;
    const qty = itemQty.value;
    const unitValue = itemUnit.value;
    this.shoppingItem ={
      itemId: itemId,
      itemName: name,
      quantity: +qty,
      unit: this.dataService.normalizeUnit(unitValue),
      status: 'active',
      priority: 'normal',
      categoryId: categoryId,
    };
    this.addNewItem = true;
  }

  openCreateItemDialog(toggle: boolean){
    this.shoppingItem = null;
    if(toggle) this.dataService.openShoppingList.set(this.selectedCategory);
    this.addNewItem = toggle;
  }
}

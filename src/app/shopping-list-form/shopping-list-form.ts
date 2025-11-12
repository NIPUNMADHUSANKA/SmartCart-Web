import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, signal, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../service/category-service';
import { CategoryModel } from '../interfaces/shoppingList';

@Component({
  selector: 'app-shopping-list-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './shopping-list-form.html',
  styleUrl: './shopping-list-form.scss',
})
export class ShoppingListForm implements OnInit, OnChanges {

  constructor(private categoryService: CategoryService) { }

  fb = inject(NonNullableFormBuilder);

  @Input() categoryData!: CategoryModel | null;
  @Output() toggleCategoryDialog = new EventEmitter<boolean>(true);

  // State signals
  isUpdate = signal(false);
  isSubmitted = false;
  isValid = signal(false);

  shoppingCart = this.fb.group({
    categoryName: ['', [Validators.required, Validators.maxLength(30)]],
    description: ['', [Validators.maxLength(180)]],
    status: ['active'],
    icon: ['shopping_cart'],
    priority: ['normal'],
  });

  ngOnInit(): void {
    this.applyCategoryData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryData']) {
      this.applyCategoryData();
    }
  }

  private applyCategoryData() {
    if (this.categoryData) {
      this.isUpdate.set(true);
      this.shoppingCart.patchValue({
        categoryName: this.categoryData.categoryName ?? '',
        description: this.categoryData.description ?? '',
        status: (this.categoryData as any).status ?? 'active',
        icon: (this.categoryData as any).icon ?? 'shopping_cart',
        priority: (this.categoryData as any).priority ?? 'normal',
      });
    }
  }

  createUpdateList() {
    this.isSubmitted = true;
    this.isValid.set(this.shoppingCart.valid);
    if (this.isValid()) {
      const payload = this.shoppingCart.getRawValue() as CategoryModel;
      if (this.isUpdate()) {
        const categoryId = this.categoryData?.categoryId ?? '';
        this.categoryService.updateCategory(categoryId, payload).subscribe({
          next: (res) => {
            alert("Category updated successfully!");
            this.clearList();
          },
          error: (err) => {
            console.error('Failed to update category', err);
          },
        });
      } else {
        this.categoryService.saveCategory(payload).subscribe({
          next: (res) => {
            alert("Category saved successfully!");
            this.clearList();
          },
          error: (err) => {
            console.error('Failed to save category', err);
          },
        });
      }
    }
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
    this.isSubmitted = false
    this.shoppingCart.reset({
      categoryName: '',
      description: '',
      status: 'active',
      icon: 'shopping_cart',
      priority: 'normal',
    });
  }

  toggleCreateListDialog() {
    this.toggleCategoryDialog.emit(false);
  }

}

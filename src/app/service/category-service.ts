import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CategoryModel } from '../interfaces/shoppingList';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ADD_AI_SHOPPING_ITEM,
  CONFIRM_AI_CATEGORY,
  DELETE_AI_ALL_CATEGORY,
  DELETE_AI_CATEGORY,
  DELETE_AI_SHOPPING_ITEM,
  DELETE_CATEGORY,
  GENERATE_AI_PROMPT,
  GET_ALL_AI_CATEGORY,
  GET_ALL_CATEGORY,
  GET_CATEGORY,
  REGENERATE_AI_PROMPT,
  SAVE_CATEGORY,
  UPDATE_AI_SHOPPING_ITEM,
  UPDATE_CATEGORY,
} from './path';
import { AICategory, AIItem, AISuggestionResult } from '../interfaces/aiSuggestion';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  private getAuthHeaders(): HttpHeaders {
    let token: string | null = null;
    if (isPlatformBrowser(this.platformId) && typeof sessionStorage !== 'undefined') {
      token = sessionStorage.getItem('token');
    }
    if (token) {
      return new HttpHeaders({ Authorization: `Bearer ${token}` });
    }
    return new HttpHeaders();
  }

  saveCategory(input: CategoryModel): Observable<any> {
    return this.http.post(SAVE_CATEGORY, input, { headers: this.getAuthHeaders() });
  }

  getAllCategory(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(GET_ALL_CATEGORY, { headers: this.getAuthHeaders() });
  }

  getCategory(categoriesId: string): Observable<CategoryModel> {
    const url = GET_CATEGORY.replace(':categoryId', categoriesId);
    return this.http.get<CategoryModel>(url, { headers: this.getAuthHeaders() });
  }

  deleteCategory(categoryId: string): Observable<void> {
    const url = DELETE_CATEGORY.replace(':categoryId', categoryId);
    return this.http.delete<void>(url, {
      headers: this.getAuthHeaders(),
    });
  }

  updateCategory(categoryId: string, input: CategoryModel): Observable<any> {
    const url = UPDATE_CATEGORY.replace(':categoryId', categoryId);
    return this.http.patch<CategoryModel>(url, input, { headers: this.getAuthHeaders() });
  }

  aiCreateCategory(prompt: string): Observable<AISuggestionResult> {
    return this.http.post<AISuggestionResult>(GENERATE_AI_PROMPT, { prompt }, { headers: this.getAuthHeaders() });
  }

  getAllAICategory(): Observable<AISuggestionResult[]> {
    return this.http.get<AISuggestionResult[]>(GET_ALL_AI_CATEGORY, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteAICategory(categoryId: string): Observable<void> {
    const url = DELETE_AI_CATEGORY.replace(':categoryId', categoryId);
    return this.http.delete<void>(url, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteALLAICategory(suggestionId: string): Observable<void> {
    const url = DELETE_AI_ALL_CATEGORY.replace(':suggestionId', suggestionId);
    return this.http.delete<void>(url, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteAIShoppingItem(categoryId: string, itemId: string): Observable<void> {
    const originurl = DELETE_AI_SHOPPING_ITEM.replace(':categoryId', categoryId);
    const url = originurl.replace(':itemId', itemId);
    return this.http.delete<void>(url, {
      headers: this.getAuthHeaders(),
    });
  }

  updateAIShoppingItem(shoppingItem: AIItem) {
    return this.http.patch<AIItem>(
      UPDATE_AI_SHOPPING_ITEM,
      {
        itemId: shoppingItem.id,
        categoryId: shoppingItem.categoryId,
        itemName: shoppingItem.itemName,
        itemQty: shoppingItem.quantity,
        itemUnit: shoppingItem.unit,
      },
      { headers: this.getAuthHeaders() },
    );
  }

  aiReCreateCategory(suggestionId: string, prompt: string): Observable<any> {
    return this.http.post(REGENERATE_AI_PROMPT, { suggestionId, prompt }, { headers: this.getAuthHeaders() });
  }

  aiConfirmCategory(categoryId:string):Observable<AICategory>{
    return this.http.post<AICategory>(CONFIRM_AI_CATEGORY, { 
      cateId: categoryId
    }, { headers: this.getAuthHeaders() });
  }

  addAIShoppingItem(shoppingItem: AIItem): Observable<AIItem>{
    return this.http.post<AIItem>(
      ADD_AI_SHOPPING_ITEM,
      {
        itemId: shoppingItem.id,
        categoryId: shoppingItem.categoryId,
        itemName: shoppingItem.itemName,
        itemQty: shoppingItem.quantity,
        itemUnit: shoppingItem.unit,
      },
      { headers: this.getAuthHeaders() },
    );
  }

}

import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ShoppingItemModel } from "../interfaces/shoppingList";
import { Observable } from 'rxjs';
import { DELETE_SHOPPING_ITEM, GET_ALL_SHOPPING_ITEM, GET_ALL_SHOPPING_ITEM_BY_CATEGORY, SAVE_SHOPPING_ITEM, UPDATE_SHOPPING_ITEM } from './path';


@Injectable({
  providedIn: 'root'
})
export class ShoppingItem {

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  private getAuthHeader(): HttpHeaders {
    let token: string | null = null;
    if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
      token = localStorage.getItem('token');
    }
    if (token) {
      return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    }
    return new HttpHeaders();
  }


  saveShoppingItem(input: ShoppingItemModel): Observable<any> {
    return this.http.post(SAVE_SHOPPING_ITEM, input, { headers: this.getAuthHeader() });
  }

  getAllCategory(): Observable<ShoppingItemModel[]> {
    return this.http.get<ShoppingItemModel[]>(GET_ALL_SHOPPING_ITEM, { headers: this.getAuthHeader() });
  }

  getAllShoppingItem(categoryId: string): Observable<ShoppingItemModel[]> {
    const url = GET_ALL_SHOPPING_ITEM_BY_CATEGORY.replace(':categoryId', categoryId);
    return this.http.get<ShoppingItemModel[]>(url, { headers: this.getAuthHeader() });
  }

  updateShoppingItem(itemId: string, input: ShoppingItemModel): Observable<ShoppingItemModel> {
    const url = UPDATE_SHOPPING_ITEM.replace(':itemId', itemId);
    return this.http.patch<ShoppingItemModel>(url, input, { headers: this.getAuthHeader() });
  }

  updateStatusofShoppingItemService(itemId: string, status: string): Observable<ShoppingItemModel> {
    const url = UPDATE_SHOPPING_ITEM.replace(':itemId', itemId);
    return this.http.patch<ShoppingItemModel>(url, { status }, { headers: this.getAuthHeader() });
  }

  deleteShoppingItem(itemId: string) {
    const url = DELETE_SHOPPING_ITEM.replace(':itemId', itemId);
    return this.http.delete<ShoppingItemModel>(url, { headers: this.getAuthHeader() });
  }


}

import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { CategoryModel } from "../interfaces/shoppingList";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DELETE_CATEGORY, GET_ALL_CATEGORY, GET_CATEGORY, SAVE_CATEGORY, UPDATE_CATEGORY } from "./path";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

    private getAuthHeaders(): HttpHeaders {
        let token: string | null = null;
        if (isPlatformBrowser(this.platformId) && typeof sessionStorage !== 'undefined') {
            token = sessionStorage.getItem('token');
        }
        if (token) {
            return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
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
            headers: this.getAuthHeaders()
        });
    }

    updateCategory(categoryId: string, input: CategoryModel): Observable<any> {
        const url = UPDATE_CATEGORY.replace(':categoryId', categoryId);
        return this.http.patch<CategoryModel>(url, input, { headers: this.getAuthHeaders() });
    }


}

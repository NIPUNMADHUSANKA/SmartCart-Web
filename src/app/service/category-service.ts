import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { CategoryModel } from "../interfaces/shoppingList";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GET_ALL_CATEGORY, SAVE_CATEGORY } from "./path";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

    private getAuthHeaders(): HttpHeaders {
        let token: string | null = null;
        if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
            token = localStorage.getItem('token');
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

}

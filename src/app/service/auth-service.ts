import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID, signal } from "@angular/core";
import { UserLoginModel, UserProfileModel, UserTokenModel } from "../interfaces/shoppingList";
import { Observable } from "rxjs";
import { CREATE_USER, LOGIN_USER } from "./path";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    isUserLoggedIn = signal<boolean>(false);

    constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
        this.isUserLoggedIn.set(isPlatformBrowser(this.platformId)
            && typeof localStorage !== 'undefined'
            && !!localStorage.getItem('token'));
    }


    getToken(): string | null {
        let token: string | null = null;
        if (isPlatformBrowser(this.platformId) && typeof localStorage != 'undefined') {
            token = localStorage.getItem('token');
        }
        return token;
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    saveUser(input: UserProfileModel): Observable<UserProfileModel> {
        return this.http.post<UserProfileModel>(CREATE_USER, input);
    }

    loginUser(input: UserLoginModel): Observable<UserTokenModel> {
        return this.http.post<UserTokenModel>(LOGIN_USER, input);
    }

    logout(): void {
        if (isPlatformBrowser(this.platformId) && typeof localStorage != 'undefined') {
            localStorage.removeItem('token');
            this.isUserLoggedIn.set(false);
        }
    }

}
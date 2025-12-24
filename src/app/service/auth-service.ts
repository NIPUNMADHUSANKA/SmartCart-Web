import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID, signal } from "@angular/core";
import { LoginPayload, RegisterPayload, AuthTokenResponse } from "../interfaces/userProfile";
import { Observable } from "rxjs";
import { CREATE_USER, LOGIN_USER, ME } from "./path";
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

    private getAuthHeaders(): HttpHeaders {
        let token: string | null = this.getToken();
        if (token) {
            return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
        }
        return new HttpHeaders();
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

    me() {
        return this.http.get(ME, {headers: this.getAuthHeaders()});
    }

    saveUser(input: RegisterPayload): Observable<RegisterPayload> {
        return this.http.post<RegisterPayload>(CREATE_USER, input);
    }

    loginUser(input: LoginPayload): Observable<AuthTokenResponse> {
        return this.http.post<AuthTokenResponse>(LOGIN_USER, input);
    }

    logout(): void {
        if (isPlatformBrowser(this.platformId) && typeof localStorage != 'undefined') {
            localStorage.removeItem('token');
        }
    }

    getJwtExpMs(token:string): number | null {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (!payload?.exp) return null;
            return payload.exp * 1000; 
        } catch (error) {
            return null;
        }
    }

}
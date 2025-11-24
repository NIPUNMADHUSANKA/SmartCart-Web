import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { UserProfileModel } from "../interfaces/shoppingList";
import { Observable } from "rxjs";
import { CREATE_USER } from "./path";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId:Object){}


    saveUser(input:UserProfileModel):Observable<UserProfileModel>{
        return this.http.post<UserProfileModel>(CREATE_USER, input);
    }

}
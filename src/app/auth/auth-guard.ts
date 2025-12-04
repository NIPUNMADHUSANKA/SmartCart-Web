import { inject, Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { AuthService } from "../service/auth-service";
import { Store } from "@ngrx/store";
import { selectIsAuthenticated } from "./store/auth.selectors";
import { map, Observable, take } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    store = inject(Store);
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(): Observable<boolean | UrlTree> {
        return this.store.select(selectIsAuthenticated).pipe(
            take(1),
            map((isLoggedIn)=>
                isLoggedIn ? true : this.router.parseUrl('/login')
            )
        )
    }

}
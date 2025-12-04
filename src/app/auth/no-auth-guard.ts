import { inject, Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { AuthService } from "../service/auth-service";
import { map, Observable, take } from "rxjs";
import { Store } from "@ngrx/store";
import { selectIsAuthenticated } from "./store/auth.selectors";

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  store = inject(Store);
  constructor(
    private router: Router
  ) { }

  canActivate(): Observable<boolean | UrlTree>{
    return this.store.select(selectIsAuthenticated).pipe(
      take(1),
      map((isLoggedIn)=>
        isLoggedIn ? this.router.parseUrl('/home') : true
      )
    )
  }
}

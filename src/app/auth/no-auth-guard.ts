import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { AuthService } from "../service/auth-service";

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      return this.router.parseUrl('/home');

    }
    return true;

  }
}
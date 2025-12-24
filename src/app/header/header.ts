import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../auth/store/auth.selectors';
import { logout } from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  store = inject(Store);
  isLogin$ = this.store.select(selectIsAuthenticated);

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  logout() {
    this.store.dispatch(logout());
    this.closeMenu();
  }

}

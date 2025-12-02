import { Component, inject, OnChanges, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../service/auth-service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { initAuthFromStorage } from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit{

  store = inject(Store);

  constructor(public  authService: AuthService) {
  }

  ngOnInit(): void {
    this.store.dispatch(initAuthFromStorage());
  }

  logout() {
    this.authService.logout();
  }

}

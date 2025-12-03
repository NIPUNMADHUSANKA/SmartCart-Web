import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Header } from './header/header';
import { Store } from '@ngrx/store';
import { initAuthFromStorage } from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatInputModule, MatCardModule, MatFormFieldModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  
  protected readonly title = signal('SmartCart-Web');

  store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(initAuthFromStorage());
  }


}

import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Header } from './header/header';
import { Store } from '@ngrx/store';
import { initAuthFromStorage } from './auth/store/auth.actions';
import { Loader } from './shared/components/loader/loader';
import { selectGlobalLoading } from './shared/components/loader/ui.selectors';
import { CommonModule } from '@angular/common';
import { asapScheduler, observeOn } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatInputModule, MatCardModule, MatFormFieldModule, Header, Loader, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  
  protected readonly title = signal('SmartCart-Web');

  store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(initAuthFromStorage());
  }

  // Defer loader emissions to the next microtask to avoid expression-changed errors during the initial CD cycle
  loading$ = this.store.select(selectGlobalLoading).pipe(observeOn(asapScheduler));

}

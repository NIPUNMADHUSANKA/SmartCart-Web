import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../service/auth-service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../auth/store/auth.actions';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(private router: Router) { }

  fb = inject(NonNullableFormBuilder);
  store = inject(Store);
  authService = inject(AuthService);

  //State Signals
  isSubmitted = false;
  isValid = signal(false);

  loginForm = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  loginUser() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;
    if (this.loginForm.valid) {
      const payload = this.loginForm.getRawValue();
      this.store.dispatch(
        login({
          payload: {
            userName: payload.userName ?? '',
            password: payload.password ?? ''
          },
        })
      );
      this.clearLogin();
      this.router.navigate(['']);
    }
  }

  CreateAccount() {
    this.router.navigate(['/register']);
  }

  clearLogin() {
    this.isSubmitted = false;
    this.loginForm.reset({
      userName: '',
      password: ''
    })
  }

}

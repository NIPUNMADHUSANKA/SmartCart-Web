import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(private router: Router) { }

  fb = inject(NonNullableFormBuilder);
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
    if (this.loginForm.valid) {
      const payload = this.loginForm.getRawValue();
      this.authService.loginUser(payload).subscribe({
        next: (res) => {
          if (res?.accessToken) {
            localStorage.setItem('token', res.accessToken.toString());
            this.router.navigate(['/home']);
            this.authService.isUserLoggedIn.set(true);

          } else {
            localStorage.setItem('token', "");
          }
        },
        error: (err) => {
          alert(err?.error?.message || 'Login failed');
        }
      })
      this.clearLogin();

    }
  }
  
  CreateAccount(){
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

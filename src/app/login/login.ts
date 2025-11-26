import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../service/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

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
          } else {
            localStorage.setItem('token', "");
          }
        },
        error: (err) => {
          alert(err.error.message);
        }
      })
      this.clearLogin();

    }
  }

  clearLogin() {
    this.isSubmitted = false;
    this.loginForm.reset({
      userName: '',
      password: ''
    })
  }

}

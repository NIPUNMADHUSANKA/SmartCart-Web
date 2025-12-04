import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../service/auth-service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { register } from '../auth/store/auth.actions';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  store = inject(Store);
  constructor(private router: Router){}
  fb = inject(NonNullableFormBuilder);
  authService = inject(AuthService);

  //State Signals
  isSubmitted = false;
  isValid = signal(false);

  userRegister = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    userName: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  },
    {
      validators: [this.passwordMatchValidator,]
    }
  );

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPasswordControl = form.get('confirmPassword');
    const confirmPassword = confirmPasswordControl?.value;

    if (password !== confirmPassword) {
      confirmPasswordControl?.setErrors({ ...(confirmPasswordControl.errors ?? {}), mismatch: true });
      return { mismatch: true };
    }

    if (confirmPasswordControl?.hasError('mismatch')) {
      const errors = { ...(confirmPasswordControl.errors ?? {}) };
      delete errors['mismatch'];
      confirmPasswordControl.setErrors(Object.keys(errors).length ? errors : null);
    }

    return null;
  }


  createProfile() {
    this.isSubmitted = true;
    if (this.userRegister.valid) {
      const { confirmPassword, ...payload } = this.userRegister.getRawValue();

      this.store.dispatch(register({payload}));
      this.clearForm();
    }
  }

  LoginAccount(){
    this.router.navigate(['/login']);
  }

  clearForm() {
    this.isSubmitted = false;
    this.userRegister.reset({
      fullName: '',
      email: '',
      userName: '',
      password: '',
      confirmPassword: ''
    })
  }

}

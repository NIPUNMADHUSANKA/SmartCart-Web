import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../service/auth-service';
import { UserProfileModel } from '../interfaces/shoppingList';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

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
      validators: [this.passwordMatchValidator, ]
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
    if(this.userRegister.valid){
      const { confirmPassword,  ...payload} = this.userRegister.getRawValue();
      
      this.authService.saveUser(payload).subscribe({
        next: (res) =>{
          alert("User created successfully!");
        },
        error: (e) =>{
          alert('Failed to create user');
          console.error(e);
        }
      })
    }
    
  }

}

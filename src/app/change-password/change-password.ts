import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss',
})
export class ChangePassword {

  fb = inject(NonNullableFormBuilder);
  isSubmitted = false;
  @Input() showChangePassword!: boolean;
  @Output() closeChangePassword = new EventEmitter<boolean>();



  resetPassword = this.fb.group({
    currentPassword: ['', [Validators.required, Validators.minLength(6)]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  },
    {
      validators: [this.passwordMatchValidator]
    });

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('newPassword')?.value;
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


  clearForm() {
    this.isSubmitted = false;
    this.resetPassword.reset({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  }

  toggleChangePasswordfun() {
    this.clearForm();
    this.closeChangePassword.emit(false);
  }

  updatePassword(){
    this.isSubmitted = true;
    console.log(this.resetPassword.value)
  }

}

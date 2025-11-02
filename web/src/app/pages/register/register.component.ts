import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { CaptchaComponent } from '../../shared/components/captcha/captcha.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, CaptchaComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;
  captchaToken: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmation = group.get('password_confirmation')?.value;
    return password === confirmation ? null : { passwordMismatch: true };
  }

  onCaptchaVerified(token: string): void {
    this.captchaToken = token;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    if (this.registerForm.invalid || this.isLoading) {
      this.registerForm.markAllAsTouched();
      return;
    }

    if (!this.captchaToken) {
      this.notificationService.show('Por favor completa el CAPTCHA', 'warning');
      return;
    }

    this.isLoading = true;
    const formData = {
      ...this.registerForm.value,
      captcha_token: this.captchaToken
    };

    this.authService.register(formData).subscribe({
      next: () => {
        this.notificationService.show('Cuenta creada exitosamente. Verifica tu correo para activarla.', 'success');
        this.router.navigate(['/verify-email']);
      },
      error: (error) => {
        this.isLoading = false;
        this.captchaToken = null;
        const message = error.error?.message || 'Error al crear la cuenta. Intenta nuevamente.';
        this.notificationService.show(message, 'error');
      }
    });
  }

  getErrorMessage(field: string): string {
    const control = this.registerForm.get(field);
    
    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      const fieldNames: { [key: string]: string } = {
        name: 'El nombre',
        email: 'El correo',
        phone: 'El teléfono',
        address: 'La dirección',
        password: 'La contraseña',
        password_confirmation: 'La confirmación de contraseña'
      };
      return `${fieldNames[field]} es requerido`;
    }

    if (control.errors['email']) {
      return 'Ingresa un correo válido';
    }

    if (control.errors['minlength']) {
      const required = control.errors['minlength'].requiredLength;
      return `Debe tener al menos ${required} caracteres`;
    }

    if (control.errors['pattern'] && field === 'phone') {
      return 'Ingresa un teléfono válido de 9 dígitos';
    }

    if (field === 'password_confirmation' && this.registerForm.errors?.['passwordMismatch']) {
      return 'Las contraseñas no coinciden';
    }

    return '';
  }
}

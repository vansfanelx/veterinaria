import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;
  token: string | null = null;
  email: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
    this.email = this.route.snapshot.queryParams['email'];

    if (!this.token || !this.email) {
      this.notificationService.show('Enlace de recuperación inválido', 'error');
      this.router.navigate(['/forgot-password']);
    }
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmation = group.get('password_confirmation')?.value;
    return password === confirmation ? null : { passwordMismatch: true };
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    if (this.resetForm.invalid || this.isLoading || !this.token || !this.email) {
      this.resetForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const { password, password_confirmation } = this.resetForm.value;

    this.authService.resetPassword({
      token: this.token!,
      email: this.email!,
      password,
      password_confirmation
    }).subscribe({
      next: () => {
        this.notificationService.show('Contraseña restablecida exitosamente', 'success');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isLoading = false;
        const message = error.error?.message || 'Error al restablecer la contraseña';
        this.notificationService.show(message, 'error');
      }
    });
  }

  getErrorMessage(field: string): string {
    const control = this.resetForm.get(field);
    
    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return field === 'password' ? 'La contraseña es requerida' : 'La confirmación es requerida';
    }

    if (control.errors['minlength']) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }

    if (field === 'password_confirmation' && this.resetForm.errors?.['passwordMismatch']) {
      return 'Las contraseñas no coinciden';
    }

    return '';
  }
}

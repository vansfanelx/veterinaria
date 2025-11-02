import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth';
import { UserService } from '../../core/services/user';
import { NotificationService } from '../../core/services/notification';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  currentUser = signal<any>(null);
  loading = signal(false);
  error = signal('');
  activeTab = signal<'info' | 'password'>('info');

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: ['']
    });

    this.passwordForm = this.fb.group({
      current_password: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading.set(true);
    this.authService.currentUser$.subscribe({
      next: (user) => {
        if (user) {
          this.currentUser.set(user);
          this.profileForm.patchValue({
            name: user.name,
            email: user.email,
            phone: user.phone || '',
            address: user.address || ''
          });
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar el perfil');
        this.loading.set(false);
      }
    });
  }

  updateProfile(): void {
    if (this.profileForm.invalid) {
      Object.keys(this.profileForm.controls).forEach(key => {
        this.profileForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading.set(true);
    const userId = this.currentUser()?.id;

    this.userService.update(userId, this.profileForm.value).subscribe({
      next: (response) => {
        this.notificationService.success('Perfil actualizado exitosamente');
        // Actualizar el usuario en el servicio de autenticación
        const updatedUser = { ...this.currentUser(), ...this.profileForm.value };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        this.currentUser.set(updatedUser);
        this.loading.set(false);
      },
      error: (err) => {
        this.notificationService.error(err.error?.message || 'Error al actualizar el perfil');
        this.loading.set(false);
      }
    });
  }

  updatePassword(): void {
    if (this.passwordForm.invalid) {
      Object.keys(this.passwordForm.controls).forEach(key => {
        this.passwordForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading.set(true);
    const userId = this.currentUser()?.id;

    this.userService.updatePassword(userId, this.passwordForm.value).subscribe({
      next: () => {
        this.notificationService.success('Contraseña actualizada exitosamente');
        this.passwordForm.reset();
        this.loading.set(false);
      },
      error: (err) => {
        this.notificationService.error(err.error?.message || 'Error al actualizar la contraseña');
        this.loading.set(false);
      }
    });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('password_confirmation')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  isFieldInvalid(fieldName: string, formName: 'profile' | 'password' = 'profile'): boolean {
    const form = formName === 'profile' ? this.profileForm : this.passwordForm;
    const field = form.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string, formName: 'profile' | 'password' = 'profile'): string {
    const form = formName === 'profile' ? this.profileForm : this.passwordForm;
    const field = form.get(fieldName);
    
    if (field?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (field?.hasError('email')) {
      return 'Email inválido';
    }
    if (field?.hasError('minlength')) {
      return 'Mínimo 8 caracteres';
    }
    if (formName === 'password' && fieldName === 'password_confirmation' && form.hasError('passwordMismatch')) {
      return 'Las contraseñas no coinciden';
    }
    return '';
  }

  getRoleBadgeClass(): string {
    const role = this.currentUser()?.role;
    switch (role) {
      case 'admin':
        return 'badge-admin';
      case 'veterinarian':
        return 'badge-veterinarian';
      case 'user':
        return 'badge-user';
      default:
        return '';
    }
  }

  getRoleText(): string {
    const role = this.currentUser()?.role;
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'veterinarian':
        return 'Veterinario';
      case 'user':
        return 'Cliente';
      default:
        return role || '';
    }
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { User } from '../../core/models/models';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private fb = inject(FormBuilder);

  user: User | null = null;
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  isEditingProfile = false;
  isEditingPassword = false;
  isLoadingProfile = false;
  isLoadingPassword = false;
  showPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  ngOnInit() {
    this.initForms();
    this.loadUser();
  }

  initForms() {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^\d{9}$/)]],
      address: ['']
    });

    this.passwordForm = this.fb.group({
      current_password: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required]
    });
  }

  loadUser() {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.user = user;
        this.profileForm.patchValue({
          name: user.name,
          email: user.email,
          phone: user.phone || '',
          address: user.address || ''
        });
      }
    });
  }

  toggleEditProfile() {
    this.isEditingProfile = !this.isEditingProfile;
    if (!this.isEditingProfile) {
      this.loadUser();
    }
  }

  toggleEditPassword() {
    this.isEditingPassword = !this.isEditingPassword;
    if (!this.isEditingPassword) {
      this.passwordForm.reset();
    }
  }

  onProfileSubmit() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isLoadingProfile = true;
    const formData = this.profileForm.value;

    // Simulación de actualización - necesitarás implementar el endpoint
    setTimeout(() => {
      this.notificationService.show('Perfil actualizado exitosamente', 'success');
      this.isLoadingProfile = false;
      this.isEditingProfile = false;
    }, 1000);
  }

  onPasswordSubmit() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const { password, password_confirmation, current_password } = this.passwordForm.value;

    if (password !== password_confirmation) {
      this.notificationService.show('Las contraseñas no coinciden', 'error');
      return;
    }

    this.isLoadingPassword = true;

    // Simulación de actualización - necesitarás implementar el endpoint
    setTimeout(() => {
      this.notificationService.show('Contraseña actualizada exitosamente', 'success');
      this.isLoadingPassword = false;
      this.isEditingPassword = false;
      this.passwordForm.reset();
    }, 1000);
  }

  togglePasswordVisibility(field: 'current' | 'new' | 'confirm') {
    switch(field) {
      case 'current':
        this.showPassword = !this.showPassword;
        break;
      case 'new':
        this.showNewPassword = !this.showNewPassword;
        break;
      case 'confirm':
        this.showConfirmPassword = !this.showConfirmPassword;
        break;
    }
  }

  getProfileError(field: string): string {
    const control = this.profileForm.get(field);
    
    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return 'Este campo es requerido';
    }

    if (control.errors['email']) {
      return 'Ingresa un correo válido';
    }

    if (control.errors['minlength']) {
      const required = control.errors['minlength'].requiredLength;
      return `Debe tener al menos ${required} caracteres`;
    }

    if (control.errors['pattern']) {
      return 'Formato inválido (9 dígitos)';
    }

    return '';
  }

  getPasswordError(field: string): string {
    const control = this.passwordForm.get(field);
    
    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return 'Este campo es requerido';
    }

    if (control.errors['minlength']) {
      const required = control.errors['minlength'].requiredLength;
      return `Debe tener al menos ${required} caracteres`;
    }

    return '';
  }

  getRoleBadgeClass(): string {
    const role = this.user?.role;
    const classes: { [key: string]: string } = {
      admin: 'badge-admin',
      veterinarian: 'badge-vet',
      user: 'badge-user'
    };
    return classes[role || 'user'] || 'badge-user';
  }

  getRoleLabel(): string {
    const role = this.user?.role;
    const labels: { [key: string]: string } = {
      admin: 'Administrador',
      veterinarian: 'Veterinario',
      user: 'Usuario'
    };
    return labels[role || 'user'] || 'Usuario';
  }
}

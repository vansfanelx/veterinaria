import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WebService } from '../../core/services/web.service';
import { NotificationService } from '../../core/services/notification.service';
import { User } from '../../core/models/models';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  private webService = inject(WebService);
  private notificationService = inject(NotificationService);
  private fb = inject(FormBuilder);

  users = signal<User[]>([]);
  filteredUsers = signal<User[]>([]);
  isLoading = true;
  showModal = false;
  showDeleteModal = false;
  isEditMode = false;
  selectedUser: User | null = null;
  userForm!: FormGroup;
  searchTerm = '';
  roleFilter = 'all';

  ngOnInit() {
    this.initForm();
    this.loadUsers();
  }

  initForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^\d{9}$/)]],
      address: [''],
      role: ['user', Validators.required],
      password: [''],
      password_confirmation: ['']
    });
  }

  loadUsers() {
    this.isLoading = true;
    this.webService.getUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        this.applyFilters();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.notificationService.show('Error al cargar usuarios', 'error');
      }
    });
  }

  applyFilters() {
    let filtered = this.users();

    // Filtro por rol
    if (this.roleFilter !== 'all') {
      filtered = filtered.filter(u => u.role === this.roleFilter);
    }

    // Filtro por búsqueda
    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      filtered = filtered.filter(u => 
        u.name.toLowerCase().includes(search) ||
        u.email.toLowerCase().includes(search) ||
        (u.phone && u.phone.includes(search))
      );
    }

    this.filteredUsers.set(filtered);
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.applyFilters();
  }

  onRoleFilterChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.roleFilter = target.value;
    this.applyFilters();
  }

  openCreateModal() {
    this.isEditMode = false;
    this.selectedUser = null;
    this.userForm.reset({ role: 'user' });
    this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    this.userForm.get('password_confirmation')?.setValidators([Validators.required]);
    this.showModal = true;
  }

  openEditModal(user: User) {
    this.isEditMode = true;
    this.selectedUser = user;
    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role
    });
    this.userForm.get('password')?.clearValidators();
    this.userForm.get('password_confirmation')?.clearValidators();
    this.userForm.get('password')?.updateValueAndValidity();
    this.userForm.get('password_confirmation')?.updateValueAndValidity();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedUser = null;
    this.userForm.reset();
  }

  openDeleteModal(user: User) {
    this.selectedUser = user;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedUser = null;
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const formData = this.userForm.value;
    
    // Validar que las contraseñas coincidan si se proporcionan
    if (formData.password && formData.password !== formData.password_confirmation) {
      this.notificationService.show('Las contraseñas no coinciden', 'error');
      return;
    }

    if (this.isEditMode && this.selectedUser) {
      this.updateUser(formData);
    } else {
      this.createUser(formData);
    }
  }

  createUser(data: any) {
    this.webService.createUser(data).subscribe({
      next: () => {
        this.notificationService.show('Usuario creado exitosamente', 'success');
        this.closeModal();
        this.loadUsers();
      },
      error: (error) => {
        const message = error.error?.message || 'Error al crear usuario';
        this.notificationService.show(message, 'error');
      }
    });
  }

  updateUser(data: any) {
    if (!this.selectedUser) return;

    this.webService.updateUser(this.selectedUser.id, data).subscribe({
      next: () => {
        this.notificationService.show('Usuario actualizado exitosamente', 'success');
        this.closeModal();
        this.loadUsers();
      },
      error: (error) => {
        const message = error.error?.message || 'Error al actualizar usuario';
        this.notificationService.show(message, 'error');
      }
    });
  }

  confirmDelete() {
    if (!this.selectedUser) return;

    this.webService.deleteUser(this.selectedUser.id).subscribe({
      next: () => {
        this.notificationService.show('Usuario eliminado exitosamente', 'success');
        this.closeDeleteModal();
        this.loadUsers();
      },
      error: (error) => {
        const message = error.error?.message || 'Error al eliminar usuario';
        this.notificationService.show(message, 'error');
      }
    });
  }

  getRoleBadgeClass(role: string): string {
    const classes: { [key: string]: string } = {
      admin: 'badge-admin',
      veterinarian: 'badge-vet',
      user: 'badge-user'
    };
    return classes[role] || 'badge-user';
  }

  getRoleLabel(role: string): string {
    const labels: { [key: string]: string } = {
      admin: 'Administrador',
      veterinarian: 'Veterinario',
      user: 'Usuario'
    };
    return labels[role] || role;
  }

  getErrorMessage(field: string): string {
    const control = this.userForm.get(field);
    
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
      return 'Formato inválido';
    }

    return '';
  }
}

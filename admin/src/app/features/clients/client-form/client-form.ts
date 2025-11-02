import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user';
import { User } from '../../../core/models/models';
import { NotificationService } from '../../../core/services/notification';

@Component({
  selector: 'app-client-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './client-form.html',
  styleUrl: './client-form.scss',
})
export class ClientForm implements OnInit {
  clientForm: FormGroup;
  isEditMode = false;
  clientId: number | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
      role: ['user']
    });
  }

  ngOnInit(): void {
    this.clientId = Number(this.route.snapshot.params['id']);
    if (this.clientId) {
      this.isEditMode = true;
      this.loadClient(this.clientId);
    }
  }

  loadClient(id: number): void {
    this.loading = true;
    this.userService.getById(id).subscribe({
      next: (client) => {
        this.clientForm.patchValue(client);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el cliente';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.clientForm.invalid) {
      Object.keys(this.clientForm.controls).forEach(key => {
        this.clientForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    const clientData: Partial<User> = this.clientForm.value;

    const request = this.isEditMode && this.clientId
      ? this.userService.update(this.clientId, clientData)
      : this.userService.create(clientData);

    request.subscribe({
      next: () => {
        const message = this.isEditMode 
          ? 'Cliente actualizado exitosamente'
          : 'Cliente creado exitosamente';
        this.notificationService.success(message);
        this.router.navigate(['/clients']);
      },
      error: (err) => {
        this.error = 'Error al guardar el cliente';
        this.notificationService.error(this.error);
        this.loading = false;
        console.error(err);
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.clientForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.clientForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (field?.hasError('email')) {
      return 'Email inválido';
    }
    return '';
  }
}

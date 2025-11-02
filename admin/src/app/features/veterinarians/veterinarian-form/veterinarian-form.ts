import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user';
import { User } from '../../../core/models/models';
import { NotificationService } from '../../../core/services/notification';

@Component({
  selector: 'app-veterinarian-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './veterinarian-form.html',
  styleUrl: './veterinarian-form.scss',
})
export class VeterinarianForm implements OnInit {
  veterinarianForm: FormGroup;
  isEditMode = false;
  veterinarianId: number | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.veterinarianForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
      role: ['veterinarian']
    });
  }

  ngOnInit(): void {
    this.veterinarianId = Number(this.route.snapshot.params['id']);
    if (this.veterinarianId) {
      this.isEditMode = true;
      this.loadVeterinarian(this.veterinarianId);
    }
  }

  loadVeterinarian(id: number): void {
    this.loading = true;
    this.userService.getById(id).subscribe({
      next: (veterinarian) => {
        this.veterinarianForm.patchValue(veterinarian);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el veterinario';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.veterinarianForm.invalid) {
      Object.keys(this.veterinarianForm.controls).forEach(key => {
        this.veterinarianForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    const veterinarianData: Partial<User> = this.veterinarianForm.value;

    const request = this.isEditMode && this.veterinarianId
      ? this.userService.update(this.veterinarianId, veterinarianData)
      : this.userService.create(veterinarianData);

    request.subscribe({
      next: () => {
        const message = this.isEditMode 
          ? 'Veterinario actualizado exitosamente'
          : 'Veterinario creado exitosamente';
        this.notificationService.success(message);
        this.router.navigate(['/veterinarians']);
      },
      error: (err) => {
        this.error = 'Error al guardar el veterinario';
        this.notificationService.error(this.error);
        this.loading = false;
        console.error(err);
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.veterinarianForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.veterinarianForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (field?.hasError('email')) {
      return 'Email inválido';
    }
    return '';
  }
}

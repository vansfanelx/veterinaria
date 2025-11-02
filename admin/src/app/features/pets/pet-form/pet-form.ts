import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { PetService } from '../../../core/services/pet';
import { Pet } from '../../../core/models/models';
import { NotificationService } from '../../../core/services/notification';

@Component({
  selector: 'app-pet-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './pet-form.html',
  styleUrl: './pet-form.scss',
})
export class PetForm implements OnInit {
  petForm: FormGroup;
  isEditMode = false;
  petId: number | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.petForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      species: ['', Validators.required],
      breed: ['', Validators.maxLength(100)],
      birth_date: [''],
      gender: [''],
      color: ['', Validators.maxLength(50)],
      weight: ['', [Validators.min(0), Validators.max(500)]],
      owner_id: [1, Validators.required], // Por defecto 1, debería ser dinámico
      notes: ['', Validators.maxLength(1000)]
    });
  }

  ngOnInit(): void {
    this.petId = this.route.snapshot.params['id'];
    if (this.petId) {
      this.isEditMode = true;
      this.loadPet(this.petId);
    }
  }

  loadPet(id: number): void {
    this.loading = true;
    this.petService.getById(id).subscribe({
      next: (pet) => {
        // Formatear la fecha para el input type="date"
        const formData = { ...pet };
        if (formData.birth_date) {
          formData.birth_date = formData.birth_date.split('T')[0];
        }
        this.petForm.patchValue(formData);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar la mascota';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.petForm.invalid) {
      this.markFormGroupTouched(this.petForm);
      this.notificationService.warning('Por favor complete todos los campos requeridos correctamente');
      return;
    }

    this.loading = true;
    this.error = null;
    const petData: Pet = { ...this.petForm.value };

    // Formatear la fecha de nacimiento al formato correcto yyyy-MM-dd
    if (petData.birth_date) {
      const date = new Date(petData.birth_date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      petData.birth_date = `${year}-${month}-${day}`;
    }

    // Convertir weight a número si existe
    if (petData.weight) {
      petData.weight = Number(petData.weight);
    }

    const request = this.isEditMode && this.petId
      ? this.petService.update(this.petId, petData)
      : this.petService.create(petData);

    request.subscribe({
      next: () => {
        const message = this.isEditMode 
          ? `Mascota "${petData.name}" actualizada exitosamente`
          : `Mascota "${petData.name}" registrada exitosamente`;
        this.notificationService.success(message);
        this.router.navigate(['/pets']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al guardar mascota:', err);
        
        if (err.status === 422 && err.error?.errors) {
          // Errores de validación del backend
          const errors = err.error.errors;
          const firstError = Object.values(errors)[0] as string[];
          this.error = firstError[0];
          this.notificationService.error(firstError[0]);
        } else if (err.status === 419) {
          this.error = 'Error de autenticación. Por favor recargue la página.';
          this.notificationService.error('Error de autenticación. Por favor recargue la página.');
        } else if (err.status === 0) {
          this.error = 'No se puede conectar con el servidor. Verifique que el backend esté ejecutándose.';
          this.notificationService.error('No se puede conectar con el servidor');
        } else {
          const errorMessage = err.error?.message || 'Error al guardar la mascota. Intente nuevamente.';
          this.error = errorMessage;
          this.notificationService.error(errorMessage);
        }
      }
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
      control?.updateValueAndValidity();
    });
  }
}

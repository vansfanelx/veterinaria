import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AppointmentService } from '../../../core/services/appointment';
import { PetService } from '../../../core/services/pet';
import { Appointment } from '../../../core/models/models';
import { Pet } from '../../../core/models/models';
import { NotificationService } from '../../../core/services/notification';

@Component({
  selector: 'app-appointment-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './appointment-form.html',
  styleUrl: './appointment-form.scss',
})
export class AppointmentForm implements OnInit {
  appointmentForm: FormGroup;
  isEditMode = false;
  appointmentId: number | null = null;
  loading = false;
  error: string | null = null;
  pets: Pet[] = [];
  filteredPets: Pet[] = [];
  selectedPet: Pet | null = null;
  petSearchTerm: string = '';
  showPetDropdown = false;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private petService: PetService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.appointmentForm = this.fb.group({
      pet_id: ['', Validators.required],
      user_id: [1, Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      reason: ['', Validators.required],
      notes: [''],
      status: ['pending', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPets();
    
    // Obtener pet_id de los query params si existe
    const petIdParam = this.route.snapshot.queryParams['pet_id'];
    if (petIdParam) {
      this.appointmentForm.patchValue({
        pet_id: Number(petIdParam)
      });
    }
    
    this.appointmentId = this.route.snapshot.params['id'];
    if (this.appointmentId) {
      this.isEditMode = true;
      this.loadAppointment(this.appointmentId);
    }
  }

  loadPets(): void {
    this.petService.getAll().subscribe({
      next: (data) => {
        this.pets = data;
        this.filteredPets = data;
        
        // Si hay pet_id preseleccionado, buscar y seleccionar la mascota
        const petIdParam = this.route.snapshot.queryParams['pet_id'];
        if (petIdParam && !this.isEditMode) {
          const pet = this.pets.find(p => p.id === Number(petIdParam));
          if (pet) {
            this.selectPet(pet);
          }
        }
      },
      error: (err) => {
        console.error('Error loading pets', err);
      }
    });
  }

  filterPets(): void {
    const term = this.petSearchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredPets = this.pets;
    } else {
      this.filteredPets = this.pets.filter(pet => 
        pet.name.toLowerCase().includes(term) || 
        pet.species.toLowerCase().includes(term) ||
        (pet.breed?.toLowerCase().includes(term) || false) ||
        (pet.owner?.name.toLowerCase().includes(term) || false)
      );
    }
  }

  selectPet(pet: Pet): void {
    this.selectedPet = pet;
    this.petSearchTerm = `${pet.name} - ${pet.species}`;
    this.appointmentForm.patchValue({ pet_id: pet.id });
    this.showPetDropdown = false;
  }

  clearPetSelection(): void {
    this.selectedPet = null;
    this.petSearchTerm = '';
    this.appointmentForm.patchValue({ pet_id: '' });
    this.showPetDropdown = true;
    this.filterPets();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.search-wrapper')) {
      this.showPetDropdown = false;
    }
  }

  loadAppointment(id: number): void {
    this.loading = true;
    this.appointmentService.getById(id).subscribe({
      next: (appointment) => {
        this.appointmentForm.patchValue({
          pet_id: appointment.pet_id,
          user_id: appointment.user_id,
          date: appointment.date,
          time: appointment.time,
          reason: appointment.reason,
          notes: appointment.notes,
          status: appointment.status
        });
        
        // Establecer mascota seleccionada si existe
        if (appointment.pet) {
          this.selectedPet = appointment.pet;
          this.petSearchTerm = `${appointment.pet.name} - ${appointment.pet.species}`;
        }
        
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar la cita';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.appointmentForm.invalid) {
      this.notificationService.warning('Por favor complete todos los campos requeridos');
      return;
    }

    this.loading = true;
    const appointmentData: Appointment = this.appointmentForm.value;

    const request = this.isEditMode && this.appointmentId
      ? this.appointmentService.update(this.appointmentId, appointmentData)
      : this.appointmentService.create(appointmentData);

    request.subscribe({
      next: () => {
        const message = this.isEditMode 
          ? 'Cita actualizada exitosamente'
          : 'Cita agendada exitosamente';
        this.notificationService.success(message);
        this.router.navigate(['/appointments']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al guardar cita:', err);
        
        if (err.status === 422 && err.error?.errors) {
          const errors = err.error.errors;
          const firstError = Object.values(errors)[0] as string[];
          this.error = firstError[0];
          this.notificationService.error(firstError[0]);
        } else {
          this.error = 'Error al guardar la cita';
          this.notificationService.error('Error al guardar la cita');
        }
      }
    });
  }

  getStatusLabel(status: string | null | undefined): string {
    const statusMap: { [key: string]: string } = {
      'pending': '⏳ Pendiente',
      'confirmed': '✅ Confirmada',
      'completed': '✔️ Completada',
      'cancelled': '❌ Cancelada'
    };
    return status ? statusMap[status] || status : 'No seleccionado';
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PetService } from '../../../core/services/pet';
import { AppointmentService } from '../../../core/services/appointment';
import { MedicalHistoryService } from '../../../core/services/medical-history';
import { Pet } from '../../../core/models/models';
import { Appointment } from '../../../core/models/models';
import { MedicalHistory } from '../../../core/models/models';

@Component({
  selector: 'app-pet-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './pet-detail.html',
  styleUrl: './pet-detail.scss',
})
export class PetDetail implements OnInit {
  pet: Pet | null = null;
  appointments: Appointment[] = [];
  medicalHistories: MedicalHistory[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private petService: PetService,
    private appointmentService: AppointmentService,
    private medicalHistoryService: MedicalHistoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadPet(id);
      this.loadAppointments(id);
      this.loadMedicalHistories(id);
    }
  }

  loadPet(id: number): void {
    this.loading = true;
    this.petService.getById(id).subscribe({
      next: (data) => {
        this.pet = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar la mascota';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadAppointments(petId: number): void {
    this.appointmentService.getAll({ pet_id: petId }).subscribe({
      next: (data) => {
        this.appointments = data;
      },
      error: (err) => {
        console.error('Error loading appointments', err);
      }
    });
  }

  loadMedicalHistories(petId: number): void {
    this.medicalHistoryService.getAll(petId).subscribe({
      next: (data) => {
        this.medicalHistories = data;
      },
      error: (err) => {
        console.error('Error loading medical histories', err);
      }
    });
  }

  deletePet(): void {
    if (!this.pet || !confirm('¿Está seguro de eliminar esta mascota?')) {
      return;
    }

    this.petService.delete(this.pet.id!).subscribe({
      next: () => {
        this.router.navigate(['/pets']);
      },
      error: (err) => {
        this.error = 'Error al eliminar la mascota';
        console.error(err);
      }
    });
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'pending': 'status-pending',
      'confirmed': 'status-confirmed',
      'completed': 'status-completed',
      'cancelled': 'status-cancelled'
    };
    return statusMap[status] || '';
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'pending': 'Pendiente',
      'confirmed': 'Confirmada',
      'completed': 'Completada',
      'cancelled': 'Cancelada'
    };
    return statusMap[status] || status;
  }
}

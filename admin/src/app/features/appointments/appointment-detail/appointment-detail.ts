import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../../../core/services/appointment';
import { Appointment } from '../../../core/models/models';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal';
import { NotificationService } from '../../../core/services/notification';

@Component({
  selector: 'app-appointment-detail',
  imports: [CommonModule, RouterModule, ConfirmModalComponent],
  templateUrl: './appointment-detail.html',
  styleUrl: './appointment-detail.scss',
})
export class AppointmentDetail implements OnInit {
  appointment: Appointment | null = null;
  loading = false;
  error: string | null = null;
  showDeleteModal = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadAppointment(id);
    }
  }

  loadAppointment(id: number): void {
    this.loading = true;
    this.error = null;

    this.appointmentService.getById(id).subscribe({
      next: (data) => {
        this.appointment = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar la cita';
        this.loading = false;
        console.error(err);
      }
    });
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'pending': 'Pendiente',
      'confirmed': 'Confirmada',
      'completed': 'Completada',
      'cancelled': 'Cancelada'
    };
    return labels[status] || status;
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  openDeleteModal(): void {
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  confirmDelete(): void {
    if (!this.appointment?.id) return;

    this.appointmentService.delete(this.appointment.id).subscribe({
      next: () => {
        this.notificationService.success('Cita eliminada exitosamente');
        this.router.navigate(['/appointments']);
      },
      error: (err) => {
        console.error('Error al eliminar cita:', err);
        this.notificationService.error('Error al eliminar la cita');
        this.closeDeleteModal();
      }
    });
  }
}

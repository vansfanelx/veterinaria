import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../../core/services/appointment';
import { Appointment } from '../../../core/models/models';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal';
import { NotificationService } from '../../../core/services/notification';

@Component({
  selector: 'app-appointment-list',
  imports: [CommonModule, RouterModule, FormsModule, ConfirmModalComponent],
  templateUrl: './appointment-list.html',
  styleUrl: './appointment-list.scss',
})
export class AppointmentList implements OnInit {
  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  loading = false;
  error: string | null = null;
  filterDate = '';
  filterStatus = '';
  searchTerm = '';
  
  // Control del modal
  showDeleteModal = false;
  appointmentToDelete: Appointment | null = null;

  constructor(
    private appointmentService: AppointmentService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.loading = true;
    this.error = null;

    this.appointmentService.getAll().subscribe({
      next: (data) => {
        this.appointments = data;
        this.filterAppointments();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las citas';
        this.loading = false;
        console.error(err);
      }
    });
  }

  filterAppointments(): void {
    let filtered = [...this.appointments];

    // Filtrar por fecha
    if (this.filterDate) {
      filtered = filtered.filter(appointment => {
        const appointmentDate = new Date(appointment.date).toISOString().split('T')[0];
        return appointmentDate === this.filterDate;
      });
    }

    // Filtrar por estado
    if (this.filterStatus) {
      filtered = filtered.filter(appointment => 
        appointment.status === this.filterStatus
      );
    }

    // Filtrar por término de búsqueda
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(appointment => 
        appointment.pet?.name.toLowerCase().includes(term) ||
        appointment.user?.name.toLowerCase().includes(term) ||
        appointment.reason.toLowerCase().includes(term)
      );
    }

    this.filteredAppointments = filtered;
  }

  applyFilters(): void {
    this.filterAppointments();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.filterDate = '';
    this.filterStatus = '';
    this.loadAppointments();
  }

  openDeleteModal(appointment: Appointment): void {
    this.appointmentToDelete = appointment;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.appointmentToDelete = null;
  }

  confirmDelete(): void {
    if (!this.appointmentToDelete?.id) return;

    this.appointmentService.delete(this.appointmentToDelete.id).subscribe({
      next: () => {
        this.notificationService.success('Cita eliminada exitosamente');
        this.closeDeleteModal();
        this.loadAppointments();
      },
      error: (err) => {
        console.error('Error al eliminar cita:', err);
        this.notificationService.error('Error al eliminar la cita');
        this.closeDeleteModal();
      }
    });
  }

  getStatusClass(status: string): string {
    const classes: any = {
      'pending': 'status-pending',
      'confirmed': 'status-confirmed',
      'completed': 'status-completed',
      'cancelled': 'status-cancelled'
    };
    return classes[status] || '';
  }

  getStatusText(status: string): string {
    const texts: any = {
      'pending': 'Pendiente',
      'confirmed': 'Confirmada',
      'completed': 'Completada',
      'cancelled': 'Cancelada'
    };
    return texts[status] || status;
  }
}

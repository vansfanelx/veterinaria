import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WebService } from '../../core/services/web.service';
import { NotificationService } from '../../core/services/notification.service';
import { Appointment } from '../../core/models/models';

interface AppointmentView {
  id: number;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  pet_name: string;
  pet_species: string;
  veterinarian: string;
  reason: string;
  observations?: string;
}

@Component({
  selector: 'app-my-appointments',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-appointments.component.html',
  styleUrl: './my-appointments.component.scss'
})
export class MyAppointmentsComponent implements OnInit {
  private webService = inject(WebService);
  private notificationService = inject(NotificationService);
  
  appointments: AppointmentView[] = [];
  filteredAppointments: AppointmentView[] = [];
  isLoading = true;
  selectedFilter: 'all' | 'upcoming' | 'past' = 'all';
  appointmentToCancel: AppointmentView | null = null;
  showCancelModal = false;

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.isLoading = true;
    this.webService.getMyAppointments().subscribe({
      next: (appointments) => {
        // Convertir Appointment[] a AppointmentView[]
        this.appointments = appointments.map(apt => ({
          id: apt.id,
          date: apt.date,
          time: apt.time,
          status: apt.status as 'pending' | 'confirmed' | 'completed' | 'cancelled',
          pet_name: apt.pet?.name || 'N/A',
          pet_species: apt.pet?.species || 'N/A',
          veterinarian: apt.veterinarian?.name || 'N/A',
          reason: apt.reason,
          observations: apt.pet?.breed
        }));
        this.applyFilter();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.notificationService.show('Error al cargar las citas', 'error');
      }
    });
  }

  applyFilter() {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Comparar solo fechas sin hora
    
    switch(this.selectedFilter) {
      case 'upcoming':
        this.filteredAppointments = this.appointments.filter(apt => {
          const aptDate = new Date(apt.date);
          aptDate.setHours(0, 0, 0, 0);
          return aptDate >= now && apt.status !== 'cancelled' && apt.status !== 'completed';
        });
        break;
      case 'past':
        this.filteredAppointments = this.appointments.filter(apt => {
          const aptDate = new Date(apt.date);
          aptDate.setHours(0, 0, 0, 0);
          return aptDate < now || apt.status === 'completed' || apt.status === 'cancelled';
        });
        break;
      default:
        this.filteredAppointments = [...this.appointments];
    }
  }

  setFilter(filter: 'all' | 'upcoming' | 'past') {
    this.selectedFilter = filter;
    this.applyFilter();
  }

  openCancelModal(appointment: AppointmentView) {
    this.appointmentToCancel = appointment;
    this.showCancelModal = true;
  }

  closeCancelModal() {
    this.showCancelModal = false;
    this.appointmentToCancel = null;
  }

  confirmCancel() {
    if (!this.appointmentToCancel) return;

    this.webService.cancelAppointment(this.appointmentToCancel.id).subscribe({
      next: () => {
        this.notificationService.show('Cita cancelada exitosamente', 'success');
        this.loadAppointments();
        this.closeCancelModal();
      },
      error: () => {
        this.notificationService.show('Error al cancelar la cita', 'error');
      }
    });
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      pending: 'Pendiente',
      confirmed: 'Confirmada',
      completed: 'Completada',
      cancelled: 'Cancelada'
    };
    return labels[status] || status;
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  canCancel(appointment: AppointmentView): boolean {
    if (appointment.status === 'cancelled' || appointment.status === 'completed') {
      return false;
    }
    const aptDate = new Date(appointment.date + ' ' + appointment.time);
    const now = new Date();
    return aptDate > now;
  }
}

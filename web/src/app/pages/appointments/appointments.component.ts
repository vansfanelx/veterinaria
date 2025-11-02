import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebService } from '../../core/services/web.service';
import { NotificationService } from '../../core/services/notification.service';
import { AvailableSlot } from '../../core/models/models';

interface TimeSlot {
  time: string;
  available: boolean;
}

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private webService = inject(WebService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  appointmentForm: FormGroup;
  currentDate = new Date();
  selectedDate: Date | null = null;
  calendarDays: Date[] = [];
  availableSlots = signal<TimeSlot[]>([]);
  veterinarians = signal<any[]>([]);
  userPets = signal<any[]>([]);
  isLoading = false;
  isSubmitting = false;
  showNewPetForm = false;

  weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  constructor() {
    this.appointmentForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      veterinarian_id: ['', Validators.required],
      pet_id: [''],
      pet_name: ['', [Validators.required, Validators.minLength(2)]],
      pet_species: ['', Validators.required],
      pet_breed: [''],
      reason: ['', [Validators.required, Validators.minLength(10)]],
      observations: ['']
    });
  }

  ngOnInit() {
    this.generateCalendar();
    this.loadVeterinarians();
    this.loadUserPets();
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    this.calendarDays = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(day.getDate() + i);
      this.calendarDays.push(day);
    }
  }

  loadVeterinarians() {
    this.webService.getVeterinarians().subscribe({
      next: (vets) => this.veterinarians.set(vets),
      error: () => this.notificationService.show('Error al cargar veterinarios', 'error')
    });
  }

  loadUserPets() {
    this.webService.getMyPets().subscribe({
      next: (pets) => {
        this.userPets.set(pets);
        if (pets.length > 0) {
          this.appointmentForm.patchValue({ pet_id: pets[0].id });
          this.onPetChange(pets[0].id.toString());
        }
      },
      error: () => {
        // Si hay error cargando mascotas, mostrar formulario para nueva mascota
        this.showNewPetForm = true;
      }
    });
  }

  onPetChange(petId: string) {
    if (petId === 'new') {
      this.showNewPetForm = true;
      this.appointmentForm.patchValue({
        pet_id: '',
        pet_name: '',
        pet_species: '',
        pet_breed: ''
      });
    } else {
      this.showNewPetForm = false;
      const pet = this.userPets().find(p => p.id === Number(petId));
      if (pet) {
        this.appointmentForm.patchValue({
          pet_name: pet.name,
          pet_species: pet.species,
          pet_breed: pet.breed || ''
        });
      }
    }
  }

  selectDate(date: Date) {
    if (!this.isDateAvailable(date)) return;
    
    this.selectedDate = date;
    this.appointmentForm.patchValue({ 
      date: this.formatDate(date),
      time: ''
    });
    this.loadAvailableSlots(date);
  }

  loadAvailableSlots(date: Date) {
    this.isLoading = true;
    const formattedDate = this.formatDate(date);
    
    this.webService.getAvailableSlots(formattedDate).subscribe({
      next: (data) => {
        // El backend devuelve un array de objetos con fechas y slots
        // Buscar el objeto que corresponde a la fecha seleccionada
        const dateSlots = data.find(item => item.date === formattedDate);
        
        if (dateSlots && dateSlots.slots && dateSlots.slots.length > 0) {
          // Convertir los slots disponibles a TimeSlot[]
          const timeSlots: TimeSlot[] = dateSlots.slots.map(time => ({ 
            time, 
            available: true 
          }));
          this.availableSlots.set(timeSlots);
        } else {
          // Si no hay slots para esa fecha, generar horarios predeterminados
          this.generateDefaultSlots();
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar horarios:', err);
        this.isLoading = false;
        // Si hay error, generar horarios de ejemplo
        this.generateDefaultSlots();
      }
    });
  }

  generateDefaultSlots() {
    const defaultTimes = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
      '16:00', '16:30', '17:00', '17:30'
    ];
    const timeSlots: TimeSlot[] = defaultTimes.map(time => ({ time, available: true }));
    this.availableSlots.set(timeSlots);
    this.isLoading = false;
  }

  selectTime(slot: TimeSlot) {
    if (!slot.available) return;
    this.appointmentForm.patchValue({ time: slot.time });
  }

  isDateAvailable(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    
    return checkDate >= today && 
           date.getMonth() === this.currentDate.getMonth() &&
           date.getDay() !== 0; // No domingos
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  isSelected(date: Date): boolean {
    if (!this.selectedDate) return false;
    return date.getDate() === this.selectedDate.getDate() &&
           date.getMonth() === this.selectedDate.getMonth() &&
           date.getFullYear() === this.selectedDate.getFullYear();
  }

  previousMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
    this.selectedDate = null;
    this.availableSlots.set([]);
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
    this.selectedDate = null;
    this.availableSlots.set([]);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSubmit() {
    if (this.appointmentForm.invalid || this.isSubmitting) {
      this.appointmentForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    // Si es una mascota nueva, crear primero la mascota
    if (this.showNewPetForm || !this.appointmentForm.get('pet_id')?.value) {
      this.createPetAndAppointment();
    } else {
      this.createAppointment();
    }
  }

  createPetAndAppointment() {
    const petData = {
      name: this.appointmentForm.get('pet_name')?.value,
      species: this.appointmentForm.get('pet_species')?.value,
      breed: this.appointmentForm.get('pet_breed')?.value || null
    };

    this.webService.createPet(petData).subscribe({
      next: (response) => {
        this.appointmentForm.patchValue({ pet_id: response.pet.id });
        this.createAppointment();
      },
      error: (error) => {
        this.isSubmitting = false;
        const message = error.error?.message || 'Error al crear la mascota';
        this.notificationService.show(message, 'error');
      }
    });
  }

  createAppointment() {
    const appointmentData = {
      pet_id: this.appointmentForm.get('pet_id')?.value,
      veterinarian_id: Number(this.appointmentForm.get('veterinarian_id')?.value),
      date: this.appointmentForm.get('date')?.value,
      time: this.appointmentForm.get('time')?.value,
      reason: this.appointmentForm.get('reason')?.value
    };

    this.webService.requestAppointment(appointmentData).subscribe({
      next: () => {
        this.notificationService.show('Cita solicitada exitosamente', 'success');
        this.router.navigate(['/my-appointments']);
      },
      error: (error) => {
        this.isSubmitting = false;
        const message = error.error?.message || 'Error al solicitar la cita';
        this.notificationService.show(message, 'error');
      }
    });
  }

  getSelectedVeterinarianName(): string {
    const vetId = this.appointmentForm.get('veterinarian_id')?.value;
    if (!vetId) return 'No seleccionado';
    const vet = this.veterinarians().find(v => v.id === Number(vetId));
    return vet?.name || 'No seleccionado';
  }
}

import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AppointmentService } from '../../../core/services/appointment';
import { PetService } from '../../../core/services/pet';
import { UserService } from '../../../core/services/user';
import { NotificationService } from '../../../core/services/notification';

interface TimeSlot {
  time: string;
  available: boolean;
}

@Component({
  selector: 'app-appointment-calendar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './appointment-calendar.html',
  styleUrl: './appointment-calendar.scss',
})
export class AppointmentCalendar implements OnInit {
  private fb = inject(FormBuilder);
  private appointmentService = inject(AppointmentService);
  private petService = inject(PetService);
  private userService = inject(UserService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  appointmentForm: FormGroup;
  currentDate = new Date();
  selectedDate: Date | null = null;
  calendarDays: Date[] = [];
  availableSlots = signal<TimeSlot[]>([]);
  veterinarians = signal<any[]>([]);
  pets = signal<any[]>([]);
  clients = signal<any[]>([]);
  isLoading = false;
  isSubmitting = false;

  weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  constructor() {
    this.appointmentForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      veterinarian_id: ['', Validators.required],
      pet_id: ['', Validators.required],
      user_id: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(10)]],
      notes: [''],
      status: ['pending', Validators.required]
    });
  }

  ngOnInit() {
    this.generateCalendar();
    this.loadVeterinarians();
    this.loadPets();
    this.loadClients();
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
    this.userService.getAll().subscribe({
      next: (users) => {
        const vets = users.filter(user => user.role === 'veterinarian');
        this.veterinarians.set(vets);
      },
      error: () => this.notificationService.error('Error al cargar veterinarios')
    });
  }

  loadPets() {
    this.petService.getAll().subscribe({
      next: (pets) => this.pets.set(pets),
      error: () => this.notificationService.error('Error al cargar mascotas')
    });
  }

  loadClients() {
    this.userService.getAll().subscribe({
      next: (users) => {
        const clientUsers = users.filter(user => user.role === 'user');
        this.clients.set(clientUsers);
      },
      error: () => this.notificationService.error('Error al cargar clientes')
    });
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
    // Generar horarios por defecto
    this.generateDefaultSlots();
  }

  generateDefaultSlots() {
    const defaultTimes = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
      '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
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
    this.appointmentForm.patchValue({ date: '', time: '' });
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
    this.selectedDate = null;
    this.availableSlots.set([]);
    this.appointmentForm.patchValue({ date: '', time: '' });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onPetChange(petId: string) {
    const pet = this.pets().find(p => p.id === Number(petId));
    if (pet) {
      // Auto-seleccionar el dueño de la mascota
      this.appointmentForm.patchValue({ user_id: pet.user_id });
    }
  }

  onSubmit() {
    if (this.appointmentForm.invalid || this.isSubmitting) {
      this.appointmentForm.markAllAsTouched();
      this.notificationService.error('Por favor completa todos los campos requeridos');
      return;
    }

    this.isSubmitting = true;

    const appointmentData = {
      ...this.appointmentForm.value,
      veterinarian_id: Number(this.appointmentForm.value.veterinarian_id),
      pet_id: Number(this.appointmentForm.value.pet_id),
      user_id: Number(this.appointmentForm.value.user_id)
    };

    this.appointmentService.create(appointmentData).subscribe({
      next: () => {
        this.notificationService.success('Cita creada exitosamente');
        this.router.navigate(['/appointments']);
      },
      error: (error) => {
        this.isSubmitting = false;
        const message = error.error?.message || 'Error al crear la cita';
        this.notificationService.error(message);
      }
    });
  }

  getSelectedVeterinarianName(): string {
    const vetId = this.appointmentForm.get('veterinarian_id')?.value;
    if (!vetId) return 'No seleccionado';
    const vet = this.veterinarians().find(v => v.id === Number(vetId));
    return vet?.name || 'No seleccionado';
  }

  getSelectedPetName(): string {
    const petId = this.appointmentForm.get('pet_id')?.value;
    if (!petId) return 'No seleccionada';
    const pet = this.pets().find(p => p.id === Number(petId));
    return pet?.name || 'No seleccionada';
  }

  getSelectedClientName(): string {
    const userId = this.appointmentForm.get('user_id')?.value;
    if (!userId) return 'No seleccionado';
    const client = this.clients().find(c => c.id === Number(userId));
    return client?.name || 'No seleccionado';
  }
}


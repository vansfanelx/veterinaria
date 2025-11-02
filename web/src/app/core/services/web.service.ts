import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AvailableSlot, Veterinarian, Appointment, Pet, MedicalHistory, User } from '../models/models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  private apiUrl = `${environment.apiUrl}/web`;

  constructor(private http: HttpClient) {}

  /**
   * Obtener fechas y horarios disponibles
   */
  getAvailableSlots(date?: string, veterinarianId?: number): Observable<AvailableSlot[]> {
    let params = new HttpParams();
    if (date) {
      params = params.set('date', date);
    }
    if (veterinarianId) {
      params = params.set('veterinarian_id', veterinarianId.toString());
    }
    return this.http.get<AvailableSlot[]>(`${this.apiUrl}/available-slots`, { params });
  }

  /**
   * Obtener lista de veterinarios
   */
  getVeterinarians(): Observable<Veterinarian[]> {
    return this.http.get<Veterinarian[]>(`${this.apiUrl}/veterinarians`);
  }

  /**
   * Solicitar una cita
   */
  requestAppointment(data: {
    pet_id: number;
    veterinarian_id: number;
    date: string;
    time: string;
    reason: string;
  }): Observable<{ message: string; appointment: Appointment }> {
    return this.http.post<{ message: string; appointment: Appointment }>(`${this.apiUrl}/appointments`, data);
  }

  /**
   * Obtener mascotas del usuario
   */
  getMyPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.apiUrl}/my-pets`);
  }

  /**
   * Crear una nueva mascota
   */
  createPet(data: { name: string; species: string; breed?: string | null }): Observable<{ message: string; pet: Pet }> {
    return this.http.post<{ message: string; pet: Pet }>(`${environment.apiUrl}/pets`, data);
  }

  /**
   * Obtener historial médico de una mascota
   */
  getPetMedicalHistory(petId: number): Observable<{ pet: Pet; medical_histories: MedicalHistory[] }> {
    return this.http.get<{ pet: Pet; medical_histories: MedicalHistory[] }>(`${this.apiUrl}/pets/${petId}/medical-history`);
  }

  /**
   * Obtener citas del usuario
   */
  getMyAppointments(status?: string): Observable<Appointment[]> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<Appointment[]>(`${this.apiUrl}/my-appointments`, { params });
  }

  /**
   * Cancelar una cita
   */
  cancelAppointment(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/appointments/${id}`);
  }

  /**
   * Obtener todos los usuarios (solo admin)
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  /**
   * Crear un usuario (solo admin)
   */
  createUser(data: any): Observable<{ message: string; user: User }> {
    return this.http.post<{ message: string; user: User }>(`${this.apiUrl}/users`, data);
  }

  /**
   * Actualizar un usuario (solo admin)
   */
  updateUser(id: number, data: any): Observable<{ message: string; user: User }> {
    return this.http.put<{ message: string; user: User }>(`${this.apiUrl}/users/${id}`, data);
  }

  /**
   * Eliminar un usuario (solo admin)
   */
  deleteUser(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/users/${id}`);
  }
}

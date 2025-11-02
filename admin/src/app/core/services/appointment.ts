import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = `${environment.apiUrl}/appointments`;

  constructor(private http: HttpClient) {}

  getAll(filters?: { date?: string; status?: string; pet_id?: number }): Observable<Appointment[]> {
    let params = new HttpParams();
    if (filters?.pet_id) {
      params = params.set('pet_id', filters.pet_id.toString());
    }
    if (filters?.date) {
      params = params.set('date', filters.date);
    }
    if (filters?.status) {
      params = params.set('status', filters.status);
    }
    return this.http.get<Appointment[]>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
  }

  create(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, appointment);
  }

  update(id: number, appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiUrl}/${id}`, appointment);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

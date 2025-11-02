import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MedicalHistory } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryService {
  private apiUrl = `${environment.apiUrl}/medical-histories`;

  constructor(private http: HttpClient) {}

  getAll(petId?: number): Observable<MedicalHistory[]> {
    let params = new HttpParams();
    if (petId) {
      params = params.set('pet_id', petId.toString());
    }
    return this.http.get<MedicalHistory[]>(this.apiUrl, { params });
  }

  getById(id: number): Observable<MedicalHistory> {
    return this.http.get<MedicalHistory>(`${this.apiUrl}/${id}`);
  }

  create(history: MedicalHistory): Observable<MedicalHistory> {
    return this.http.post<MedicalHistory>(this.apiUrl, history);
  }

  update(id: number, history: MedicalHistory): Observable<MedicalHistory> {
    return this.http.put<MedicalHistory>(`${this.apiUrl}/${id}`, history);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

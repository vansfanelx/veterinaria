import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CaptchaData {
  token: string;
  question: string;
  image: string;
  expires_in: number;
}

export interface CaptchaValidationResponse {
  valid: boolean;
  message: string;
  verification_token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {
  private apiUrl = `${environment.apiUrl}/captcha`;
  
  currentCaptcha = signal<CaptchaData | null>(null);
  verificationToken = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  /**
   * Generar un nuevo CAPTCHA
   */
  generate(): Observable<CaptchaData> {
    return this.http.get<CaptchaData>(`${this.apiUrl}/generate`).pipe(
      tap(captcha => {
        this.currentCaptcha.set(captcha);
        this.verificationToken.set(null);
      })
    );
  }

  /**
   * Validar la respuesta del CAPTCHA
   */
  validate(token: string, answer: number): Observable<CaptchaValidationResponse> {
    return this.http.post<CaptchaValidationResponse>(`${this.apiUrl}/validate`, {
      token,
      answer
    }).pipe(
      tap(response => {
        if (response.valid && response.verification_token) {
          this.verificationToken.set(response.verification_token);
        }
      })
    );
  }

  /**
   * Obtener el token de verificación actual
   */
  getVerificationToken(): string | null {
    return this.verificationToken();
  }

  /**
   * Limpiar datos del CAPTCHA
   */
  clear(): void {
    this.currentCaptcha.set(null);
    this.verificationToken.set(null);
  }
}

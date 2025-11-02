import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { User, LoginResponse, RegisterRequest } from '../models/models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();
  public isAuthenticated = signal(!!this.getToken());

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  register(data: RegisterRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/register`, data).pipe(
      tap(response => {
        this.handleAuthResponse(response);
      })
    );
  }

  login(email: string, password: string): Observable<LoginResponse> {
    // Agregar required_role para verificar que sea user (cliente)
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { 
      email, 
      password, 
      required_role: 'user' 
    }).pipe(
      tap(response => {
        this.handleAuthResponse(response);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap({
        next: () => {
          this.clearAuthData();
          this.router.navigate(['/login']);
        },
        error: () => {
          // Aunque falle el logout en el servidor, limpiamos datos locales
          this.clearAuthData();
          this.router.navigate(['/login']);
        }
      })
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(data: { token: string; email: string; password: string; password_confirmation: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, data);
  }

  resendVerificationEmail(): Observable<any> {
    return this.http.post(`${this.apiUrl}/resend-verification-email`, {});
  }

  verifyEmail(id: number, hash: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/verify-email/${id}/${hash}`);
  }

  private handleAuthResponse(response: LoginResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('currentUser', JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
    this.isAuthenticated.set(true);
  }

  private clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isAuthenticated.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private getUserFromStorage(): User | null {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isEmailVerified(): boolean {
    const user = this.getCurrentUser();
    return user ? !!user.email_verified_at : false;
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { NotificationService } from '../../core/services/notification';

/**
 * Componente de inicio de sesión
 * Permite autenticación de usuarios mediante email y contraseña
 * Utiliza Laravel Sanctum para generar tokens de acceso
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  returnUrl: string = '/pets'; // URL de retorno después del login

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    // Formulario con validaciones
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    // Obtener URL de retorno de los query params (si existe)
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/pets';
  }

  /**
   * Procesar el formulario de login
   * 1. Valida el formulario
   * 2. Envía credenciales al backend
   * 3. Guarda token y usuario en localStorage
   * 4. Redirige a la URL de retorno o /pets
   */
  onSubmit(): void {
    // Validar formulario
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      this.notificationService.warning('Por favor complete todos los campos correctamente');
      return;
    }

    this.loading = true;
    
    // Enviar petición de login
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        // Mostrar mensaje de bienvenida
        this.notificationService.success(`Bienvenido ${response.user.name}!`);
        
        // Redirigir a la URL de retorno
        this.router.navigate([this.returnUrl]);
      },
      error: (err) => {
        this.loading = false;
        
        // Manejar diferentes tipos de errores
        const message = err.error?.message || err.error?.email?.[0] || 'Error al iniciar sesión';
        this.notificationService.error(message);
      },
    });
  }

  /**
   * Marca todos los campos del formulario como 'touched'
   * Esto hace que se muestren los mensajes de error de validación
   */
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
}

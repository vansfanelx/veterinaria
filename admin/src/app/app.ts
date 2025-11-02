import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './shared/components/notification/notification';
import { AuthService } from './core/services/auth';
import { NotificationService } from './core/services/notification';

/**
 * Componente raíz de la aplicación
 * 
 * Responsabilidades:
 * - Renderizar el header con navegación principal
 * - Mostrar información del usuario autenticado
 * - Manejar cierre de sesión
 * - Contener el router-outlet para las rutas
 * - Mostrar notificaciones globales
 */

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule, NotificationComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('System-Vet');
  protected readonly menuOpen = signal(false);
  currentUser$;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    // Inicializar currentUser$ en el constructor para evitar error TS2729
    this.currentUser$ = this.authService.currentUser$;
  }

  /**
   * Cerrar el menú móvil cuando se navega
   */
  closeMenu(): void {
    this.menuOpen.set(false);
  }

  /**
   * Cerrar sesión del usuario actual
   * 
   * Proceso:
   * 1. Llamar al endpoint de logout en el backend
   * 2. Eliminar token y datos de usuario de localStorage
   * 3. Actualizar estado de autenticación
   * 4. Redirigir a /login
   * 5. Mostrar notificación de confirmación
   */
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.notificationService.success('Sesión cerrada exitosamente');
        this.router.navigate(['/login']);
      },
      error: () => {
        // Forzar logout local si falla el servidor
        // Esto asegura que el usuario siempre pueda cerrar sesión
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
      }
    });
  }
}

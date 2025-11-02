import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Interfaz para las notificaciones
 */
export interface Notification {
  id: string;                              // ID único de la notificación
  type: 'success' | 'error' | 'warning' | 'info'; // Tipo de notificación
  message: string;                         // Mensaje a mostrar
  duration?: number;                       // Tiempo en ms antes de auto-cerrar
}

/**
 * Servicio de notificaciones toast
 * Maneja notificaciones visuales tipo "toast" en la aplicación
 * 
 * Características:
 * - Auto-cierre configurable (default 5 segundos)
 * - 4 tipos: success, error, warning, info
 * - Stack de notificaciones (múltiples simultáneas)
 * - Animaciones CSS
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // BehaviorSubject para mantener el array de notificaciones activas
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$: Observable<Notification[]> = this.notificationsSubject.asObservable();

  /**
   * Método genérico para mostrar notificaciones
   * @param type - Tipo de notificación (success, error, warning, info)
   * @param message - Mensaje a mostrar
   * @param duration - Tiempo en ms antes de auto-cerrar (0 = no cerrar)
   */
  show(type: 'success' | 'error' | 'warning' | 'info', message: string, duration: number = 5000): void {
    const notification: Notification = {
      id: this.generateId(),
      type,
      message,
      duration,
    };

    // Agregar notificación al array actual
    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentNotifications, notification]);

    // Auto-cerrar después del tiempo especificado
    if (duration > 0) {
      setTimeout(() => {
        this.remove(notification.id);
      }, duration);
    }
  }

  /** Mostrar notificación de éxito (verde) */
  success(message: string, duration?: number): void {
    this.show('success', message, duration);
  }

  /** Mostrar notificación de error (rojo) */
  error(message: string, duration?: number): void {
    this.show('error', message, duration);
  }

  /** Mostrar notificación de advertencia (amarillo) */
  warning(message: string, duration?: number): void {
    this.show('warning', message, duration);
  }

  /** Mostrar notificación informativa (azul) */
  info(message: string, duration?: number): void {
    this.show('info', message, duration);
  }

  /**
   * Remover notificación por ID
   * @param id - ID de la notificación a remover
   */
  remove(id: string): void {
    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next(
      currentNotifications.filter((n) => n.id !== id)
    );
  }

  /**
   * Generar ID único para cada notificación
   * Combina timestamp + string aleatoria
   */
  private generateId(): string {
    return `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

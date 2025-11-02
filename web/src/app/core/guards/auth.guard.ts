import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

/**
 * Guard que protege rutas que requieren autenticación
 * Solo permite acceso a usuarios con rol 'user'
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  if (!authService.isAuthenticated()) {
    notificationService.warning('Debes iniciar sesión para acceder a esta sección');
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  // Verificar que el usuario tenga rol 'user' (cliente)
  const currentUser = authService.getCurrentUser();
  if (currentUser && currentUser.role === 'user') {
    return true;
  }

  // Si es admin o veterinarian, no permitir acceso
  notificationService.error('Esta sección es exclusiva para clientes');
  authService.logout().subscribe(() => {
    router.navigate(['/login']);
  });
  return false;
};

/**
 * Guard que previene acceso a login/register si ya está autenticado
 */
export const loginGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/']);
  return false;
};

/**
 * Guard que requiere email verificado
 */
export const emailVerifiedGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  if (authService.isEmailVerified()) {
    return true;
  }

  notificationService.warning('Debes verificar tu correo electrónico para acceder a esta sección');
  router.navigate(['/verify-email']);
  return false;
};

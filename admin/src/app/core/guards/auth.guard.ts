import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth';

/**
 * Guard para proteger rutas que requieren autenticación
 * Si el usuario no está autenticado, redirige a /login
 * Guarda la URL de retorno para redirigir después del login
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar si el usuario está autenticado
  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirigir a login con URL de retorno
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};

/**
 * Guard para rutas que requieren rol de administrador o veterinario
 * Verifica autenticación y rol admin o veterinarian
 * Previene que usuarios regulares accedan al panel de administración
 */
export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated() && (authService.isAdmin() || authService.isVeterinarian())) {
    return true;
  }

  // Si está autenticado pero no tiene el rol correcto
  if (authService.isAuthenticated()) {
    router.navigate(['/']);
    return false;
  }

  // Si no está autenticado, redirigir a login
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};

/**
 * Guard para la página de login
 * Si el usuario ya está autenticado, redirige a la página principal
 * Previene que usuarios autenticados vean el formulario de login
 */
export const loginGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si ya está autenticado, redirigir a pets
  if (authService.isAuthenticated()) {
    router.navigate(['/pets']);
    return false;
  }

  return true;
};

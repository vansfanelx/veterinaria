import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Interceptor HTTP para autenticación
 * Agrega automáticamente el token Bearer a todas las peticiones HTTP
 * 
 * Funcionamiento:
 * 1. Intercepta todas las peticiones HTTP salientes
 * 2. Obtiene el token de localStorage
 * 3. Si existe token, clona la petición agregando header Authorization
 * 4. El backend (Laravel Sanctum) valida el token en cada petición
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Obtener token del almacenamiento local
  const token = localStorage.getItem('token');

  // Si existe token, agregarlo a los headers
  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloned);
  }

  // Si no hay token, continuar con la petición original
  return next(req);
};

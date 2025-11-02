# Sistema de Roles y Permisos - VetiVet

## 📋 Descripción General

El sistema VetiVet implementa control de acceso basado en roles (RBAC) con tres niveles de permisos diferentes.

---

## 👥 Roles Disponibles

### 1. **Admin** (Administrador)
- **Descripción**: Acceso total al sistema administrativo
- **Panel**: http://localhost:55286 (Admin)
- **Permisos**:
  - ✅ Gestión completa de usuarios (crear, editar, eliminar)
  - ✅ Gestión de mascotas
  - ✅ Gestión de citas
  - ✅ Gestión de historiales médicos
  - ✅ Acceso a todas las rutas del API
  - ❌ NO puede acceder al frontend web de clientes

### 2. **Veterinarian** (Veterinario)
- **Descripción**: Acceso al panel administrativo sin gestión de usuarios
- **Panel**: http://localhost:55286 (Admin)
- **Permisos**:
  - ✅ Gestión de mascotas
  - ✅ Gestión de citas
  - ✅ Gestión de historiales médicos
  - ❌ NO puede gestionar usuarios
  - ❌ NO puede acceder al frontend web de clientes

### 3. **User** (Cliente)
- **Descripción**: Cliente del sistema, solo acceso al frontend web
- **Panel**: http://localhost:8003 (Web)
- **Permisos**:
  - ✅ Gestión de sus propias mascotas
  - ✅ Solicitar citas para sus mascotas
  - ✅ Ver historial médico de sus mascotas
  - ✅ Editar su perfil
  - ❌ NO puede acceder al panel de administración
  - ❌ NO puede ver datos de otros usuarios

---

## 🔐 Credenciales de Prueba

### Administrador Principal
```
Email: admin@vetivet.com
Contraseña: Admin123
Panel: http://localhost:55286
```

### Veterinarios (4 disponibles)
```
Email: carlos.mendoza@vetivet.com
Email: ana.martinez@vetivet.com
Email: luis.ramirez@vetivet.com
Email: maria.garcia@vetivet.com
Contraseña: Vet123
Panel: http://localhost:55286
```

### Clientes (3 disponibles)
```
Email: juan.perez@example.com
Email: maria.gonzalez@example.com
Email: pedro.sanchez@example.com
Contraseña: User123
Panel: http://localhost:8003
```

---

## 🛡️ Implementación Técnica

### Backend (Laravel)

#### Middleware: `CheckRole`
```php
// api/app/Http/Middleware/CheckRole.php
Route::middleware('role:admin')->group(...);
Route::middleware('role:admin,veterinarian')->group(...);
Route::middleware('role:user')->group(...);
```

#### Validación en Login
```php
// api/app/Http/Controllers/API/AuthController.php
// Valida que el usuario tenga el rol requerido
if ($request->required_role === 'admin') {
    // Permite admin y veterinarian
} else if ($request->required_role === 'user') {
    // Solo permite user
}
```

### Frontend (Angular)

#### Guards de Autenticación
```typescript
// admin/src/app/core/guards/auth.guard.ts
// Permite solo admin y veterinarian
adminGuard: isAdmin() || isVeterinarian()

// web/src/app/core/guards/auth.guard.ts
// Permite solo user
userGuard: role === 'user'
```

#### Servicios de Autenticación
```typescript
// admin/src/app/core/services/auth.ts
login(credentials + required_role: 'admin')

// web/src/app/core/services/auth.service.ts
login(credentials + required_role: 'user')
```

---

## 🔄 Protección de Rutas

### API Routes (`api/routes/api.php`)

```php
// Rutas públicas
POST /api/register
POST /api/login

// Rutas de clientes (role:user)
Route::middleware('role:user')->group(function () {
    GET  /api/web/pets
    POST /api/web/pets
    GET  /api/web/appointments
    POST /api/web/appointments
});

// Rutas de veterinarios y admin (role:admin,veterinarian)
Route::middleware('role:admin,veterinarian')->group(function () {
    GET    /api/pets
    POST   /api/pets
    PUT    /api/pets/{id}
    DELETE /api/pets/{id}
    
    GET    /api/appointments
    POST   /api/appointments
    PUT    /api/appointments/{id}
    DELETE /api/appointments/{id}
    
    GET    /api/medical-histories
    POST   /api/medical-histories
    PUT    /api/medical-histories/{id}
    DELETE /api/medical-histories/{id}
});

// Rutas solo admin (role:admin)
Route::middleware('role:admin')->group(function () {
    GET    /api/users
    POST   /api/users
    PUT    /api/users/{id}
    DELETE /api/users/{id}
});
```

### Angular Routes

#### Admin Panel
```typescript
// admin/src/app/app.routes.ts
{
  path: '',
  canActivate: [adminGuard], // Solo admin y veterinarian
  children: [...]
}
```

#### Web Frontend
```typescript
// web/src/app/app.routes.ts
{
  path: '',
  canActivate: [authGuard], // Solo user
  children: [...]
}
```

---

## 🚀 Comandos Útiles

### Resetear base de datos con seeders
```bash
cd api
php artisan migrate:fresh --seed
```

### Solo ejecutar seeders
```bash
cd api
php artisan db:seed
```

### Crear un nuevo usuario admin manualmente
```bash
cd api
php artisan tinker

# En tinker:
\App\Models\User::create([
    'name' => 'Nuevo Admin',
    'email' => 'nuevo@admin.com',
    'password' => bcrypt('password'),
    'role' => 'admin',
    'email_verified_at' => now()
]);
```

---

## ⚠️ Consideraciones Importantes

1. **Seeders siempre antes de producción**: 
   - Nunca aplicar migraciones directas sin seeders
   - Usar `migrate:fresh --seed` en desarrollo
   - Usar `migrate --seed` en producción si hay datos

2. **Email verificado**:
   - Los usuarios creados por seeder tienen `email_verified_at` establecido
   - Usuarios registrados manualmente deben verificar email

3. **Seguridad de contraseñas**:
   - En producción cambiar todas las contraseñas de prueba
   - Admin: Admin123 → Cambiar
   - Veterinarios: Vet123 → Cambiar
   - Clientes: User123 → Cambiar

4. **Middleware personalizado**:
   - El middleware `CheckRole` está registrado en `bootstrap/app.php`
   - Acepta múltiples roles: `role:admin,veterinarian,user`

5. **Prevención de acceso cruzado**:
   - Si un admin intenta acceder al web frontend, se cierra sesión automáticamente
   - Si un user intenta acceder al admin panel, se redirige al login

---

## 📝 Logs y Debugging

Para verificar qué rol tiene un usuario autenticado:

### Backend
```php
Log::info('User role:', ['role' => $request->user()->role]);
```

### Frontend
```typescript
console.log('Current user role:', this.authService.currentUser()?.role);
console.log('Is Admin:', this.authService.isAdmin());
console.log('Is Veterinarian:', this.authService.isVeterinarian());
console.log('Is User:', this.authService.currentUser()?.role === 'user');
```

---

## 🎯 Flujo de Autenticación

```
1. Usuario ingresa credenciales + required_role
   ↓
2. Backend valida credenciales
   ↓
3. Backend verifica rol del usuario vs required_role
   ↓
4. Si coincide: genera token Sanctum
   ↓
5. Frontend guarda token + userData
   ↓
6. Guard verifica rol en cada navegación
   ↓
7. Si rol no coincide: logout o redirect
```

---

## 📞 Contacto y Soporte

Para más información o problemas con el sistema de roles:
- Revisar logs: `api/storage/logs/laravel.log`
- Verificar middleware: `api/app/Http/Middleware/CheckRole.php`
- Verificar rutas: `api/routes/api.php`

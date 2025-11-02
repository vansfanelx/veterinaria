# Sistema de Gestión Veterinaria VetiVet 🐾

Sistema completo de gestión para clínica veterinaria con arquitectura moderna de tres capas:
- **API Backend** (Laravel 12 + MySQL)
- **Panel Administrativo** (Angular 20 - Gestión Interna)
- **Portal Web para Clientes** (Angular 20 - Autogestión)

## 📚 Documentación Adicional

- **[Roles y Permisos](ROLES_Y_PERMISOS.md)** - Guía completa del sistema de control de acceso basado en roles

## 🌟 Características Principales

### 🔐 Sistema de Autenticación y Roles
- Sistema completo de roles (Admin, Veterinario, Cliente)
- Control de acceso basado en roles (RBAC)
- Login con validación de rol requerido
- Registro de usuarios con verificación de email
- Recuperación de contraseña
- Guards de autenticación en backend y frontend
- CAPTCHA personalizado para registro
- **Ver detalles en [ROLES_Y_PERMISOS.md](ROLES_Y_PERMISOS.md)**

### 💼 Backend API (Laravel 12)

#### Autenticación y Seguridad
- ✅ Sistema de autenticación con Laravel Sanctum
- ✅ Verificación de email con notificaciones personalizadas
- ✅ Recuperación de contraseña
- ✅ CAPTCHA propio para prevenir bots
- ✅ Middleware de autenticación y verificación de email
- ✅ Gestión de roles (admin, veterinarian, user)

#### Gestión de Datos
- ✅ CRUD completo de usuarios con roles
- ✅ Gestión de mascotas con propietarios
- ✅ Sistema de citas con veterinarios asignados
- ✅ Historial médico detallado
- ✅ Calendario de disponibilidad
- ✅ Filtros por estado, fecha y usuario

#### Características Técnicas
- ✅ API RESTful con relaciones Eloquent
- ✅ Validaciones exhaustivas de datos
- ✅ CORS configurado para desarrollo
- ✅ Base de datos MySQL
- ✅ Migraciones y seeders
- ✅ Emails HTML personalizados

### 🎨 Panel Administrativo (Angular 18)

#### Gestión de Usuarios
- ✅ CRUD completo de usuarios
- ✅ Búsqueda por nombre, email, teléfono
- ✅ Filtrado por rol
- ✅ Gestión de permisos
- ✅ Cambio de contraseñas
- ✅ Activación/desactivación de cuentas

#### Gestión de Mascotas
- ✅ Registro completo con foto
- ✅ Historial médico integrado
- ✅ Búsqueda y filtros avanzados
- ✅ Vista de detalles completa
- ✅ Edición y eliminación

#### Gestión de Citas
- ✅ Calendario mensual interactivo
- ✅ Asignación de veterinarios
- ✅ Control de estados (pendiente, confirmada, completada, cancelada)
- ✅ Filtros por fecha y estado
- ✅ Vista de disponibilidad

#### Historial Médico
- ✅ Registro de consultas
- ✅ Diagnósticos y tratamientos
- ✅ Prescripciones médicas
- ✅ Notas del veterinario
- ✅ Historial completo por mascota

#### Características Técnicas
- ✅ Componentes standalone
- ✅ Signals API para estado reactivo
- ✅ Reactive Forms con validaciones
- ✅ Interceptores HTTP
- ✅ Guards de autenticación
- ✅ Diseño responsive

### 🌐 Portal Web para Clientes (Angular 18)

#### Funcionalidades de Usuario
- ✅ Registro y login de clientes
- ✅ Verificación de email
- ✅ Recuperación de contraseña
- ✅ Perfil editable
- ✅ Cambio de contraseña

#### Gestión de Mascotas
- ✅ Registro de mascotas propias
- ✅ Vista de mascotas registradas
- ✅ Historial médico de sus mascotas
- ✅ Actualización de datos

#### Sistema de Citas
- ✅ Calendario interactivo para agendar
- ✅ Selección de fecha y hora disponible
- ✅ Selección de veterinario
- ✅ Selección o registro de mascota
- ✅ Motivo de consulta
- ✅ Observaciones adicionales

#### Mis Citas
- ✅ Vista de todas las citas
- ✅ Filtro por estado (Todas, Próximas, Pasadas)
- ✅ Detalles de cada cita
- ✅ Cancelación de citas (con restricciones)
- ✅ Estados visuales por color

#### Características de UI/UX
- ✅ Diseño moderno con gradientes
- ✅ Navegación intuitiva
- ✅ Notificaciones toast
- ✅ Modales de confirmación
- ✅ Loader states
- ✅ Responsive design
- ✅ Animaciones suaves

## 🛠️ Stack Tecnológico

### Backend
- **Framework**: Laravel 12
- **PHP**: 8.3+
- **Base de Datos**: MySQL
- **Autenticación**: Laravel Sanctum
- **Email**: Laravel Mail con templates personalizados
- **Validación**: Form Requests

### Frontend (Admin & Web)
- **Framework**: Angular 18
- **Lenguaje**: TypeScript 5.x
- **Estado**: Signals API
- **Formularios**: Reactive Forms
- **HTTP**: HttpClient con RxJS
- **Routing**: Angular Router
- **Estilos**: SCSS con variables CSS
- **Arquitectura**: Standalone Components

## 📁 Estructura del Proyecto

```
systema-veterinaria/
├── api/                              # Backend Laravel
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/API/
│   │   │   │   ├── AuthController.php       # Autenticación
│   │   │   │   ├── WebController.php        # Endpoints web
│   │   │   │   ├── PetController.php        # Mascotas
│   │   │   │   ├── AppointmentController.php # Citas
│   │   │   │   ├── MedicalHistoryController.php
│   │   │   │   ├── UserController.php       # Usuarios
│   │   │   │   └── CaptchaController.php    # CAPTCHA
│   │   ├── Models/
│   │   │   ├── User.php
│   │   │   ├── Pet.php
│   │   │   ├── Appointment.php
│   │   │   └── MedicalHistory.php
│   │   └── Notifications/
│   │       └── VerifyEmailNotification.php  # Email verificación
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   │       └── VeterinarianSeeder.php
│   ├── routes/
│   │   └── api.php                  # Rutas API
│   └── resources/
│       └── views/vendor/mail/       # Templates email
│
├── admin/                            # Panel Admin Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/
│   │   │   │   ├── guards/         # Auth & Login guards
│   │   │   │   ├── interceptors/   # HTTP interceptor
│   │   │   │   ├── models/         # Interfaces TypeScript
│   │   │   │   └── services/       # Servicios HTTP
│   │   │   ├── features/
│   │   │   │   ├── pets/
│   │   │   │   ├── appointments/
│   │   │   │   └── medical-histories/
│   │   │   └── shared/
│   │   │       └── components/
│   │   └── styles.scss
│
└── web/                              # Portal Web Angular
    ├── src/
    │   ├── app/
    │   │   ├── core/
    │   │   │   ├── guards/
    │   │   │   ├── interceptors/
    │   │   │   ├── models/
    │   │   │   └── services/
    │   │   │       ├── auth.service.ts
    │   │   │       ├── web.service.ts
    │   │   │       └── notification.service.ts
    │   │   ├── pages/
    │   │   │   ├── home/
    │   │   │   ├── login/
    │   │   │   ├── register/
    │   │   │   ├── verify-email/
    │   │   │   ├── forgot-password/
    │   │   │   ├── reset-password/
    │   │   │   ├── appointments/      # Agendar citas
    │   │   │   ├── my-appointments/   # Mis citas
    │   │   │   ├── my-pets/           # Mis mascotas
    │   │   │   ├── users/             # Gestión usuarios (admin)
    │   │   │   └── profile/           # Perfil usuario
    │   │   └── shared/
    │   │       └── components/
    │   │           ├── header/
    │   │           └── footer/
    │   └── styles.scss
```

## 🚀 Instalación y Ejecución

### Requisitos Previos
- PHP 8.3 o superior
- Composer
- MySQL 8.0+
- Node.js 18+ y npm
- Git

### 1. Clonar Repositorio
```bash
git clone <repository-url>
cd systema-veterinaria
```

### 2. Backend API (Laravel)

```bash
cd api

# Instalar dependencias
composer install

# Configurar archivo .env
cp .env.example .env
# Editar .env con credenciales de base de datos MySQL

# Generar key de aplicación
php artisan key:generate

# Ejecutar migraciones
php artisan migrate

# Ejecutar seeders (crear veterinarios)
php artisan db:seed --class=VeterinarianSeeder

# Iniciar servidor de desarrollo
php artisan serve
# Servidor: http://localhost:8000
```

### 3. Panel Administrativo (Angular)

```bash
cd admin

# Instalar dependencias
npm install

# Desarrollo
ng serve
# Aplicación: http://localhost:4200

# Producción
ng build --configuration production
# Archivos generados en: admin/dist/
```

### 4. Portal Web (Angular)

```bash
cd web

# Instalar dependencias
npm install

# Desarrollo
ng serve
# Aplicación: http://localhost:4200

# Producción
ng build --configuration production
# Archivos generados en: web/dist/
```

## 🌐 Configuración de Entornos

### Variables de Entorno

**Desarrollo (`environment.ts`):**
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api'
};
```

**Producción (`environment.prod.ts`):**
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.vetivet.com/api'
};
```

### Builds de Producción

**Panel Admin:**
```bash
cd admin
ng build --configuration production
```

**Portal Web:**
```bash
cd web
ng build --configuration production
```

Los archivos compilados estarán en las carpetas:
- `admin/dist/admin-app/browser/`
- `web/dist/web-app/browser/`

### Despliegue en Producción

1. **Configurar URL de API en producción:**
   - Editar `environment.prod.ts` en ambos proyectos
   - Establecer `apiUrl` con la URL real del servidor API

2. **Compilar aplicaciones:**
   ```bash
   # Admin
   cd admin
   ng build --configuration production
   
   # Web
   cd web
   ng build --configuration production
   ```

3. **Subir archivos al servidor:**
   - Copiar contenido de `dist/*/browser/` al servidor web
   - Configurar servidor para servir `index.html` en todas las rutas (SPA)

4. **Configurar Laravel API:**
   ```bash
   # En servidor de producción
   cd api
   composer install --optimize-autoloader --no-dev
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

5. **Variables de entorno Laravel (.env):**
   ```env
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://api.vetivet.com
   
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=vetivet_db
   DB_USERNAME=tu_usuario
   DB_PASSWORD=tu_password
   
   MAIL_MAILER=smtp
   MAIL_HOST=smtp.gmail.com
   MAIL_PORT=587
   MAIL_USERNAME=tu_email@gmail.com
   MAIL_PASSWORD=tu_password_app
   MAIL_ENCRYPTION=tls
   MAIL_FROM_ADDRESS=noreply@vetivet.com
   MAIL_FROM_NAME=VetiVet
   ```

## 📡 API Endpoints

### Autenticación Pública
```
POST   /api/register              - Registrar usuario
POST   /api/login                 - Iniciar sesión
POST   /api/logout                - Cerrar sesión
POST   /api/forgot-password       - Solicitar reset password
POST   /api/reset-password        - Resetear password
GET    /api/verify-email/{id}/{hash} - Verificar email
POST   /api/resend-verification-email - Reenviar verificación
GET    /api/captcha/generate      - Generar CAPTCHA
POST   /api/captcha/validate      - Validar CAPTCHA
```

### Endpoints Web (Públicos y Autenticados)
```
GET    /api/web/veterinarians     - Listar veterinarios
GET    /api/web/available-slots   - Horarios disponibles
GET    /api/web/my-pets           - Mis mascotas (auth)
POST   /api/web/appointments      - Crear cita (auth)
GET    /api/web/my-appointments   - Mis citas (auth)
DELETE /api/web/appointments/{id} - Cancelar cita (auth)
GET    /api/web/pets/{id}/medical-history - Historial mascota (auth)
```

### CRUD Usuarios (Admin)
```
GET    /api/users                 - Listar usuarios
POST   /api/users                 - Crear usuario
GET    /api/users/{id}            - Ver usuario
PUT    /api/users/{id}            - Actualizar usuario
DELETE /api/users/{id}            - Eliminar usuario
PUT    /api/users/{id}/password   - Cambiar contraseña
```

### CRUD Mascotas
```
GET    /api/pets                  - Listar mascotas
POST   /api/pets                  - Crear mascota
GET    /api/pets/{id}             - Ver mascota
PUT    /api/pets/{id}             - Actualizar mascota
DELETE /api/pets/{id}             - Eliminar mascota
```

### CRUD Citas
```
GET    /api/appointments          - Listar citas
POST   /api/appointments          - Crear cita
GET    /api/appointments/{id}     - Ver cita
PUT    /api/appointments/{id}     - Actualizar cita
DELETE /api/appointments/{id}     - Eliminar cita
```

### CRUD Historial Médico
```
GET    /api/medical-histories     - Listar historiales
POST   /api/medical-histories     - Crear historial
GET    /api/medical-histories/{id} - Ver historial
PUT    /api/medical-histories/{id} - Actualizar historial
DELETE /api/medical-histories/{id} - Eliminar historial
```

## 🎯 Flujo de Usuario

### Cliente (Portal Web)

1. **Registro**
   - Completar formulario con CAPTCHA
   - Recibir email de verificación
   - Verificar email haciendo clic en enlace

2. **Login**
   - Ingresar email y contraseña
   - Token JWT almacenado en localStorage

3. **Gestión de Mascotas**
   - Registrar mascotas propias
   - Ver historial médico

4. **Agendar Cita**
   - Seleccionar fecha en calendario
   - Elegir horario disponible
   - Seleccionar veterinario
   - Elegir o registrar mascota
   - Describir motivo
   - Confirmar cita

5. **Mis Citas**
   - Ver todas las citas
   - Filtrar por estado
   - Cancelar citas futuras

### Administrador (Panel Admin)

1. **Gestión de Usuarios**
   - Ver todos los usuarios
   - Crear/editar/eliminar
   - Asignar roles
   - Cambiar contraseñas

2. **Gestión Completa**
   - Mascotas, citas, historiales
   - Reportes y estadísticas
   - Control total del sistema

## 🏗️ Arquitectura y Patrones

### Backend (Laravel)
- **MVC Pattern**: Separación clara de responsabilidades
- **Repository Pattern**: Abstracción de acceso a datos
- **Service Layer**: Lógica de negocio en servicios
- **Eloquent ORM**: Relaciones entre modelos
- **Form Requests**: Validación centralizada
- **API Resources**: Transformación de datos
- **Notifications**: Sistema de emails personalizado

### Frontend (Angular)
- **Standalone Components**: Arquitectura moderna
- **Signals API**: Estado reactivo
- **Services Pattern**: Comunicación con API
- **Guards**: Protección de rutas
- **Interceptors**: Manejo global de HTTP
- **Reactive Forms**: Validación robusta
- **Lazy Loading**: Carga diferida de módulos
- **SCSS Modular**: Estilos componetizados

### Principios SOLID
- ✅ **Single Responsibility**: Cada clase/componente tiene una responsabilidad
- ✅ **Open/Closed**: Abierto a extensión, cerrado a modificación
- ✅ **Liskov Substitution**: Subtipos sustituibles
- ✅ **Interface Segregation**: Interfaces específicas
- ✅ **Dependency Inversion**: Dependencia de abstracciones

## 🎨 Diseño y UX

### Sistema de Colores
```scss
--primary-purple: #7C3AED;
--secondary-purple: #A78BFA;
--success: #10B981;
--warning: #F59E0B;
--error: #EF4444;
--info: #3B82F6;
```

### Componentes Reutilizables
- Botones con estados
- Inputs con validación visual
- Modales de confirmación
- Toasts de notificación
- Loaders y spinners
- Tarjetas informativas

## 🔒 Seguridad

- ✅ Autenticación con tokens JWT (Sanctum)
- ✅ Validación de email obligatoria
- ✅ CAPTCHA en registro
- ✅ Hashing de contraseñas (bcrypt)
- ✅ CORS configurado
- ✅ Sanitización de inputs
- ✅ Guards de autorización
- ✅ Middleware de verificación

## 📧 Sistema de Emails

### Templates Personalizados
- Email de verificación con diseño VetiVet
- Email de recuperación de contraseña
- Notificaciones de citas
- Recordatorios automáticos

### Configuración
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_FROM_ADDRESS=noreply@vetivet.com
MAIL_FROM_NAME=VetiVet
```

## 🐛 Troubleshooting

### Error CORS
```bash
# Verificar config/cors.php en Laravel
# Permitir origins: ['*'] para desarrollo
```

### Error de Base de Datos
```bash
cd api
php artisan migrate:fresh --seed
```

### Error Token Expirado
```bash
# Limpiar localStorage en navegador
# Hacer logout y login nuevamente
```

### Error Node Modules
```bash
cd web  # o cd admin
rm -rf node_modules package-lock.json
npm install
```

## 📚 Documentación

- [Laravel 12 Docs](https://laravel.com/docs/12.x)
- [Angular 18 Docs](https://angular.dev)
- [Laravel Sanctum](https://laravel.com/docs/12.x/sanctum)
- [Angular Signals](https://angular.dev/guide/signals)
- [RxJS](https://rxjs.dev/)

## 👥 Credenciales de Prueba

### Veterinarios (Creados por seeder)
```
Email: juan.perez@vetivet.com
Email: maria.garcia@vetivet.com
Email: carlos.lopez@vetivet.com
Email: ana.martinez@vetivet.com
Password: password
```

## 🚀 Funcionalidades Destacadas

1. **Sistema de Citas Inteligente**
   - Calendario dinámico con disponibilidad
   - Validación de horarios ocupados
   - Asignación automática de slots

2. **Gestión de Mascotas**
   - Registro completo con propietario
   - Historial médico detallado
   - Relaciones entre modelos

3. **Portal de Autogestión**
   - Clientes gestionan sus propias citas
   - Consulta de historial médico
   - Notificaciones por email

4. **Panel Administrativo**
   - Control total del sistema
   - Gestión de usuarios y roles
   - Reportes y estadísticas

## 📝 Notas de Desarrollo

### TypeScript
- Tipado estricto habilitado
- Interfaces para todos los modelos
- IntelliSense completo

### Formularios Reactivos
- Validaciones síncronas y asíncronas
- Mensajes de error personalizados
- Estados visuales (touched, dirty, valid)

### HTTP Interceptors
- Inyección automática de tokens
- Manejo global de errores
- Logging de peticiones

## 👨‍💻 Autor

**Jonathan Jimenez Rojas**

## 📄 Licencia

Este proyecto es de código abierto y está disponible para fines educativos.

---

**VetiVet** - Sistema completo de gestión veterinaria con arquitectura moderna y mejores prácticas de desarrollo. ✨

## 📋 Características

### Backend API (Laravel)
- ✅ Gestión de mascotas (CRUD completo)
- ✅ Sistema de citas con estados (pendiente, confirmada, completada, cancelada)
- ✅ Historial médico de mascotas
- ✅ API RESTful con relaciones
- ✅ CORS configurado para desarrollo
- ✅ Validaciones de datos
- ✅ Base de datos SQLite

### Panel Administrativo (Angular)
- ✅ Módulo de gestión de mascotas
  - Listado con búsqueda y filtros
  - Formulario de registro/edición con validaciones ReactiveFor ms
  - Vista de detalles completa
- ✅ Módulo de citas
  - Listado con filtros por fecha y estado
  - Formulario de agendamiento
  - Vista de calendario
- ✅ Módulo de historial médico
  - Registro de consultas
  - Diagnósticos y tratamientos
  - Prescripciones médicas
- ✅ Navegación intuitiva con menú principal
- ✅ Diseño responsive con estilos modernos
- ✅ Componentes standalone (Angular 20)
- ✅ TypeScript con tipado fuerte

### Portal Web para Clientes (Angular)
- ✅ Consulta de citas disponibles
- ✅ Agendamiento de citas en calendario
- ✅ Visualización del historial médico de sus mascotas
- ✅ Interfaz amigable y responsive

## 🛠️ Tecnologías Utilizadas

- **Backend**: Laravel 12 (PHP 8.3+)
- **Frontend Admin**: Angular 20 con TypeScript
- **Frontend Web**: Angular 20 con TypeScript
- **Base de Datos**: Mysql
- **Estilos**: SCSS con diseño responsive
- **Arquitectura**: Modular con separación de responsabilidades

## 📁 Estructura del Proyecto

```
examen-preparcial/
├── api/                          # Backend Laravel
│   ├── app/
│   │   ├── Http/Controllers/API/ # Controladores REST
│   │   └── Models/               # Modelos Eloquent
│   ├── database/
│   │   └── migrations/           # Migraciones de BD
│   ├── routes/
│   │   └── web.php              # Rutas API
│   └── config/
│       └── cors.php             # Configuración CORS
│
├── admin/                        # Frontend Admin Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/            # Servicios y modelos
│   │   │   │   ├── models/      # Interfaces TypeScript
│   │   │   │   └── services/    # Servicios HTTP
│   │   │   ├── features/        # Módulos funcionales
│   │   │   │   ├── pets/        # Gestión de mascotas
│   │   │   │   ├── appointments/# Gestión de citas
│   │   │   │   └── medical-histories/ # Historial médico
│   │   │   └── shared/          # Componentes compartidos
│   │   └── styles.scss          # Estilos globales
│
└── web/                          # Frontend Web Angular
    └── src/
        └── app/
            ├── features/
            │   ├── appointments/ # Calendario de citas
            │   └── history/     # Historial médico
            └── shared/          # Componentes compartidos
```

## 🚀 Instalación y Ejecución

### Requisitos Previos

- PHP 8.3 o superior
- Composer
- Node.js 18+ y npm
- Git

### 1. Backend API (Laravel)

```bash
# Navegar a la carpeta api
cd api

# Instalar dependencias (ya instaladas)
composer install

# Configurar base de datos (SQLite ya configurado)
# Las migraciones ya están ejecutadas

# Iniciar servidor de desarrollo
php artisan serve
# El servidor correrá en http://localhost:8000
```

**Endpoints API disponibles:**
- `GET    /api/pets` - Listar mascotas
- `POST   /api/pets` - Crear mascota
- `GET    /api/pets/{id}` - Ver detalles de mascota
- `PUT    /api/pets/{id}` - Actualizar mascota
- `DELETE /api/pets/{id}` - Eliminar mascota

- `GET    /api/appointments` - Listar citas
- `POST   /api/appointments` - Crear cita
- `GET    /api/appointments/{id}` - Ver detalles de cita
- `PUT    /api/appointments/{id}` - Actualizar cita
- `DELETE /api/appointments/{id}` - Eliminar cita

- `GET    /api/medical-histories` - Listar historiales
- `POST   /api/medical-histories` - Crear historial
- `GET    /api/medical-histories/{id}` - Ver detalles
- `PUT    /api/medical-histories/{id}` - Actualizar historial
- `DELETE /api/medical-histories/{id}` - Eliminar historial

### 2. Panel Administrativo (Angular)

```bash
# Navegar a la carpeta admin
cd admin

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
ng serve
# O también: npm start

# La aplicación correrá en http://localhost:4200
```

### 3. Portal Web (Angular)

```bash
# Navegar a la carpeta web
cd web

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
ng serve --port 4201
# La aplicación correrá en http://localhost:4201
```

## 🎯 Uso del Sistema

### Panel Administrativo

1. **Gestión de Mascotas**
   - Acceder a "Mascotas" en el menú principal
   - Click en "Nueva Mascota" para registrar
   - Completar formulario con datos del animal y dueño
   - Ver detalles, editar o eliminar mascotas existentes

2. **Gestión de Citas**
   - Acceder a "Citas" para ver listado
   - "Nueva Cita" para agendar
   - Filtrar por fecha o estado
   - Ver "Calendario" para vista mensual

3. **Historial Médico**
   - Acceder a "Historial Médico"
   - Registrar consultas, diagnósticos y tratamientos
   - Ver historial completo por mascota

### Portal Web (Clientes)

1. **Agendar Citas**
   - Seleccionar mascota
   - Elegir fecha y hora disponible
   - Confirmar cita

2. **Consultar Historial**
   - Ver historial médico de sus mascotas
   - Revisar tratamientos y prescripciones

## 🏗️ Arquitectura y Buenas Prácticas

### Backend (Laravel)
- **Patrón MVC**: Separación clara de responsabilidades
- **Eloquent ORM**: Relaciones entre modelos (hasMany, belongsTo)
- **Validación de datos**: En controladores antes de guardar
- **API RESTful**: Endpoints semánticos y verbos HTTP correctos
- **CORS**: Configurado para desarrollo local

### Frontend (Angular)
- **Arquitectura modular**: División por features
- **Standalone Components**: Uso de componentes independientes (Angular 20)
- **Services pattern**: Servicios para comunicación con API
- **TypeScript interfaces**: Tipado fuerte para modelos
- **Reactive Forms**: Validación y control de formularios
- **Separation of Concerns**: Lógica separada de presentación
- **Responsive Design**: Compatible con dispositivos móviles

### Principios Aplicados
- ✅ **DRY** (Don't Repeat Yourself)
- ✅ **SOLID** - Principios de diseño orientado a objetos
- ✅ **Clean Code** - Código legible y mantenible
- ✅ **Separation of Concerns** - Separación de responsabilidades
- ✅ **Modular Architecture** - Componentes reutilizables

## 📝 Notas Técnicas

### TypeScript
- Interfaces definidas para todos los modelos
- Tipado estricto habilitado
- IntelliSense completo en el IDE

### Formularios
- **ReactiveFormsModule** para validación robusta
- Validaciones síncronas y asíncronas
- Mensajes de error personalizados

### Componentes Parametrizables
- Uso de `@Input()` y `@Output()`
- Componentes reutilizables en múltiples contextos
- Props tipadas con interfaces

### Directivas y Pipes
- `*ngFor` para listados
- `*ngIf` para renderizado condicional
- Pipes personalizados para formateo de datos

### HTTP Client
- Interceptores para manejo de errores
- Observables con RxJS
- Tipado de respuestas

## 🔧 Configuración Adicional

### Variables de Entorno (Laravel)

El archivo `.env` ya está configurado con:
```env
APP_URL=http://localhost:8000
DB_CONNECTION=sqlite
```

### Configuración API URL (Angular)

Los servicios apuntan a `http://localhost:8000/api`
Para cambiar, editar los archivos en `admin/src/app/core/services/*.ts`

## 🐛 Troubleshooting

### Error CORS
Si hay problemas de CORS, verificar que:
- El backend está corriendo en puerto 8000
- El archivo `config/cors.php` permite todas las origins (`'*'`)

### Error de Base de Datos
Si hay errores de BD:
```bash
cd api
php artisan migrate:fresh
```

### Error de Node Modules
Si hay problemas con dependencias:
```bash
cd admin  # o cd web
rm -rf node_modules package-lock.json
npm install
```

## 📚 Recursos y Documentación

- [Laravel Documentation](https://laravel.com/docs)
- [Angular Documentation](https://angular.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [RxJS Documentation](https://rxjs.dev/)

## 👥 Autor
Jonathan Jimenez Rojas.

## 📄 Licencia

Este proyecto es de código abierto y está disponible para fines educativos.

---

**Nota**: Este sistema es una aplicación completa funcional que demuestra:
- Integración frontend-backend
- Arquitectura modular
- Buenas prácticas de programación
- TypeScript con tipado fuerte
- Componentes reutilizables
- Validaciones y control de formularios
- Diseño responsive
- Código limpio y mantenible
#   s y s t e m - v e t 
 
 
#   v e t e r i n a r i a  
 #   v e t e r i n a r i a  
 #   v e t e r i n a r i a  
 #   v e t e r i n a r i a  
 #   v e t e r i n a r i a  
 
# Sistema de Gestion Veterinaria VetiVet 🐾# Sistema de GestiÃ³n Veterinaria VetiVet ðŸ¾



Sistema completo de gestion para clinica veterinaria con arquitectura moderna de tres capas:Sistema completo de gestiÃ³n para clÃ­nica veterinaria con arquitectura moderna de tres capas:

- **API Backend** (Laravel 12 + MySQL)- **API Backend** (Laravel 12 + MySQL)

- **Panel Administrativo** (Angular 18 - Gestion Interna)- **Panel Administrativo** (Angular 20 - GestiÃ³n Interna)

- **Portal Web para Clientes** (Angular 18 - Autogestion)- **Portal Web para Clientes** (Angular 20 - AutogestiÃ³n)



## 📚 Documentacion Adicional## ðŸ“š DocumentaciÃ³n Adicional



- **[Roles y Permisos](ROLES_Y_PERMISOS.md)** - Guia completa del sistema de control de acceso basado en roles- **[Roles y Permisos](ROLES_Y_PERMISOS.md)** - GuÃ­a completa del sistema de control de acceso basado en roles

- **[Beneficios y Mejoras](BENEFICIOS_Y_MEJORAS.md)** - Como VetiVet mejora los procesos de la clinica veterinaria- **[Beneficios y Mejoras](BENEFICIOS_Y_MEJORAS.md)** - CÃ³mo VetiVet mejora los procesos de la clÃ­nica veterinaria

- **[Datos de Prueba](DATOS_DE_PRUEBA.md)** - Usuarios y datos precargados para testing- **[Datos de Prueba](DATOS_DE_PRUEBA.md)** - Usuarios y datos precargados para testing



## 🌟 Caracteristicas Principales## ðŸŒŸ CaracterÃ­sticas Principales



### 🔐 Sistema de Autenticacion y Roles### ðŸ” Sistema de AutenticaciÃ³n y Roles

- Sistema completo de roles (Admin, Veterinario, Cliente)- Sistema completo de roles (Admin, Veterinario, Cliente)

- Control de acceso basado en roles (RBAC)- Control de acceso basado en roles (RBAC)

- Login con validacion de rol requerido- Login con validaciÃ³n de rol requerido

- Registro de usuarios con verificacion de email- Registro de usuarios con verificaciÃ³n de email

- Recuperacion de contraseña- RecuperaciÃ³n de contraseÃ±a

- Guards de autenticacion en backend y frontend- Guards de autenticaciÃ³n en backend y frontend

- CAPTCHA personalizado para registro- CAPTCHA personalizado para registro

- **Ver detalles en [ROLES_Y_PERMISOS.md](ROLES_Y_PERMISOS.md)**

### 💼 Backend API (Laravel 12)

### ðŸ’¼ Backend API (Laravel 12)

#### Autenticacion y Seguridad

- ✅ Sistema de autenticacion con Laravel Sanctum#### AutenticaciÃ³n y Seguridad

- ✅ Verificacion de email con notificaciones personalizadas- âœ… Sistema de autenticaciÃ³n con Laravel Sanctum

- ✅ Recuperacion de contraseña- âœ… VerificaciÃ³n de email con notificaciones personalizadas

- ✅ CAPTCHA propio para prevenir bots- âœ… RecuperaciÃ³n de contraseÃ±a

- ✅ Middleware de autenticacion y verificacion de email- âœ… CAPTCHA propio para prevenir bots

- ✅ Gestion de roles (admin, veterinarian, user)- âœ… Middleware de autenticaciÃ³n y verificaciÃ³n de email

- âœ… GestiÃ³n de roles (admin, veterinarian, user)

#### Gestion de Datos

- ✅ CRUD completo de usuarios con roles#### GestiÃ³n de Datos

- ✅ Gestion de mascotas con propietarios- âœ… CRUD completo de usuarios con roles

- ✅ Sistema de citas con veterinarios asignados- âœ… GestiÃ³n de mascotas con propietarios

- ✅ Historial medico detallado- âœ… Sistema de citas con veterinarios asignados

- ✅ Calendario de disponibilidad- âœ… Historial mÃ©dico detallado

- ✅ Filtros por estado, fecha y usuario- âœ… Calendario de disponibilidad

- âœ… Filtros por estado, fecha y usuario

### 🎨 Panel Administrativo (Angular 18)

#### CaracterÃ­sticas TÃ©cnicas

#### Gestion de Usuarios- âœ… API RESTful con relaciones Eloquent

- ✅ CRUD completo de usuarios- âœ… Validaciones exhaustivas de datos

- ✅ Busqueda por nombre, email, telefono- âœ… CORS configurado para desarrollo

- ✅ Filtrado por rol- âœ… Base de datos MySQL

- ✅ Gestion de permisos- âœ… Migraciones y seeders

- âœ… Emails HTML personalizados

#### Gestion de Mascotas

- ✅ Registro completo con foto### ðŸŽ¨ Panel Administrativo (Angular 18)

- ✅ Historial medico integrado

- ✅ Busqueda y filtros avanzados#### GestiÃ³n de Usuarios

- ✅ Vista de detalles completa- âœ… CRUD completo de usuarios

- âœ… BÃºsqueda por nombre, email, telÃ©fono

#### Gestion de Citas- âœ… Filtrado por rol

- ✅ Calendario mensual interactivo- âœ… GestiÃ³n de permisos

- ✅ Asignacion de veterinarios- âœ… Cambio de contraseÃ±as

- ✅ Control de estados (pendiente, confirmada, completada, cancelada)- âœ… ActivaciÃ³n/desactivaciÃ³n de cuentas

- ✅ Filtros por fecha y estado

#### GestiÃ³n de Mascotas

### 🌐 Portal Web para Clientes (Angular 18)- âœ… Registro completo con foto

- âœ… Historial mÃ©dico integrado

#### Funcionalidades de Usuario- âœ… BÃºsqueda y filtros avanzados

- ✅ Registro y login de clientes- âœ… Vista de detalles completa

- ✅ Verificacion de email- âœ… EdiciÃ³n y eliminaciÃ³n

- ✅ Recuperacion de contraseña

- ✅ Perfil editable#### GestiÃ³n de Citas

- âœ… Calendario mensual interactivo

#### Gestion de Mascotas- âœ… AsignaciÃ³n de veterinarios

- ✅ Registro de mascotas propias- âœ… Control de estados (pendiente, confirmada, completada, cancelada)

- ✅ Vista de mascotas registradas- âœ… Filtros por fecha y estado

- ✅ Acceso al historial medico- âœ… Vista de disponibilidad



#### Sistema de Citas#### Historial MÃ©dico

- ✅ Solicitud de citas online- âœ… Registro de consultas

- ✅ Seleccion de mascota y veterinario- âœ… DiagnÃ³sticos y tratamientos

- ✅ Vista de citas programadas- âœ… Prescripciones mÃ©dicas

- ✅ Cancelacion de citas- âœ… Notas del veterinario

- âœ… Historial completo por mascota

## 🚀 Tecnologias Utilizadas

#### CaracterÃ­sticas TÃ©cnicas

### Backend- âœ… Componentes standalone

- **Laravel 12** - Framework PHP- âœ… Signals API para estado reactivo

- **MySQL** - Base de datos- âœ… Reactive Forms con validaciones

- **Laravel Sanctum** - Autenticacion API- âœ… Interceptores HTTP

- **Eloquent ORM** - Mapeo objeto-relacional- âœ… Guards de autenticaciÃ³n

- âœ… DiseÃ±o responsive

### Frontend

- **Angular 18** - Framework TypeScript### ðŸŒ Portal Web para Clientes (Angular 18)

- **TypeScript** - Lenguaje tipado

- **RxJS** - Programacion reactiva#### Funcionalidades de Usuario

- **Angular Signals** - Estado reactivo- âœ… Registro y login de clientes

- **Bootstrap 5** - Framework CSS- âœ… VerificaciÃ³n de email

- âœ… RecuperaciÃ³n de contraseÃ±a

## 🛠️ Instalacion y Configuracion- âœ… Perfil editable

- âœ… Cambio de contraseÃ±a

### Prerrequisitos

- Node.js (v18 o superior)#### GestiÃ³n de Mascotas

- PHP (v8.2 o superior)- âœ… Registro de mascotas propias

- Composer- âœ… Vista de mascotas registradas

- MySQL- âœ… Historial mÃ©dico de sus mascotas

- Git- âœ… ActualizaciÃ³n de datos



### Backend (Laravel API)#### Sistema de Citas

- âœ… Calendario interactivo para agendar

```bash- âœ… SelecciÃ³n de fecha y hora disponible

cd api- âœ… SelecciÃ³n de veterinario

composer install- âœ… SelecciÃ³n o registro de mascota

copy .env.example .env- âœ… Motivo de consulta

php artisan key:generate- âœ… Observaciones adicionales

php artisan migrate --seed

php artisan serve --port=8000#### Mis Citas

```- âœ… Vista de todas las citas

- âœ… Filtro por estado (Todas, PrÃ³ximas, Pasadas)

### Frontend Administrativo- âœ… Detalles de cada cita

- âœ… CancelaciÃ³n de citas (con restricciones)

```bash- âœ… Estados visuales por color

cd admin

npm install#### CaracterÃ­sticas de UI/UX

npm run dev- âœ… DiseÃ±o moderno con gradientes

# Acceso: http://localhost:55286- âœ… NavegaciÃ³n intuitiva

```- âœ… Notificaciones toast

- âœ… Modales de confirmaciÃ³n

### Frontend Web Clientes- âœ… Loader states

- âœ… Responsive design

```bash- âœ… Animaciones suaves

cd web

npm install## ðŸ› ï¸ Stack TecnolÃ³gico

npm run dev

# Acceso: http://localhost:8003### Backend

```- **Framework**: Laravel 12

- **PHP**: 8.3+

## 🔑 Credenciales de Prueba- **Base de Datos**: MySQL

- **AutenticaciÃ³n**: Laravel Sanctum

### Administrador- **Email**: Laravel Mail con templates personalizados

- Email: admin@vetivet.com- **ValidaciÃ³n**: Form Requests

- Password: Admin123

- Panel: http://localhost:55286### Frontend (Admin & Web)

- **Framework**: Angular 18

### Veterinario- **Lenguaje**: TypeScript 5.x

- Email: carlos.mendoza@vetivet.com- **Estado**: Signals API

- Password: Vet123- **Formularios**: Reactive Forms

- Panel: http://localhost:55286- **HTTP**: HttpClient con RxJS

- **Routing**: Angular Router

### Cliente- **Estilos**: SCSS con variables CSS

- Email: juan.perez@example.com- **Arquitectura**: Standalone Components

- Password: User123

- Panel: http://localhost:8003## ðŸ“ Estructura del Proyecto



## 📋 Funcionalidades por Rol```

systema-veterinaria/

### 👨‍💼 Administradorâ”œâ”€â”€ api/                              # Backend Laravel

- Gestion completa de usuariosâ”‚   â”œâ”€â”€ app/

- Gestion de mascotas y propietariosâ”‚   â”‚   â”œâ”€â”€ Http/

- Gestion de citas y horariosâ”‚   â”‚   â”‚   â”œâ”€â”€ Controllers/API/

- Gestion de historiales medicosâ”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ AuthController.php       # AutenticaciÃ³n

â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ WebController.php        # Endpoints web

### 👨‍⚕️ Veterinarioâ”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ PetController.php        # Mascotas

- Gestion de sus citas asignadasâ”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ AppointmentController.php # Citas

- Acceso a historiales medicosâ”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ MedicalHistoryController.php

- Registro de consultas y tratamientosâ”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ UserController.php       # Usuarios

â”‚   â”‚   â”‚   â”‚   â””â”€â”€ CaptchaController.php    # CAPTCHA

### 👤 Clienteâ”‚   â”‚   â”œâ”€â”€ Models/

- Registro y gestion de sus mascotasâ”‚   â”‚   â”‚   â”œâ”€â”€ User.php

- Solicitud de citasâ”‚   â”‚   â”‚   â”œâ”€â”€ Pet.php

- Consulta de historiales medicosâ”‚   â”‚   â”‚   â”œâ”€â”€ Appointment.php

â”‚   â”‚   â”‚   â””â”€â”€ MedicalHistory.php

## 🏗️ Arquitectura del Sistemaâ”‚   â”‚   â””â”€â”€ Notifications/

â”‚   â”‚       â””â”€â”€ VerifyEmailNotification.php  # Email verificaciÃ³n

El sistema implementa una arquitectura de tres capas:â”‚   â”œâ”€â”€ database/

â”‚   â”‚   â”œâ”€â”€ migrations/

1. **API Backend** (Laravel) - Logica de negocio y datosâ”‚   â”‚   â””â”€â”€ seeders/

2. **Panel Admin** (Angular) - Gestion interna de la clinicaâ”‚   â”‚       â””â”€â”€ VeterinarianSeeder.php

3. **Portal Web** (Angular) - Interfaz para clientesâ”‚   â”œâ”€â”€ routes/

â”‚   â”‚   â””â”€â”€ api.php                  # Rutas API

## 🔒 Seguridad Implementadaâ”‚   â””â”€â”€ resources/

â”‚       â””â”€â”€ views/vendor/mail/       # Templates email

- Autenticacion JWT con Laravel Sanctumâ”‚

- Control de acceso basado en roles (RBAC)â”œâ”€â”€ admin/                            # Panel Admin Angular

- Validacion de email obligatoriaâ”‚   â”œâ”€â”€ src/

- CAPTCHA personalizado anti-botsâ”‚   â”‚   â”œâ”€â”€ app/

- Encriptacion de contraseñas con bcryptâ”‚   â”‚   â”‚   â”œâ”€â”€ core/

- Guards de ruta en frontend y backendâ”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ guards/         # Auth & Login guards

â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ interceptors/   # HTTP interceptor

## 📊 Base de Datosâ”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ models/         # Interfaces TypeScript

â”‚   â”‚   â”‚   â”‚   â””â”€â”€ services/       # Servicios HTTP

### Tablas Principalesâ”‚   â”‚   â”‚   â”œâ”€â”€ features/

- **users** - Usuarios del sistema con rolesâ”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ pets/

- **pets** - Mascotas registradasâ”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ appointments/

- **appointments** - Citas medicasâ”‚   â”‚   â”‚   â”‚   â””â”€â”€ medical-histories/

- **medical_histories** - Historiales medicosâ”‚   â”‚   â”‚   â””â”€â”€ shared/

â”‚   â”‚   â”‚       â””â”€â”€ components/

### Relacionesâ”‚   â”‚   â””â”€â”€ styles.scss

- Usuario → Mascotas (1:N)â”‚

- Mascota → Citas (1:N)â””â”€â”€ web/                              # Portal Web Angular

- Mascota → Historia Medica (1:N)    â”œâ”€â”€ src/

- Usuario (Vet) → Citas (1:N)    â”‚   â”œâ”€â”€ app/

    â”‚   â”‚   â”œâ”€â”€ core/

## 🎯 Beneficios del Sistema    â”‚   â”‚   â”‚   â”œâ”€â”€ guards/

    â”‚   â”‚   â”‚   â”œâ”€â”€ interceptors/

### Para la Clinica    â”‚   â”‚   â”‚   â”œâ”€â”€ models/

- Reduccion del 80% en tiempo de busqueda de informacion    â”‚   â”‚   â”‚   â””â”€â”€ services/

- Eliminacion del uso de papel para historiales    â”‚   â”‚   â”‚       â”œâ”€â”€ auth.service.ts

- Control automatizado de citas y disponibilidad    â”‚   â”‚   â”‚       â”œâ”€â”€ web.service.ts

- Mejora en la organizacion y eficiencia    â”‚   â”‚   â”‚       â””â”€â”€ notification.service.ts

    â”‚   â”‚   â”œâ”€â”€ pages/

### Para los Clientes    â”‚   â”‚   â”‚   â”œâ”€â”€ home/

- Autoservicio 24/7 para gestion de citas    â”‚   â”‚   â”‚   â”œâ”€â”€ login/

- Acceso completo al historial de sus mascotas    â”‚   â”‚   â”‚   â”œâ”€â”€ register/

- Comunicacion automatizada y profesional    â”‚   â”‚   â”‚   â”œâ”€â”€ verify-email/

- Comodidad de gestion desde casa    â”‚   â”‚   â”‚   â”œâ”€â”€ forgot-password/

    â”‚   â”‚   â”‚   â”œâ”€â”€ reset-password/

## 🚀 Caracteristicas Tecnicas Destacadas    â”‚   â”‚   â”‚   â”œâ”€â”€ appointments/      # Agendar citas

    â”‚   â”‚   â”‚   â”œâ”€â”€ my-appointments/   # Mis citas

### Implementacion de Angular    â”‚   â”‚   â”‚   â”œâ”€â”€ my-pets/           # Mis mascotas

- **Componentes Standalone** - Arquitectura moderna    â”‚   â”‚   â”‚   â”œâ”€â”€ users/             # GestiÃ³n usuarios (admin)

- **Angular Signals** - Estado reactivo    â”‚   â”‚   â”‚   â””â”€â”€ profile/           # Perfil usuario

- **Reactive Forms** - Validaciones robustas    â”‚   â”‚   â””â”€â”€ shared/

- **Guards** - Proteccion de rutas    â”‚   â”‚       â””â”€â”€ components/

- **Interceptores** - Manejo centralizado de HTTP    â”‚   â”‚           â”œâ”€â”€ header/

- **Pipes personalizados** - Formateo de datos    â”‚   â”‚           â””â”€â”€ footer/

- **Directivas personalizadas** - Funcionalidades especificas    â”‚   â””â”€â”€ styles.scss

```

### Uso de TypeScript

- **Interfaces definidas** para tipado seguro## ðŸš€ InstalaciÃ³n y EjecuciÃ³n

- **Clases con herencia** aplicando POO

- **Genericos** para reutilizacion de codigo### Requisitos Previos

- **Decoradores** para metadatos- PHP 8.3 o superior

- **Enums** para valores constantes- Composer

- MySQL 8.0+

### Elementos Avanzados- Node.js 18+ y npm

- **Validaciones de formulario** personalizadas- Git

- **Sistema de notificaciones** integrado

- **Manejo de errores** centralizado### 1. Clonar Repositorio

- **Loading states** para UX mejorada```bash

- **Responsive design** para todos los dispositivosgit clone <repository-url>

cd systema-veterinaria

---```



**Desarrollado con ❤️ para mejorar la gestion veterinaria**### 2. Backend API (Laravel)

```bash
cd api

# Instalar dependencias
composer install

# Configurar archivo .env
cp .env.example .env
# Editar .env con credenciales de base de datos MySQL

# Generar key de aplicaciÃ³n
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
# AplicaciÃ³n: http://localhost:4200

# ProducciÃ³n
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
# AplicaciÃ³n: http://localhost:4200

# ProducciÃ³n
ng build --configuration production
# Archivos generados en: web/dist/
```

## ðŸŒ ConfiguraciÃ³n de Entornos

### Variables de Entorno

**Desarrollo (`environment.ts`):**
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api'
};
```

**ProducciÃ³n (`environment.prod.ts`):**
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.vetivet.com/api'
};
```

### Builds de ProducciÃ³n

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

Los archivos compilados estarÃ¡n en las carpetas:
- `admin/dist/admin-app/browser/`
- `web/dist/web-app/browser/`

### Despliegue en ProducciÃ³n

1. **Configurar URL de API en producciÃ³n:**
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
   # En servidor de producciÃ³n
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

## ðŸ“¡ API Endpoints

### AutenticaciÃ³n PÃºblica
```
POST   /api/register              - Registrar usuario
POST   /api/login                 - Iniciar sesiÃ³n
POST   /api/logout                - Cerrar sesiÃ³n
POST   /api/forgot-password       - Solicitar reset password
POST   /api/reset-password        - Resetear password
GET    /api/verify-email/{id}/{hash} - Verificar email
POST   /api/resend-verification-email - Reenviar verificaciÃ³n
GET    /api/captcha/generate      - Generar CAPTCHA
POST   /api/captcha/validate      - Validar CAPTCHA
```

### Endpoints Web (PÃºblicos y Autenticados)
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
PUT    /api/users/{id}/password   - Cambiar contraseÃ±a
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

### CRUD Historial MÃ©dico
```
GET    /api/medical-histories     - Listar historiales
POST   /api/medical-histories     - Crear historial
GET    /api/medical-histories/{id} - Ver historial
PUT    /api/medical-histories/{id} - Actualizar historial
DELETE /api/medical-histories/{id} - Eliminar historial
```

## ðŸŽ¯ Flujo de Usuario

### Cliente (Portal Web)

1. **Registro**
   - Completar formulario con CAPTCHA
   - Recibir email de verificaciÃ³n
   - Verificar email haciendo clic en enlace

2. **Login**
   - Ingresar email y contraseÃ±a
   - Token JWT almacenado en localStorage

3. **GestiÃ³n de Mascotas**
   - Registrar mascotas propias
   - Ver historial mÃ©dico

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

1. **GestiÃ³n de Usuarios**
   - Ver todos los usuarios
   - Crear/editar/eliminar
   - Asignar roles
   - Cambiar contraseÃ±as

2. **GestiÃ³n Completa**
   - Mascotas, citas, historiales
   - Reportes y estadÃ­sticas
   - Control total del sistema

## ðŸ—ï¸ Arquitectura y Patrones

### Backend (Laravel)
- **MVC Pattern**: SeparaciÃ³n clara de responsabilidades
- **Repository Pattern**: AbstracciÃ³n de acceso a datos
- **Service Layer**: LÃ³gica de negocio en servicios
- **Eloquent ORM**: Relaciones entre modelos
- **Form Requests**: ValidaciÃ³n centralizada
- **API Resources**: TransformaciÃ³n de datos
- **Notifications**: Sistema de emails personalizado

### Frontend (Angular)
- **Standalone Components**: Arquitectura moderna
- **Signals API**: Estado reactivo
- **Services Pattern**: ComunicaciÃ³n con API
- **Guards**: ProtecciÃ³n de rutas
- **Interceptors**: Manejo global de HTTP
- **Reactive Forms**: ValidaciÃ³n robusta
- **Lazy Loading**: Carga diferida de mÃ³dulos
- **SCSS Modular**: Estilos componetizados

### Principios SOLID
- âœ… **Single Responsibility**: Cada clase/componente tiene una responsabilidad
- âœ… **Open/Closed**: Abierto a extensiÃ³n, cerrado a modificaciÃ³n
- âœ… **Liskov Substitution**: Subtipos sustituibles
- âœ… **Interface Segregation**: Interfaces especÃ­ficas
- âœ… **Dependency Inversion**: Dependencia de abstracciones

## ðŸŽ¨ DiseÃ±o y UX

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
- Inputs con validaciÃ³n visual
- Modales de confirmaciÃ³n
- Toasts de notificaciÃ³n
- Loaders y spinners
- Tarjetas informativas

## ðŸ”’ Seguridad

- âœ… AutenticaciÃ³n con tokens JWT (Sanctum)
- âœ… ValidaciÃ³n de email obligatoria
- âœ… CAPTCHA en registro
- âœ… Hashing de contraseÃ±as (bcrypt)
- âœ… CORS configurado
- âœ… SanitizaciÃ³n de inputs
- âœ… Guards de autorizaciÃ³n
- âœ… Middleware de verificaciÃ³n

## ðŸ“§ Sistema de Emails

### Templates Personalizados
- Email de verificaciÃ³n con diseÃ±o VetiVet
- Email de recuperaciÃ³n de contraseÃ±a
- Notificaciones de citas
- Recordatorios automÃ¡ticos

### ConfiguraciÃ³n
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_FROM_ADDRESS=noreply@vetivet.com
MAIL_FROM_NAME=VetiVet
```

## ðŸ› Troubleshooting

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

## ðŸ“š DocumentaciÃ³n

- [Laravel 12 Docs](https://laravel.com/docs/12.x)
- [Angular 18 Docs](https://angular.dev)
- [Laravel Sanctum](https://laravel.com/docs/12.x/sanctum)
- [Angular Signals](https://angular.dev/guide/signals)
- [RxJS](https://rxjs.dev/)

## ðŸ‘¥ Credenciales de Prueba

### Veterinarios (Creados por seeder)
```
Email: juan.perez@vetivet.com
Email: maria.garcia@vetivet.com
Email: carlos.lopez@vetivet.com
Email: ana.martinez@vetivet.com
Password: password
```

## ðŸš€ Funcionalidades Destacadas

1. **Sistema de Citas Inteligente**
   - Calendario dinÃ¡mico con disponibilidad
   - ValidaciÃ³n de horarios ocupados
   - AsignaciÃ³n automÃ¡tica de slots

2. **GestiÃ³n de Mascotas**
   - Registro completo con propietario
   - Historial mÃ©dico detallado
   - Relaciones entre modelos

3. **Portal de AutogestiÃ³n**
   - Clientes gestionan sus propias citas
   - Consulta de historial mÃ©dico
   - Notificaciones por email

4. **Panel Administrativo**
   - Control total del sistema
   - GestiÃ³n de usuarios y roles
   - Reportes y estadÃ­sticas

## ðŸ“ Notas de Desarrollo

### TypeScript
- Tipado estricto habilitado
- Interfaces para todos los modelos
- IntelliSense completo

### Formularios Reactivos
- Validaciones sÃ­ncronas y asÃ­ncronas
- Mensajes de error personalizados
- Estados visuales (touched, dirty, valid)

### HTTP Interceptors
- InyecciÃ³n automÃ¡tica de tokens
- Manejo global de errores
- Logging de peticiones

## ðŸ‘¨â€ðŸ’» Autor

**Jonathan Jimenez Rojas**

## ðŸ“„ Licencia

Este proyecto es de cÃ³digo abierto y estÃ¡ disponible para fines educativos.

---

**VetiVet** - Sistema completo de gestiÃ³n veterinaria con arquitectura moderna y mejores prÃ¡cticas de desarrollo. âœ¨

## ðŸ“‹ CaracterÃ­sticas

### Backend API (Laravel)
- âœ… GestiÃ³n de mascotas (CRUD completo)
- âœ… Sistema de citas con estados (pendiente, confirmada, completada, cancelada)
- âœ… Historial mÃ©dico de mascotas
- âœ… API RESTful con relaciones
- âœ… CORS configurado para desarrollo
- âœ… Validaciones de datos
- âœ… Base de datos SQLite

### Panel Administrativo (Angular)
- âœ… MÃ³dulo de gestiÃ³n de mascotas
  - Listado con bÃºsqueda y filtros
  - Formulario de registro/ediciÃ³n con validaciones ReactiveFor ms
  - Vista de detalles completa
- âœ… MÃ³dulo de citas
  - Listado con filtros por fecha y estado
  - Formulario de agendamiento
  - Vista de calendario
- âœ… MÃ³dulo de historial mÃ©dico
  - Registro de consultas
  - DiagnÃ³sticos y tratamientos
  - Prescripciones mÃ©dicas
- âœ… NavegaciÃ³n intuitiva con menÃº principal
- âœ… DiseÃ±o responsive con estilos modernos
- âœ… Componentes standalone (Angular 20)
- âœ… TypeScript con tipado fuerte

### Portal Web para Clientes (Angular)
- âœ… Consulta de citas disponibles
- âœ… Agendamiento de citas en calendario
- âœ… VisualizaciÃ³n del historial mÃ©dico de sus mascotas
- âœ… Interfaz amigable y responsive

## ðŸ› ï¸ TecnologÃ­as Utilizadas

- **Backend**: Laravel 12 (PHP 8.3+)
- **Frontend Admin**: Angular 20 con TypeScript
- **Frontend Web**: Angular 20 con TypeScript
- **Base de Datos**: Mysql
- **Estilos**: SCSS con diseÃ±o responsive
- **Arquitectura**: Modular con separaciÃ³n de responsabilidades

## ðŸ“ Estructura del Proyecto

```
examen-preparcial/
â”œâ”€â”€ api/                          # Backend Laravel
â”‚   â”œâ”€â”€ app/
â”‚   â”‚   â”œâ”€â”€ Http/Controllers/API/ # Controladores REST
â”‚   â”‚   â””â”€â”€ Models/               # Modelos Eloquent
â”‚   â”œâ”€â”€ database/
â”‚   â”‚   â””â”€â”€ migrations/           # Migraciones de BD
â”‚   â”œâ”€â”€ routes/
â”‚   â”‚   â””â”€â”€ web.php              # Rutas API
â”‚   â””â”€â”€ config/
â”‚       â””â”€â”€ cors.php             # ConfiguraciÃ³n CORS
â”‚
â”œâ”€â”€ admin/                        # Frontend Admin Angular
â”‚   â”œâ”€â”€ src/
â”‚   â”‚   â”œâ”€â”€ app/
â”‚   â”‚   â”‚   â”œâ”€â”€ core/            # Servicios y modelos
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ models/      # Interfaces TypeScript
â”‚   â”‚   â”‚   â”‚   â””â”€â”€ services/    # Servicios HTTP
â”‚   â”‚   â”‚   â”œâ”€â”€ features/        # MÃ³dulos funcionales
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ pets/        # GestiÃ³n de mascotas
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ appointments/# GestiÃ³n de citas
â”‚   â”‚   â”‚   â”‚   â””â”€â”€ medical-histories/ # Historial mÃ©dico
â”‚   â”‚   â”‚   â””â”€â”€ shared/          # Componentes compartidos
â”‚   â”‚   â””â”€â”€ styles.scss          # Estilos globales
â”‚
â””â”€â”€ web/                          # Frontend Web Angular
    â””â”€â”€ src/
        â””â”€â”€ app/
            â”œâ”€â”€ features/
            â”‚   â”œâ”€â”€ appointments/ # Calendario de citas
            â”‚   â””â”€â”€ history/     # Historial mÃ©dico
            â””â”€â”€ shared/          # Componentes compartidos
```

## ðŸš€ InstalaciÃ³n y EjecuciÃ³n

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
# Las migraciones ya estÃ¡n ejecutadas

# Iniciar servidor de desarrollo
php artisan serve
# El servidor correrÃ¡ en http://localhost:8000
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
# O tambiÃ©n: npm start

# La aplicaciÃ³n correrÃ¡ en http://localhost:4200
```

### 3. Portal Web (Angular)

```bash
# Navegar a la carpeta web
cd web

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
ng serve --port 4201
# La aplicaciÃ³n correrÃ¡ en http://localhost:4201
```

## ðŸŽ¯ Uso del Sistema

### Panel Administrativo

1. **GestiÃ³n de Mascotas**
   - Acceder a "Mascotas" en el menÃº principal
   - Click en "Nueva Mascota" para registrar
   - Completar formulario con datos del animal y dueÃ±o
   - Ver detalles, editar o eliminar mascotas existentes

2. **GestiÃ³n de Citas**
   - Acceder a "Citas" para ver listado
   - "Nueva Cita" para agendar
   - Filtrar por fecha o estado
   - Ver "Calendario" para vista mensual

3. **Historial MÃ©dico**
   - Acceder a "Historial MÃ©dico"
   - Registrar consultas, diagnÃ³sticos y tratamientos
   - Ver historial completo por mascota

### Portal Web (Clientes)

1. **Agendar Citas**
   - Seleccionar mascota
   - Elegir fecha y hora disponible
   - Confirmar cita

2. **Consultar Historial**
   - Ver historial mÃ©dico de sus mascotas
   - Revisar tratamientos y prescripciones

## ðŸ—ï¸ Arquitectura y Buenas PrÃ¡cticas

### Backend (Laravel)
- **PatrÃ³n MVC**: SeparaciÃ³n clara de responsabilidades
- **Eloquent ORM**: Relaciones entre modelos (hasMany, belongsTo)
- **ValidaciÃ³n de datos**: En controladores antes de guardar
- **API RESTful**: Endpoints semÃ¡nticos y verbos HTTP correctos
- **CORS**: Configurado para desarrollo local

### Frontend (Angular)
- **Arquitectura modular**: DivisiÃ³n por features
- **Standalone Components**: Uso de componentes independientes (Angular 20)
- **Services pattern**: Servicios para comunicaciÃ³n con API
- **TypeScript interfaces**: Tipado fuerte para modelos
- **Reactive Forms**: ValidaciÃ³n y control de formularios
- **Separation of Concerns**: LÃ³gica separada de presentaciÃ³n
- **Responsive Design**: Compatible con dispositivos mÃ³viles

### Principios Aplicados
- âœ… **DRY** (Don't Repeat Yourself)
- âœ… **SOLID** - Principios de diseÃ±o orientado a objetos
- âœ… **Clean Code** - CÃ³digo legible y mantenible
- âœ… **Separation of Concerns** - SeparaciÃ³n de responsabilidades
- âœ… **Modular Architecture** - Componentes reutilizables

## ðŸ“ Notas TÃ©cnicas

### TypeScript
- Interfaces definidas para todos los modelos
- Tipado estricto habilitado
- IntelliSense completo en el IDE

### Formularios
- **ReactiveFormsModule** para validaciÃ³n robusta
- Validaciones sÃ­ncronas y asÃ­ncronas
- Mensajes de error personalizados

### Componentes Parametrizables
- Uso de `@Input()` y `@Output()`
- Componentes reutilizables en mÃºltiples contextos
- Props tipadas con interfaces

### Directivas y Pipes
- `*ngFor` para listados
- `*ngIf` para renderizado condicional
- Pipes personalizados para formateo de datos

### HTTP Client
- Interceptores para manejo de errores
- Observables con RxJS
- Tipado de respuestas

## ðŸ”§ ConfiguraciÃ³n Adicional

### Variables de Entorno (Laravel)

El archivo `.env` ya estÃ¡ configurado con:
```env
APP_URL=http://localhost:8000
DB_CONNECTION=sqlite
```

### ConfiguraciÃ³n API URL (Angular)

Los servicios apuntan a `http://localhost:8000/api`
Para cambiar, editar los archivos en `admin/src/app/core/services/*.ts`

## ðŸ› Troubleshooting

### Error CORS
Si hay problemas de CORS, verificar que:
- El backend estÃ¡ corriendo en puerto 8000
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

## ðŸ“š Recursos y DocumentaciÃ³n

- [Laravel Documentation](https://laravel.com/docs)
- [Angular Documentation](https://angular.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [RxJS Documentation](https://rxjs.dev/)

## ðŸ‘¥ Autor
Jonathan Jimenez Rojas.

## ðŸ“„ Licencia

Este proyecto es de cÃ³digo abierto y estÃ¡ disponible para fines educativos.

---

**Nota**: Este sistema es una aplicaciÃ³n completa funcional que demuestra:
- IntegraciÃ³n frontend-backend
- Arquitectura modular
- Buenas prÃ¡cticas de programaciÃ³n
- TypeScript con tipado fuerte
- Componentes reutilizables
- Validaciones y control de formularios
- DiseÃ±o responsive
- CÃ³digo limpio y mantenible
#   s y s t e m - v e t 
 
 
#   v e t e r i n a r i a 
 
 #   v e t e r i n a r i a 
 
 #   v e t e r i n a r i a 
 
 #   v e t e r i n a r i a 
 
 #   v e t e r i n a r i a 
 
 #   v e t e r i n a r i a 
 
 
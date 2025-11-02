import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { authGuard, loginGuard } from './core/guards/auth.guard';
import { PetList } from './features/pets/pet-list/pet-list';
import { PetForm } from './features/pets/pet-form/pet-form';
import { PetDetail } from './features/pets/pet-detail/pet-detail';
import { AppointmentList } from './features/appointments/appointment-list/appointment-list';
import { AppointmentForm } from './features/appointments/appointment-form/appointment-form';
import { AppointmentDetail } from './features/appointments/appointment-detail/appointment-detail';
import { AppointmentCalendar } from './features/appointments/appointment-calendar/appointment-calendar';
import { HistoryList } from './features/medical-histories/history-list/history-list';
import { HistoryForm } from './features/medical-histories/history-form/history-form';
import { HistoryDetail } from './features/medical-histories/history-detail/history-detail';
import { ClientList } from './features/clients/client-list/client-list';
import { ClientForm } from './features/clients/client-form/client-form';
import { ClientDetail } from './features/clients/client-detail/client-detail';
import { VeterinarianList } from './features/veterinarians/veterinarian-list/veterinarian-list';
import { VeterinarianForm } from './features/veterinarians/veterinarian-form/veterinarian-form';
import { VeterinarianDetail } from './features/veterinarians/veterinarian-detail/veterinarian-detail';
import { Profile } from './features/profile/profile';

/**
 * Configuración de rutas de la aplicación
 * - Rutas públicas: /login
 * - Rutas protegidas: todas las demás requieren autenticación
 */
export const routes: Routes = [
  // Ruta de login - solo accesible si NO está autenticado
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [loginGuard] // Previene acceso si ya está autenticado
  },
  
  // Redirección por defecto
  { path: '', redirectTo: '/pets', pathMatch: 'full' },
  
  // === RUTAS PROTEGIDAS - Requieren autenticación ===
  // Pets - Gestión de mascotas
  { path: 'pets', component: PetList, canActivate: [authGuard] },
  { path: 'pets/new', component: PetForm, canActivate: [authGuard] },
  { path: 'pets/:id', component: PetDetail, canActivate: [authGuard] },
  { path: 'pets/:id/edit', component: PetForm, canActivate: [authGuard] },
  
  // Appointments - Gestión de citas
  { path: 'appointments', component: AppointmentList, canActivate: [authGuard] },
  { path: 'appointments/new', component: AppointmentForm, canActivate: [authGuard] },
  { path: 'appointments/calendar', component: AppointmentCalendar, canActivate: [authGuard] },
  { path: 'appointments/:id', component: AppointmentDetail, canActivate: [authGuard] },
  { path: 'appointments/:id/edit', component: AppointmentForm, canActivate: [authGuard] },
  
  // Medical Histories - Gestión de historiales médicos
  { path: 'medical-histories', component: HistoryList, canActivate: [authGuard] },
  { path: 'medical-histories/new', component: HistoryForm, canActivate: [authGuard] },
  { path: 'medical-histories/:id', component: HistoryDetail, canActivate: [authGuard] },
  { path: 'medical-histories/:id/edit', component: HistoryForm, canActivate: [authGuard] },
  
  // Clients - Gestión de clientes
  { path: 'clients', component: ClientList, canActivate: [authGuard] },
  { path: 'clients/new', component: ClientForm, canActivate: [authGuard] },
  { path: 'clients/:id', component: ClientDetail, canActivate: [authGuard] },
  { path: 'clients/:id/edit', component: ClientForm, canActivate: [authGuard] },
  
  // Veterinarians - Gestión de veterinarios
  { path: 'veterinarians', component: VeterinarianList, canActivate: [authGuard] },
  { path: 'veterinarians/new', component: VeterinarianForm, canActivate: [authGuard] },
  { path: 'veterinarians/:id', component: VeterinarianDetail, canActivate: [authGuard] },
  { path: 'veterinarians/:id/edit', component: VeterinarianForm, canActivate: [authGuard] },
  
  // Profile - Gestión de perfil del usuario
  { path: 'profile', component: Profile, canActivate: [authGuard] },
];

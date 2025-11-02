import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard'; 
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { MyAppointmentsComponent } from './pages/my-appointments/my-appointments.component';
import { MyPetsComponent } from './pages/my-pets/my-pets.component';
import { UsersComponent } from './pages/users/users.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent
  },
  {
    path: 'verify-email/:id/:hash',
    component: VerifyEmailComponent
  },
  {
    path: 'appointments',
    component: AppointmentsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'my-appointments',
    component: MyAppointmentsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'my-pets',
    component: MyPetsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

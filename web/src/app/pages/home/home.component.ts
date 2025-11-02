import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(public authService: AuthService) {}

  features = [
    {
      icon: 'calendar',
      title: 'Agenda tu Cita',
      description: 'Sistema de citas en línea disponible 24/7. Elige fecha, hora y veterinario de tu preferencia.'
    },
    {
      icon: 'heart',
      title: 'Atención Especializada',
      description: 'Nuestros veterinarios certificados brindan atención integral para tu mascota.'
    },
    {
      icon: 'clipboard',
      title: 'Historial Médico',
      description: 'Accede al historial médico completo de tus mascotas desde cualquier lugar.'
    },
    {
      icon: 'clock',
      title: 'Horario Flexible',
      description: 'Atendemos de lunes a sábado de 9:00 AM a 6:00 PM con citas cada 30 minutos.'
    }
  ];

  services = [
    {
      name: 'Consulta General',
      description: 'Revisión completa del estado de salud de tu mascota',
      icon: 'stethoscope'
    },
    {
      name: 'Vacunación',
      description: 'Esquemas de vacunación completos y refuerzos',
      icon: 'syringe'
    },
    {
      name: 'Cirugía',
      description: 'Procedimientos quirúrgicos con equipamiento moderno',
      icon: 'scissors'
    },
    {
      name: 'Laboratorio',
      description: 'Análisis clínicos y diagnósticos especializados',
      icon: 'flask'
    },
    {
      name: 'Emergencias',
      description: 'Atención de urgencias veterinarias',
      icon: 'ambulance'
    },
    {
      name: 'Peluquería',
      description: 'Baño, corte y estética para tu mascota',
      icon: 'scissors'
    }
  ];
}

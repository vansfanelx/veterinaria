import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  menuOpen = signal(false);

  ngOnInit() {
    console.log('HeaderComponent loaded!');
  }

  toggleMenu() {
    this.menuOpen.update(value => !value);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  isAdmin(): boolean {
    let isAdmin = false;
    this.authService.currentUser$.subscribe(user => {
      isAdmin = user?.role === 'admin';
    }).unsubscribe();
    return isAdmin;
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.closeMenu();
      },
      error: () => {
        // El error ya se maneja en el servicio
        this.closeMenu();
      }
    });
  }
}

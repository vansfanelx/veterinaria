import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent implements OnInit {
  isVerifying = false;
  isResending = false;
  verificationStatus: 'pending' | 'success' | 'error' = 'pending';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    const hash = this.route.snapshot.params['hash'];

    if (id && hash) {
      this.verifyEmail(id, hash);
    }
  }

  verifyEmail(id: string, hash: string): void {
    this.isVerifying = true;
    this.authService.verifyEmail(parseInt(id), hash).subscribe({
      next: () => {
        this.verificationStatus = 'success';
        this.notificationService.show('Correo verificado exitosamente', 'success');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (error) => {
        this.verificationStatus = 'error';
        this.isVerifying = false;
        const message = error.error?.message || 'Error al verificar el correo';
        this.notificationService.show(message, 'error');
      }
    });
  }

  resendVerification(): void {
    if (this.isResending) return;

    this.isResending = true;
    this.authService.resendVerificationEmail().subscribe({
      next: () => {
        this.isResending = false;
        this.notificationService.show('Correo de verificación enviado', 'success');
      },
      error: (error) => {
        this.isResending = false;
        const message = error.error?.message || 'Error al enviar el correo';
        this.notificationService.show(message, 'error');
      }
    });
  }
}

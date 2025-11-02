import { Component, OnInit, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CaptchaService } from '../../../core/services/captcha.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './captcha.component.html',
  styleUrl: './captcha.component.scss'
})
export class CaptchaComponent implements OnInit {
  loading = signal(false);
  validating = signal(false);
  userAnswer = signal<number | null>(null);
  isVerified = signal(false);
  
  // Output event cuando el captcha es verificado
  verified = output<string>(); // Emite el verification_token

  constructor(
    public captchaService: CaptchaService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadCaptcha();
  }

  loadCaptcha() {
    this.loading.set(true);
    this.isVerified.set(false);
    this.userAnswer.set(null);
    
    this.captchaService.generate().subscribe({
      next: () => {
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        this.notificationService.error('Error al cargar el CAPTCHA');
        console.error('Error loading captcha:', error);
      }
    });
  }

  validateAnswer() {
    const captcha = this.captchaService.currentCaptcha();
    const answer = this.userAnswer();

    if (!captcha || answer === null) {
      this.notificationService.warning('Por favor, ingresa tu respuesta');
      return;
    }

    this.validating.set(true);

    this.captchaService.validate(captcha.token, answer).subscribe({
      next: (response) => {
        this.validating.set(false);
        if (response.valid && response.verification_token) {
          this.isVerified.set(true);
          this.notificationService.success('CAPTCHA verificado correctamente');
          this.verified.emit(response.verification_token);
        }
      },
      error: (error) => {
        this.validating.set(false);
        const message = error.error?.message || 'Respuesta incorrecta';
        this.notificationService.error(message);
        
        // Recargar captcha después de error
        setTimeout(() => {
          this.loadCaptcha();
        }, 1500);
      }
    });
  }

  refreshCaptcha() {
    this.loadCaptcha();
  }
}

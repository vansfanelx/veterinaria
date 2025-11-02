import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../../../core/services/notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notification-container">
      @for (notification of notifications$ | async; track notification.id) {
        <div 
          [class]="'notification notification-' + notification.type"
          (click)="removeNotification(notification.id)"
        >
          <span class="notification-icon">
            @if (notification.type === 'success') { ✅ }
            @if (notification.type === 'error') { ❌ }
            @if (notification.type === 'warning') { ⚠️ }
            @if (notification.type === 'info') { ℹ️ }
          </span>
          <span class="notification-message">{{ notification.message }}</span>
          <button class="notification-close" (click)="removeNotification(notification.id)">
            ✕
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .notification-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 400px;
    }

    .notification {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      cursor: pointer;
      animation: slideIn 0.3s ease;
      transition: all 0.2s ease;
      min-width: 300px;

      &:hover {
        transform: translateX(-4px);
        box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
      }
    }

    .notification-success {
      background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
      border-left: 4px solid #10b981;
      color: #065f46;
    }

    .notification-error {
      background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
      border-left: 4px solid #ef4444;
      color: #991b1b;
    }

    .notification-warning {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      border-left: 4px solid #f59e0b;
      color: #92400e;
    }

    .notification-info {
      background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
      border-left: 4px solid #3b82f6;
      color: #1e40af;
    }

    .notification-icon {
      font-size: 20px;
      flex-shrink: 0;
    }

    .notification-message {
      flex: 1;
      font-size: 14px;
      font-weight: 600;
      line-height: 1.4;
    }

    .notification-close {
      background: none;
      border: none;
      font-size: 18px;
      cursor: pointer;
      opacity: 0.6;
      transition: opacity 0.2s;
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;

      &:hover {
        opacity: 1;
        background: rgba(0, 0, 0, 0.1);
      }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(100px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @media (max-width: 640px) {
      .notification-container {
        right: 12px;
        left: 12px;
        max-width: none;
      }

      .notification {
        min-width: auto;
      }
    }
  `]
})
export class NotificationComponent {
  notifications$;

  constructor(private notificationService: NotificationService) {
    // Inicializar en el constructor para evitar error TS2729
    this.notifications$ = this.notificationService.notifications$;
  }

  removeNotification(id: string): void {
    this.notificationService.remove(id);
  }
}

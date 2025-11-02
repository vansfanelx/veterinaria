import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente Modal de Confirmación
 * 
 * Modal reutilizable para confirmar acciones destructivas como eliminaciones
 * Incluye animaciones y diseño moderno
 * 
 * Uso:
 * <app-confirm-modal
 *   [isOpen]="showModal"
 *   [title]="'Confirmar eliminación'"
 *   [message]="'¿Está seguro de eliminar esta mascota?'"
 *   [confirmText]="'Eliminar'"
 *   [cancelText]="'Cancelar'"
 *   (confirm)="onConfirm()"
 *   (cancel)="onCancel()">
 * </app-confirm-modal>
 */
@Component({
  selector: 'app-confirm-modal',
  imports: [CommonModule],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.scss'
})
export class ConfirmModalComponent {
  /** Controla si el modal está visible */
  @Input() isOpen = false;
  
  /** Título del modal */
  @Input() title = 'Confirmar acción';
  
  /** Mensaje de confirmación */
  @Input() message = '¿Está seguro de realizar esta acción?';
  
  /** Texto del botón de confirmación */
  @Input() confirmText = 'Confirmar';
  
  /** Texto del botón de cancelar */
  @Input() cancelText = 'Cancelar';
  
  /** Tipo de modal (danger para eliminaciones, warning para advertencias) */
  @Input() type: 'danger' | 'warning' | 'info' = 'danger';
  
  /** Emite cuando el usuario confirma la acción */
  @Output() confirm = new EventEmitter<void>();
  
  /** Emite cuando el usuario cancela la acción */
  @Output() cancel = new EventEmitter<void>();

  /**
   * Maneja el clic en el botón de confirmar
   */
  onConfirm(): void {
    this.confirm.emit();
  }

  /**
   * Maneja el clic en el botón de cancelar
   */
  onCancel(): void {
    this.cancel.emit();
  }

  /**
   * Cierra el modal al hacer clic en el overlay (fondo oscuro)
   */
  onOverlayClick(event: MouseEvent): void {
    // Solo cerrar si se hace clic directamente en el overlay, no en el contenido del modal
    if (event.target === event.currentTarget) {
      this.onCancel();
    }
  }
}

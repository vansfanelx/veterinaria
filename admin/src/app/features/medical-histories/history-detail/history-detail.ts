import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MedicalHistoryService } from '../../../core/services/medical-history';
import { MedicalHistory } from '../../../core/models/models';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal';
import { NotificationService } from '../../../core/services/notification';

@Component({
  selector: 'app-history-detail',
  imports: [CommonModule, RouterModule, ConfirmModalComponent],
  templateUrl: './history-detail.html',
  styleUrl: './history-detail.scss',
})
export class HistoryDetail implements OnInit {
  history: MedicalHistory | null = null;
  loading = true;
  error: string | null = null;
  showDeleteModal = false;

  constructor(
    private historyService: MedicalHistoryService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadHistory(id);
    }
  }

  loadHistory(id: number): void {
    this.loading = true;
    this.historyService.getById(id).subscribe({
      next: (data) => {
        this.history = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el historial médico';
        this.loading = false;
        console.error(err);
      }
    });
  }

  openDeleteModal(): void {
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  confirmDelete(): void {
    if (!this.history?.id) return;

    this.historyService.delete(this.history.id).subscribe({
      next: () => {
        this.notificationService.success('Historial médico eliminado exitosamente');
        this.router.navigate(['/medical-histories']);
      },
      error: (err) => {
        console.error('Error al eliminar historial:', err);
        this.notificationService.error('Error al eliminar el historial');
        this.closeDeleteModal();
      }
    });
  }
}

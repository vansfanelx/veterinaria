import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user';
import { User } from '../../../core/models/models';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal';
import { NotificationService } from '../../../core/services/notification';

@Component({
  selector: 'app-client-detail',
  imports: [CommonModule, RouterModule, ConfirmModalComponent],
  templateUrl: './client-detail.html',
  styleUrl: './client-detail.scss',
})
export class ClientDetail implements OnInit {
  client: User | null = null;
  loading = false;
  error: string | null = null;
  showDeleteModal = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadClient(id);
    }
  }

  loadClient(id: number): void {
    this.loading = true;
    this.error = null;

    this.userService.getById(id).subscribe({
      next: (data) => {
        this.client = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el cliente';
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
    if (!this.client?.id) return;

    this.userService.delete(this.client.id).subscribe({
      next: () => {
        this.notificationService.success('Cliente eliminado exitosamente');
        this.router.navigate(['/clients']);
      },
      error: (err) => {
        console.error('Error al eliminar cliente:', err);
        this.notificationService.error('Error al eliminar el cliente');
        this.closeDeleteModal();
      }
    });
  }
}

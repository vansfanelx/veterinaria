import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user';
import { User } from '../../../core/models/models';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal';
import { NotificationService } from '../../../core/services/notification';

@Component({
  selector: 'app-veterinarian-detail',
  imports: [CommonModule, RouterModule, ConfirmModalComponent],
  templateUrl: './veterinarian-detail.html',
  styleUrl: './veterinarian-detail.scss',
})
export class VeterinarianDetail implements OnInit {
  veterinarian: User | null = null;
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
      this.loadVeterinarian(id);
    }
  }

  loadVeterinarian(id: number): void {
    this.loading = true;
    this.error = null;

    this.userService.getById(id).subscribe({
      next: (data) => {
        this.veterinarian = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el veterinario';
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
    if (!this.veterinarian?.id) return;

    this.userService.delete(this.veterinarian.id).subscribe({
      next: () => {
        this.notificationService.success('Veterinario eliminado exitosamente');
        this.router.navigate(['/veterinarians']);
      },
      error: (err) => {
        console.error('Error al eliminar veterinario:', err);
        this.notificationService.error('Error al eliminar el veterinario');
        this.closeDeleteModal();
      }
    });
  }
}

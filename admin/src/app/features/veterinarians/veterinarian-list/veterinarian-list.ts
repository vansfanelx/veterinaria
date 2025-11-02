import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user';
import { User } from '../../../core/models/models';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal';
import { NotificationService } from '../../../core/services/notification';

@Component({
  selector: 'app-veterinarian-list',
  imports: [CommonModule, RouterModule, FormsModule, ConfirmModalComponent],
  templateUrl: './veterinarian-list.html',
  styleUrl: './veterinarian-list.scss',
})
export class VeterinarianList implements OnInit {
  veterinarians: User[] = [];
  filteredVeterinarians: User[] = [];
  loading = false;
  error: string | null = null;
  searchTerm = '';
  
  showDeleteModal = false;
  veterinarianToDelete: User | null = null;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadVeterinarians();
  }

  loadVeterinarians(): void {
    this.loading = true;
    this.error = null;
    
    this.userService.getAll('veterinarian').subscribe({
      next: (data) => {
        this.veterinarians = data;
        this.filterVeterinarians();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los veterinarios';
        this.loading = false;
        console.error(err);
      }
    });
  }

  filterVeterinarians(): void {
    let filtered = [...this.veterinarians];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(vet => 
        vet.name.toLowerCase().includes(term) ||
        vet.email.toLowerCase().includes(term) ||
        (vet.phone?.toLowerCase().includes(term) || false)
      );
    }

    this.filteredVeterinarians = filtered;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.filterVeterinarians();
  }

  openDeleteModal(veterinarian: User): void {
    this.showDeleteModal = true;
    this.veterinarianToDelete = veterinarian;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.veterinarianToDelete = null;
  }

  confirmDelete(): void {
    if (!this.veterinarianToDelete?.id) return;

    this.userService.delete(this.veterinarianToDelete.id).subscribe({
      next: () => {
        this.notificationService.success('Veterinario eliminado exitosamente');
        this.closeDeleteModal();
        this.loadVeterinarians();
      },
      error: (err) => {
        console.error('Error al eliminar veterinario:', err);
        this.notificationService.error('Error al eliminar el veterinario');
        this.closeDeleteModal();
      }
    });
  }
}

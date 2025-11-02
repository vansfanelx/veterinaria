import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user';
import { User } from '../../../core/models/models';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal';
import { NotificationService } from '../../../core/services/notification';

@Component({
  selector: 'app-client-list',
  imports: [CommonModule, RouterModule, FormsModule, ConfirmModalComponent],
  templateUrl: './client-list.html',
  styleUrl: './client-list.scss',
})
export class ClientList implements OnInit {
  clients: User[] = [];
  filteredClients: User[] = [];
  loading = false;
  error: string | null = null;
  searchTerm = '';
  
  showDeleteModal = false;
  clientToDelete: User | null = null;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.loading = true;
    this.error = null;
    
    this.userService.getAll('user').subscribe({
      next: (data) => {
        this.clients = data;
        this.filterClients();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los clientes';
        this.loading = false;
        console.error(err);
      }
    });
  }

  filterClients(): void {
    let filtered = [...this.clients];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(client => 
        client.name.toLowerCase().includes(term) ||
        client.email.toLowerCase().includes(term) ||
        (client.phone?.toLowerCase().includes(term) || false) ||
        (client.address?.toLowerCase().includes(term) || false)
      );
    }

    this.filteredClients = filtered;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.filterClients();
  }

  openDeleteModal(client: User): void {
    this.showDeleteModal = true;
    this.clientToDelete = client;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.clientToDelete = null;
  }

  confirmDelete(): void {
    if (!this.clientToDelete?.id) return;

    this.userService.delete(this.clientToDelete.id).subscribe({
      next: () => {
        this.notificationService.success('Cliente eliminado exitosamente');
        this.closeDeleteModal();
        this.loadClients();
      },
      error: (err) => {
        console.error('Error al eliminar cliente:', err);
        this.notificationService.error('Error al eliminar el cliente');
        this.closeDeleteModal();
      }
    });
  }
}

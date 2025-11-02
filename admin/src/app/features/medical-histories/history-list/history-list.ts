import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MedicalHistoryService } from '../../../core/services/medical-history';
import { PetService } from '../../../core/services/pet';
import { MedicalHistory } from '../../../core/models/models';
import { Pet } from '../../../core/models/models';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal';
import { NotificationService } from '../../../core/services/notification';

@Component({
  selector: 'app-history-list',
  imports: [CommonModule, RouterModule, FormsModule, ConfirmModalComponent],
  templateUrl: './history-list.html',
  styleUrl: './history-list.scss',
})
export class HistoryList implements OnInit {
  histories: MedicalHistory[] = [];
  filteredHistories: MedicalHistory[] = [];
  pets: Pet[] = [];
  loading = false;
  error: string | null = null;
  searchTerm = '';
  filterDate = '';
  filterVeterinarian = '';
  
  // Control del modal
  showDeleteModal = false;
  historyToDelete: MedicalHistory | null = null;

  constructor(
    private historyService: MedicalHistoryService,
    private petService: PetService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadPets();
    this.loadHistories();
  }

  loadPets(): void {
    this.petService.getAll().subscribe({
      next: (data) => {
        this.pets = data;
      },
      error: (err) => {
        console.error('Error loading pets', err);
      }
    });
  }

  loadHistories(): void {
    this.loading = true;
    this.error = null;
    
    this.historyService.getAll().subscribe({
      next: (data) => {
        this.histories = data;
        this.filterHistories();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el historial médico';
        this.loading = false;
        console.error(err);
      }
    });
  }

  filterHistories(): void {
    let filtered = [...this.histories];

    // Filtrar por fecha
    if (this.filterDate) {
      filtered = filtered.filter(history => {
        // Crear fecha local desde el string ISO para evitar problemas de zona horaria
        const date = new Date(history.visit_date);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const historyDate = `${year}-${month}-${day}`;
        return historyDate === this.filterDate;
      });
    }

    // Filtrar por veterinario
    if (this.filterVeterinarian) {
      filtered = filtered.filter(history => {
        const vetName = history.veterinarian?.name || '';
        return vetName.toLowerCase().includes(this.filterVeterinarian.toLowerCase());
      });
    }

    // Filtrar por término de búsqueda
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(history => 
        history.pet?.name.toLowerCase().includes(term) ||
        history.diagnosis.toLowerCase().includes(term) ||
        history.treatment.toLowerCase().includes(term) ||
        (history.veterinarian?.name.toLowerCase().includes(term) || false)
      );
    }

    this.filteredHistories = filtered;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.filterDate = '';
    this.filterVeterinarian = '';
    this.filterHistories();
  }

  openDeleteModal(history: MedicalHistory): void {
    this.showDeleteModal = true;
    this.historyToDelete = history;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.historyToDelete = null;
  }

  confirmDelete(): void {
    if (!this.historyToDelete?.id) return;

    this.historyService.delete(this.historyToDelete.id).subscribe({
      next: () => {
        this.notificationService.success('Registro del historial eliminado exitosamente');
        this.closeDeleteModal();
        this.loadHistories();
      },
      error: (err) => {
        console.error('Error al eliminar historial:', err);
        this.notificationService.error('Error al eliminar el registro');
        this.closeDeleteModal();
      }
    });
  }
}

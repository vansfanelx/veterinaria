import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PetService } from '../../../core/services/pet';
import { Pet } from '../../../core/models/models';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal';
import { NotificationService } from '../../../core/services/notification';

@Component({
  selector: 'app-pet-list',
  imports: [CommonModule, RouterModule, FormsModule, ConfirmModalComponent],
  templateUrl: './pet-list.html',
  styleUrl: './pet-list.scss',
})
export class PetList implements OnInit {
  pets: Pet[] = [];
  filteredPets: Pet[] = [];
  searchTerm: string = '';
  loading = false;
  error: string | null = null;
  
  // Control del modal
  showDeleteModal = false;
  petToDelete: Pet | null = null;

  constructor(
    private petService: PetService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets(): void {
    this.loading = true;
    this.error = null;
    this.petService.getAll().subscribe({
      next: (data) => {
        this.pets = data;
        this.filteredPets = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las mascotas';
        this.loading = false;
        console.error(err);
      }
    });
  }

  filterPets(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredPets = this.pets;
    } else {
      this.filteredPets = this.pets.filter(pet => 
        pet.name.toLowerCase().includes(term) ||
        pet.species.toLowerCase().includes(term) ||
        (pet.breed?.toLowerCase().includes(term) || false) ||
        (pet.owner?.name.toLowerCase().includes(term) || false)
      );
    }
  }

  /**
   * Abre el modal de confirmación para eliminar una mascota
   */
  openDeleteModal(pet: Pet): void {
    this.petToDelete = pet;
    this.showDeleteModal = true;
  }

  /**
   * Cierra el modal de confirmación
   */
  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.petToDelete = null;
  }

  /**
   * Confirma y ejecuta la eliminación de la mascota
   */
  confirmDelete(): void {
    if (!this.petToDelete?.id) return;

    this.petService.delete(this.petToDelete.id).subscribe({
      next: () => {
        this.notificationService.success(`Mascota "${this.petToDelete!.name}" eliminada exitosamente`);
        this.closeDeleteModal();
        this.loadPets();
      },
      error: (err) => {
        console.error('Error al eliminar mascota:', err);
        this.notificationService.error('Error al eliminar la mascota');
        this.closeDeleteModal();
      }
    });
  }
}

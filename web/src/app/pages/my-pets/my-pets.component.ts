import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WebService } from '../../core/services/web.service';
import { NotificationService } from '../../core/services/notification.service';
import { Pet, MedicalHistory } from '../../core/models/models';

interface PetView extends Pet {
  weight?: number;
  photo_url?: string;
  medical_history?: MedicalHistoryView[];
}

interface MedicalHistoryView {
  id: number;
  date: string;
  diagnosis: string;
  treatment: string;
  veterinarian: string;
  observations?: string;
}

@Component({
  selector: 'app-my-pets',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-pets.component.html',
  styleUrl: './my-pets.component.scss'
})
export class MyPetsComponent implements OnInit {
  private webService = inject(WebService);
  private notificationService = inject(NotificationService);
  
  pets: PetView[] = [];
  selectedPet: PetView | null = null;
  isLoading = true;
  showHistory = false;

  ngOnInit() {
    this.loadPets();
  }

  loadPets() {
    this.isLoading = true;
    this.webService.getMyPets().subscribe({
      next: (pets) => {
        // Convertir Pet[] a PetView[]
        this.pets = pets.map(pet => ({
          ...pet,
          weight: 0, // Valor por defecto si no existe
          photo_url: undefined,
          medical_history: []
        }));
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.notificationService.show('Error al cargar las mascotas', 'error');
      }
    });
  }

  viewHistory(pet: PetView) {
    this.selectedPet = pet;
    this.showHistory = true;
    
    if (!pet.medical_history || pet.medical_history.length === 0) {
      this.webService.getPetMedicalHistory(pet.id).subscribe({
        next: (response) => {
          if (this.selectedPet) {
            // Convertir MedicalHistory[] a MedicalHistoryView[]
            this.selectedPet.medical_history = response.medical_histories.map(history => ({
              id: history.id,
              date: history.visit_date,
              diagnosis: history.diagnosis,
              treatment: history.treatment,
              veterinarian: history.veterinarian?.name || 'N/A',
              observations: history.notes
            }));
          }
        },
        error: () => {
          this.notificationService.show('Error al cargar el historial médico', 'error');
        }
      });
    }
  }

  closeHistory() {
    this.showHistory = false;
    this.selectedPet = null;
  }

  getAge(birthDate: string): string {
    const today = new Date();
    const birth = new Date(birthDate);
    const years = today.getFullYear() - birth.getFullYear();
    const months = today.getMonth() - birth.getMonth();
    
    if (years > 0) {
      return `${years} ${years === 1 ? 'año' : 'años'}`;
    } else {
      return `${months} ${months === 1 ? 'mes' : 'meses'}`;
    }
  }
}

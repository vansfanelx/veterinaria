import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MedicalHistoryService } from '../../../core/services/medical-history';
import { PetService } from '../../../core/services/pet';
import { MedicalHistory } from '../../../core/models/models';
import { Pet } from '../../../core/models/models';
import { NotificationService } from '../../../core/services/notification';

@Component({
  selector: 'app-history-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './history-form.html',
  styleUrl: './history-form.scss',
})
export class HistoryForm implements OnInit {
  historyForm: FormGroup;
  isEditMode = false;
  historyId: number | null = null;
  loading = false;
  error: string | null = null;
  pets: Pet[] = [];
  filteredPets: Pet[] = [];
  selectedPet: Pet | null = null;
  petSearchTerm: string = '';
  showPetDropdown = false;

  constructor(
    private fb: FormBuilder,
    private historyService: MedicalHistoryService,
    private petService: PetService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.historyForm = this.fb.group({
      pet_id: ['', Validators.required],
      visit_date: ['', Validators.required],
      diagnosis: ['', Validators.required],
      symptoms: [''],
      treatment: ['', Validators.required],
      prescriptions: [''],
      weight: [''],
      temperature: [''],
      notes: [''],
      veterinarian_id: [1, Validators.required] // Por defecto 1
    });
  }

  ngOnInit(): void {
    // Obtener pet_id de los query params si existe
    const petIdParam = this.route.snapshot.queryParams['pet_id'];
    
    this.historyId = this.route.snapshot.params['id'];
    if (this.historyId) {
      this.isEditMode = true;
      this.loadPets();
      this.loadHistory(this.historyId);
    } else {
      // Establecer fecha actual por defecto
      const today = new Date().toISOString().split('T')[0];
      this.historyForm.patchValue({ visit_date: today });
      
      // Cargar mascotas y pre-seleccionar si viene del query param
      this.loadPets(petIdParam ? Number(petIdParam) : null);
    }
  }

  loadPets(preSelectPetId?: number | null): void {
    this.petService.getAll().subscribe({
      next: (data) => {
        this.pets = data;
        this.filteredPets = data;
        
        // Pre-seleccionar mascota si se proporcionó un ID
        if (preSelectPetId) {
          const pet = this.pets.find(p => p.id === preSelectPetId);
          if (pet) {
            this.selectPet(pet);
          }
        }
      },
      error: (err) => {
        console.error('Error loading pets', err);
      }
    });
  }

  // Método para filtrar mascotas basado en el término de búsqueda
  ngOnChanges(): void {
    this.filterPets();
  }

  // Escuchar cambios en el campo de búsqueda
  ngDoCheck(): void {
    this.filterPets();
  }

  // Filtrar lista de mascotas por nombre o especie
  filterPets(): void {
    const term = this.petSearchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredPets = this.pets;
    } else {
      this.filteredPets = this.pets.filter(pet => 
        pet.name.toLowerCase().includes(term) || 
        pet.species.toLowerCase().includes(term) ||
        (pet.owner?.name.toLowerCase().includes(term) || false)
      );
    }
  }

  // Seleccionar una mascota de la lista
  selectPet(pet: Pet): void {
    this.selectedPet = pet;
    this.petSearchTerm = `${pet.name} - ${pet.species}`;
    this.historyForm.patchValue({ pet_id: pet.id });
    this.showPetDropdown = false;
  }

  // Limpiar selección de mascota
  clearPetSelection(): void {
    this.selectedPet = null;
    this.petSearchTerm = '';
    this.historyForm.patchValue({ pet_id: '' });
    this.showPetDropdown = true;
  }

  // Cerrar dropdown al hacer click fuera
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.form-group')) {
      this.showPetDropdown = false;
    }
  }

  loadHistory(id: number): void {
    this.loading = true;
    this.historyService.getById(id).subscribe({
      next: (history) => {
        // Convertir la fecha al formato YYYY-MM-DD para el input tipo date
        const visitDate = history.visit_date ? new Date(history.visit_date).toISOString().split('T')[0] : '';
        
        this.historyForm.patchValue({
          ...history,
          visit_date: visitDate
        });
        
        // Establecer mascota seleccionada si existe
        if (history.pet) {
          this.selectedPet = history.pet;
          this.petSearchTerm = `${history.pet.name} - ${history.pet.species}`;
        }
        
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el historial';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.historyForm.invalid) {
      return;
    }

    this.loading = true;
    const historyData: MedicalHistory = this.historyForm.value;

    const request = this.isEditMode && this.historyId
      ? this.historyService.update(this.historyId, historyData)
      : this.historyService.create(historyData);

    request.subscribe({
      next: () => {
        const message = this.isEditMode 
          ? 'Historial médico actualizado exitosamente'
          : 'Historial médico creado exitosamente';
        this.notificationService.success(message);
        this.router.navigate(['/medical-histories']);
      },
      error: (err) => {
        this.error = 'Error al guardar el historial';
        this.notificationService.error(this.error);
        this.loading = false;
        console.error(err);
      }
    });
  }
}

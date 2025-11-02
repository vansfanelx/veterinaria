<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\Pet;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class AppointmentSeeder extends Seeder
{
    /**
     * Poblar la base de datos con citas de prueba
     */
    public function run(): void
    {
        $pets = Pet::with('owner')->get();
        $veterinarians = User::where('role', 'veterinarian')->get();

        if ($pets->isEmpty()) {
            $this->command->warn('⚠ No hay mascotas disponibles. Ejecuta PetSeeder primero.');
            return;
        }

        if ($veterinarians->isEmpty()) {
            $this->command->warn('⚠ No hay veterinarios disponibles. Ejecuta AdminUserSeeder primero.');
            return;
        }

        // CITAS PASADAS (completadas)
        
        // Max - Vacunación (hace 2 meses)
        $max = $pets->where('name', 'Max')->first();
        if ($max) {
            Appointment::create([
                'pet_id' => $max->id,
                'user_id' => $max->owner_id,
                'veterinarian_id' => $veterinarians->random()->id,
                'date' => Carbon::now()->subMonths(2)->format('Y-m-d'),
                'time' => '10:00',
                'reason' => 'Vacunación anual',
                'notes' => 'Traer cartilla de vacunación',
                'status' => 'completed',
            ]);

            // Max - Chequeo general (hace 1 mes)
            Appointment::create([
                'pet_id' => $max->id,
                'user_id' => $max->owner_id,
                'veterinarian_id' => $veterinarians->random()->id,
                'date' => Carbon::now()->subMonth()->format('Y-m-d'),
                'time' => '14:30',
                'reason' => 'Chequeo general',
                'notes' => 'Revisión de vacunas',
                'status' => 'completed',
            ]);
        }

        // Rocky - Problema respiratorio (hace 3 semanas)
        $rocky = $pets->where('name', 'Rocky')->first();
        if ($rocky) {
            Appointment::create([
                'pet_id' => $rocky->id,
                'user_id' => $rocky->owner_id,
                'veterinarian_id' => $veterinarians->random()->id,
                'date' => Carbon::now()->subWeeks(3)->format('Y-m-d'),
                'time' => '11:00',
                'reason' => 'Dificultad respiratoria',
                'notes' => 'Jadeo excesivo en clima cálido',
                'status' => 'completed',
            ]);
        }

        // Thor - Dolor de cadera (hace 1 semana)
        $thor = $pets->where('name', 'Thor')->first();
        if ($thor) {
            Appointment::create([
                'pet_id' => $thor->id,
                'user_id' => $thor->owner_id,
                'veterinarian_id' => $veterinarians->random()->id,
                'date' => Carbon::now()->subWeek()->format('Y-m-d'),
                'time' => '09:00',
                'reason' => 'Revisión de displasia de cadera',
                'notes' => 'Cojea al levantarse',
                'status' => 'completed',
            ]);
        }

        // CITAS RECIENTES (esta semana - confirmadas)
        
        // Luna - Consulta de rutina (ayer)
        $luna = $pets->where('name', 'Luna')->first();
        if ($luna) {
            Appointment::create([
                'pet_id' => $luna->id,
                'user_id' => $luna->owner_id,
                'veterinarian_id' => $veterinarians->random()->id,
                'date' => Carbon::yesterday()->format('Y-m-d'),
                'time' => '15:00',
                'reason' => 'Consulta de rutina',
                'notes' => 'Chequeo semestral',
                'status' => 'confirmed',
            ]);
        }

        // Michi - Limpieza dental (hoy)
        $michi = $pets->where('name', 'Michi')->first();
        if ($michi) {
            Appointment::create([
                'pet_id' => $michi->id,
                'user_id' => $michi->owner_id,
                'veterinarian_id' => $veterinarians->random()->id,
                'date' => Carbon::today()->format('Y-m-d'),
                'time' => '10:30',
                'reason' => 'Limpieza dental',
                'notes' => 'Ayuno de 8 horas',
                'status' => 'confirmed',
            ]);
        }

        // CITAS PRÓXIMAS (próximos días - confirmadas)
        
        // Coco - Primera consulta (mañana)
        $coco = $pets->where('name', 'Coco')->first();
        if ($coco) {
            Appointment::create([
                'pet_id' => $coco->id,
                'user_id' => $coco->owner_id,
                'veterinarian_id' => $veterinarians->random()->id,
                'date' => Carbon::tomorrow()->format('Y-m-d'),
                'time' => '11:00',
                'reason' => 'Primera consulta',
                'notes' => 'Revisión general y vacunas',
                'status' => 'confirmed',
            ]);
        }

        // Nina - Corte de uñas (en 3 días)
        $nina = $pets->where('name', 'Nina')->first();
        if ($nina) {
            Appointment::create([
                'pet_id' => $nina->id,
                'user_id' => $nina->owner_id,
                'veterinarian_id' => $veterinarians->random()->id,
                'date' => Carbon::now()->addDays(3)->format('Y-m-d'),
                'time' => '16:00',
                'reason' => 'Corte de uñas y estética',
                'notes' => 'Gata de pelo largo',
                'status' => 'confirmed',
            ]);
        }

        // Max - Vacunación (en 5 días)
        if ($max) {
            Appointment::create([
                'pet_id' => $max->id,
                'user_id' => $max->owner_id,
                'veterinarian_id' => $veterinarians->random()->id,
                'date' => Carbon::now()->addDays(5)->format('Y-m-d'),
                'time' => '09:30',
                'reason' => 'Refuerzo de vacunas',
                'notes' => 'Llevar cartilla',
                'status' => 'confirmed',
            ]);
        }

        // CITAS PENDIENTES (requieren confirmación)
        
        // Rocky - Chequeo (en 1 semana)
        if ($rocky) {
            Appointment::create([
                'pet_id' => $rocky->id,
                'user_id' => $rocky->owner_id,
                'veterinarian_id' => $veterinarians->random()->id,
                'date' => Carbon::now()->addWeek()->format('Y-m-d'),
                'time' => '14:00',
                'reason' => 'Seguimiento respiratorio',
                'notes' => 'Control post-tratamiento',
                'status' => 'pending',
            ]);
        }

        // Thor - Radiografías (en 10 días)
        if ($thor) {
            Appointment::create([
                'pet_id' => $thor->id,
                'user_id' => $thor->owner_id,
                'veterinarian_id' => $veterinarians->random()->id,
                'date' => Carbon::now()->addDays(10)->format('Y-m-d'),
                'time' => '08:00',
                'reason' => 'Radiografías de cadera',
                'notes' => 'Ayuno de 12 horas. Estudio con sedación.',
                'status' => 'pending',
            ]);
        }

        // CITA CANCELADA
        if ($luna) {
            Appointment::create([
                'pet_id' => $luna->id,
                'user_id' => $luna->owner_id,
                'veterinarian_id' => $veterinarians->random()->id,
                'date' => Carbon::now()->addDays(7)->format('Y-m-d'),
                'time' => '13:00',
                'reason' => 'Desparasitación',
                'notes' => 'Cliente cancela por viaje',
                'status' => 'cancelled',
            ]);
        }

        $appointmentCount = Appointment::count();
        $this->command->info("✓ {$appointmentCount} citas creadas exitosamente");
    }
}

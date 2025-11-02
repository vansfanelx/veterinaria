<?php

namespace Database\Seeders;

use App\Models\MedicalHistory;
use App\Models\Appointment;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class MedicalHistorySeeder extends Seeder
{
    /**
     * Poblar la base de datos con historiales médicos
     */
    public function run(): void
    {
        $completedAppointments = Appointment::where('status', 'completed')
            ->with('pet')
            ->get();
        
        $veterinarians = User::where('role', 'veterinarian')->get();

        if ($completedAppointments->isEmpty()) {
            $this->command->warn('⚠ No hay citas completadas. Ejecuta AppointmentSeeder primero.');
            return;
        }

        foreach ($completedAppointments as $appointment) {
            $historyData = $this->getHistoryDataByReason(
                $appointment->reason,
                $appointment->pet
            );

            MedicalHistory::create([
                'pet_id' => $appointment->pet_id,
                'appointment_id' => $appointment->id,
                'visit_date' => $appointment->date,
                'diagnosis' => $historyData['diagnosis'],
                'symptoms' => $historyData['symptoms'],
                'treatment' => $historyData['treatment'],
                'prescriptions' => $historyData['prescriptions'],
                'weight' => $appointment->pet->weight,
                'temperature' => $historyData['temperature'],
                'notes' => $historyData['notes'],
                'veterinarian_id' => $appointment->veterinarian_id ?? $veterinarians->random()->id,
            ]);
        }

        $historyCount = MedicalHistory::count();
        $this->command->info("✓ {$historyCount} historiales médicos creados exitosamente");
    }

    /**
     * Generar datos del historial según el motivo de la cita
     */
    private function getHistoryDataByReason(string $reason, $pet): array
    {
        $baseTemp = match($pet->species) {
            'Perro' => 38.5,
            'Gato' => 38.8,
            'Conejo' => 39.0,
            default => 38.5,
        };

        // Datos según el tipo de consulta
        if (str_contains(strtolower($reason), 'vacuna')) {
            return [
                'diagnosis' => 'Vacunación preventiva completada',
                'symptoms' => 'Ninguno - Visita preventiva',
                'treatment' => 'Aplicación de vacuna múltiple y antirrábica',
                'prescriptions' => 'Reposo por 24 horas. Vigilar zona de aplicación.',
                'temperature' => $baseTemp,
                'notes' => 'Paciente en excelente estado de salud. Próxima vacunación en 1 año.',
            ];
        }

        if (str_contains(strtolower($reason), 'respiratorio') || str_contains(strtolower($reason), 'dificultad')) {
            return [
                'diagnosis' => 'Síndrome braquicefálico leve',
                'symptoms' => 'Jadeo excesivo, ronquidos, intolerancia al ejercicio',
                'treatment' => 'Control de peso, evitar temperaturas altas, ejercicio moderado',
                'prescriptions' => 'Antiinflamatorio (Carprofeno) 2mg/kg cada 12h por 5 días',
                'temperature' => $baseTemp + 0.3,
                'notes' => 'Recomendar aire acondicionado en verano. Seguimiento en 3 semanas.',
            ];
        }

        if (str_contains(strtolower($reason), 'displasia') || str_contains(strtolower($reason), 'cadera')) {
            return [
                'diagnosis' => 'Displasia de cadera grado II - Artrosis leve',
                'symptoms' => 'Cojera matutina, dificultad para levantarse, rigidez',
                'treatment' => 'Condroprotectores, fisioterapia, control de peso',
                'prescriptions' => 'Glucosamina + Condroitina 500mg cada 24h. Tramadol 3mg/kg si hay dolor.',
                'temperature' => $baseTemp,
                'notes' => 'Recomendar natación como ejercicio. Evitar escaleras. Radiografías de control en 3 meses.',
            ];
        }

        if (str_contains(strtolower($reason), 'chequeo') || str_contains(strtolower($reason), 'rutina')) {
            return [
                'diagnosis' => 'Estado de salud óptimo',
                'symptoms' => 'Ninguno - Chequeo preventivo',
                'treatment' => 'Desparasitación interna y externa',
                'prescriptions' => 'Comprimido antiparasitario (Drontal Plus) dosis única. Pipeta antipulgas aplicada.',
                'temperature' => $baseTemp,
                'notes' => 'Análisis de sangre normales. Próximo chequeo en 6 meses.',
            ];
        }

        if (str_contains(strtolower($reason), 'dental') || str_contains(strtolower($reason), 'limpieza')) {
            return [
                'diagnosis' => 'Gingivitis leve - Sarro moderado',
                'symptoms' => 'Mal aliento, encías inflamadas',
                'treatment' => 'Limpieza dental con ultrasonido bajo anestesia general',
                'prescriptions' => 'Antibiótico (Amoxicilina) 20mg/kg cada 12h por 7 días. Gel dental enzimático diario.',
                'temperature' => $baseTemp,
                'notes' => 'Procedimiento sin complicaciones. Recomendar cepillado dental 3 veces por semana.',
            ];
        }

        // Consulta genérica
        return [
            'diagnosis' => 'Evaluación general satisfactoria',
            'symptoms' => 'Consulta de seguimiento',
            'treatment' => 'Observación y cuidados habituales',
            'prescriptions' => 'Continuar con alimentación balanceada y ejercicio regular',
            'temperature' => $baseTemp,
            'notes' => 'Paciente en buen estado general. Sin hallazgos significativos.',
        ];
    }
}

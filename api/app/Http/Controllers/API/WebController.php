<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Pet;
use App\Models\MedicalHistory;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

/**
 * Controlador para el frontend web público
 * Endpoints para clientes que solicitan citas y consultan información
 */
class WebController extends Controller
{
    /**
     * Obtener fechas y horarios disponibles para citas
     * 
     * GET /api/web/available-slots
     * 
     * Parámetros query:
     * - date: fecha en formato Y-m-d (opcional, por defecto próximos 30 días)
     * - veterinarian_id: filtrar por veterinario específico (opcional)
     */
    public function getAvailableSlots(Request $request)
    {
        $startDate = $request->input('date', Carbon::now()->format('Y-m-d'));
        $veterinarianId = $request->input('veterinarian_id');
        
        // Obtener próximos 30 días desde la fecha especificada
        $endDate = Carbon::parse($startDate)->addDays(30);
        
        // Horarios de atención: 9:00 AM - 6:00 PM, cada 30 minutos
        $workingHours = [
            '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
            '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
            '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
        ];
        
        // Obtener citas existentes en el rango de fechas
        $existingAppointments = Appointment::whereBetween('date', [$startDate, $endDate])
            ->when($veterinarianId, function ($query) use ($veterinarianId) {
                return $query->where('veterinarian_id', $veterinarianId);
            })
            ->get()
            ->groupBy('date')
            ->map(function ($appointments) {
                return $appointments->pluck('time')->toArray();
            });
        
        // Generar slots disponibles
        $availableSlots = [];
        $currentDate = Carbon::parse($startDate);
        
        while ($currentDate <= $endDate) {
            $dateStr = $currentDate->format('Y-m-d');
            
            // No incluir domingos ni fechas pasadas
            if ($currentDate->dayOfWeek !== 0 && $currentDate >= Carbon::now()->startOfDay()) {
                $bookedTimes = $existingAppointments->get($dateStr, []);
                $availableTimes = array_values(array_diff($workingHours, $bookedTimes));
                
                if (!empty($availableTimes)) {
                    $availableSlots[] = [
                        'date' => $dateStr,
                        'day_name' => $currentDate->locale('es')->isoFormat('dddd'),
                        'slots' => $availableTimes,
                        'slots_count' => count($availableTimes)
                    ];
                }
            }
            
            $currentDate->addDay();
        }
        
        return response()->json($availableSlots);
    }

    /**
     * Obtener lista de veterinarios disponibles
     * 
     * GET /api/web/veterinarians
     */
    public function getVeterinarians()
    {
        $veterinarians = User::where('role', 'veterinarian')
            ->select('id', 'name', 'email', 'phone', 'address')
            ->get()
            ->map(function ($vet) {
                return [
                    'id' => $vet->id,
                    'name' => $vet->name,
                    'specialty' => $vet->address, // Campo address usado como especialidad
                    'email' => $vet->email,
                    'phone' => $vet->phone,
                ];
            });

        return response()->json($veterinarians);
    }

    /**
     * Solicitar una cita (requiere autenticación)
     * 
     * POST /api/web/appointments
     */
    public function requestAppointment(Request $request)
    {
        $validated = $request->validate([
            'pet_id' => 'required|exists:pets,id',
            'veterinarian_id' => 'required|exists:users,id',
            'date' => 'required|date|after_or_equal:today',
            'time' => 'required|date_format:H:i',
            'reason' => 'required|string|max:500',
        ]);

        // Verificar que el usuario es el dueño de la mascota
        $pet = Pet::findOrFail($validated['pet_id']);
        if ($pet->owner_id !== $request->user()->id) {
            return response()->json([
                'message' => 'No tienes permiso para agendar citas para esta mascota.'
            ], 403);
        }

        // Verificar que el veterinario existe y tiene el rol correcto
        $veterinarian = User::findOrFail($validated['veterinarian_id']);
        if ($veterinarian->role !== 'veterinarian') {
            return response()->json([
                'message' => 'El usuario seleccionado no es un veterinario.'
            ], 400);
        }

        // Verificar que el slot esté disponible
        $existingAppointment = Appointment::where('date', $validated['date'])
            ->where('time', $validated['time'])
            ->where('veterinarian_id', $validated['veterinarian_id'])
            ->exists();

        if ($existingAppointment) {
            return response()->json([
                'message' => 'El horario seleccionado ya no está disponible.'
            ], 400);
        }

        $appointment = Appointment::create([
            'pet_id' => $validated['pet_id'],
            'user_id' => $request->user()->id,
            'veterinarian_id' => $validated['veterinarian_id'],
            'date' => $validated['date'],
            'time' => $validated['time'],
            'reason' => $validated['reason'],
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Cita solicitada exitosamente.',
            'appointment' => $appointment->load(['pet', 'user', 'veterinarian'])
        ], 201);
    }

    /**
     * Obtener mascotas del usuario autenticado
     * 
     * GET /api/web/my-pets
     */
    public function getMyPets(Request $request)
    {
        $pets = $request->user()
            ->pets()
            ->with(['appointments' => function ($query) {
                $query->orderBy('date', 'desc')->limit(5);
            }])
            ->get();

        return response()->json($pets);
    }

    /**
     * Obtener historial médico de una mascota (solo si es dueño)
     * 
     * GET /api/web/pets/{petId}/medical-history
     */
    public function getPetMedicalHistory(Request $request, $petId)
    {
        $pet = Pet::findOrFail($petId);

        // Verificar que el usuario es el dueño
        if ($pet->owner_id !== $request->user()->id) {
            return response()->json([
                'message' => 'No tienes permiso para ver el historial de esta mascota.'
            ], 403);
        }

        $medicalHistories = MedicalHistory::where('pet_id', $petId)
            ->with(['veterinarian:id,name', 'pet:id,name,species'])
            ->orderBy('visit_date', 'desc')
            ->get();

        return response()->json([
            'pet' => $pet,
            'medical_histories' => $medicalHistories
        ]);
    }

    /**
     * Obtener citas del usuario autenticado
     * 
     * GET /api/web/my-appointments
     */
    public function getMyAppointments(Request $request)
    {
        $status = $request->input('status');
        
        $appointments = Appointment::where('user_id', $request->user()->id)
            ->when($status, function ($query) use ($status) {
                return $query->where('status', $status);
            })
            ->with(['pet', 'veterinarian'])
            ->orderBy('date', 'desc')
            ->orderBy('time', 'desc')
            ->get();

        return response()->json($appointments);
    }

    /**
     * Cancelar una cita (solo si es el dueño y está pendiente)
     * 
     * DELETE /api/web/appointments/{id}
     */
    public function cancelAppointment(Request $request, $id)
    {
        $appointment = Appointment::findOrFail($id);

        // Verificar que es el dueño de la cita
        if ($appointment->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'No tienes permiso para cancelar esta cita.'
            ], 403);
        }

        // Solo permitir cancelar citas pendientes
        if ($appointment->status !== 'pending') {
            return response()->json([
                'message' => 'Solo puedes cancelar citas pendientes.'
            ], 400);
        }

        // Verificar que la cita no sea en menos de 24 horas
        $appointmentDateTime = Carbon::parse($appointment->date . ' ' . $appointment->time);
        if ($appointmentDateTime->diffInHours(Carbon::now()) < 24) {
            return response()->json([
                'message' => 'No puedes cancelar citas con menos de 24 horas de anticipación.'
            ], 400);
        }

        $appointment->update(['status' => 'cancelled']);

        return response()->json([
            'message' => 'Cita cancelada exitosamente.'
        ]);
    }
}

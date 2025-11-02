<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Appointment::with(['pet', 'user', 'veterinarian']);
        
        // Filtrar por fecha si se proporciona
        if ($request->has('date')) {
            $query->whereDate('date', $request->date);
        }
        
        // Filtrar por estado si se proporciona
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        // Filtrar por mascota si se proporciona
        if ($request->has('pet_id')) {
            $query->where('pet_id', $request->pet_id);
        }
        
        $appointments = $query->orderBy('date', 'desc')->orderBy('time', 'desc')->get();
        
        return response()->json($appointments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'pet_id' => 'required|exists:pets,id',
            'user_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'time' => 'required',
            'reason' => 'required|string|max:500',
            'notes' => 'nullable|string',
            'status' => 'in:pending,confirmed,completed,cancelled',
            'veterinarian_id' => 'nullable|exists:users,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $appointment = Appointment::create($request->all());
        $appointment->load(['pet', 'user', 'veterinarian']);

        return response()->json($appointment, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $appointment = Appointment::with(['pet', 'user', 'veterinarian'])->findOrFail($id);
        return response()->json($appointment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $appointment = Appointment::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'pet_id' => 'exists:pets,id',
            'user_id' => 'exists:users,id',
            'date' => 'date',
            'time' => 'string',
            'reason' => 'string|max:500',
            'notes' => 'nullable|string',
            'status' => 'in:pending,confirmed,completed,cancelled',
            'veterinarian_id' => 'nullable|exists:users,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $appointment->update($request->all());
        $appointment->load(['pet', 'user', 'veterinarian']);

        return response()->json($appointment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->delete();

        return response()->json(['message' => 'Cita eliminada exitosamente']);
    }
}

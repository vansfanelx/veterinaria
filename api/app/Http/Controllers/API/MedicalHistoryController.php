<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\MedicalHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MedicalHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = MedicalHistory::with(['pet.owner', 'appointment', 'veterinarian']);
        
        if ($request->has('pet_id')) {
            $query->where('pet_id', $request->pet_id);
        }
        
        $histories = $query->orderBy('visit_date', 'desc')->get();
        
        return response()->json($histories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'pet_id' => 'required|exists:pets,id',
            'appointment_id' => 'nullable|exists:appointments,id',
            'visit_date' => 'required|date',
            'diagnosis' => 'required|string',
            'symptoms' => 'nullable|string',
            'treatment' => 'required|string',
            'prescriptions' => 'nullable|string',
            'weight' => 'nullable|numeric',
            'temperature' => 'nullable|numeric',
            'notes' => 'nullable|string',
            'veterinarian_id' => 'required|exists:users,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $history = MedicalHistory::create($request->all());
        $history->load(['pet', 'veterinarian']);

        return response()->json($history, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $history = MedicalHistory::with(['pet.owner', 'appointment', 'veterinarian'])->findOrFail($id);
        return response()->json($history);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $history = MedicalHistory::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'pet_id' => 'exists:pets,id',
            'appointment_id' => 'nullable|exists:appointments,id',
            'visit_date' => 'date',
            'diagnosis' => 'string',
            'symptoms' => 'nullable|string',
            'treatment' => 'string',
            'prescriptions' => 'nullable|string',
            'weight' => 'nullable|numeric',
            'temperature' => 'nullable|numeric',
            'notes' => 'nullable|string',
            'veterinarian_id' => 'exists:users,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $history->update($request->all());
        $history->load(['pet', 'veterinarian']);

        return response()->json($history);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $history = MedicalHistory::findOrFail($id);
        $history->delete();

        return response()->json(['message' => 'Historial eliminado exitosamente']);
    }
}

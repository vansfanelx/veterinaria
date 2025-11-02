<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Pet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Pet::with(['owner', 'appointments', 'medicalHistories']);
        
        // Filtrar por dueño si se proporciona
        if ($request->has('owner_id')) {
            $query->where('owner_id', $request->owner_id);
        }
        
        $pets = $query->orderBy('created_at', 'desc')->get();
        
        return response()->json($pets);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'species' => 'required|string|max:100',
            'breed' => 'nullable|string|max:100',
            'birth_date' => 'nullable|date',
            'gender' => 'nullable|in:male,female',
            'color' => 'nullable|string|max:100',
            'weight' => 'nullable|numeric',
            'owner_id' => 'required|exists:users,id',
            'notes' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $pet = Pet::create($request->all());
        $pet->load('owner');

        return response()->json($pet, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $pet = Pet::with(['owner', 'appointments', 'medicalHistories'])->findOrFail($id);
        return response()->json($pet);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $pet = Pet::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'species' => 'string|max:100',
            'breed' => 'nullable|string|max:100',
            'birth_date' => 'nullable|date',
            'gender' => 'nullable|in:male,female',
            'color' => 'nullable|string|max:100',
            'weight' => 'nullable|numeric',
            'owner_id' => 'exists:users,id',
            'notes' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $pet->update($request->all());
        $pet->load('owner');

        return response()->json($pet);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $pet = Pet::findOrFail($id);
        $pet->delete();

        return response()->json(['message' => 'Mascota eliminada exitosamente']);
    }
}

<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class VeterinarianController extends Controller
{
    /**
     * Display a listing of veterinarians.
     */
    public function index()
    {
        $veterinarians = User::where('role', 'veterinarian')->get();
        return response()->json($veterinarians);
    }

    /**
     * Display the specified veterinarian.
     */
    public function show(string $id)
    {
        $veterinarian = User::where('role', 'veterinarian')->findOrFail($id);
        return response()->json($veterinarian);
    }
}

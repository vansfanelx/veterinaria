<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of users
     */
    public function index(Request $request)
    {
        $query = User::with('pets');

        // Filtrar por rol si se proporciona
        if ($request->has('role')) {
            $query->where('role', $request->role);
        }

        $users = $query->get();

        return response()->json($users);
    }

    /**
     * Store a newly created user
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'role' => 'nullable|in:admin,veterinarian,user',
            'password' => 'nullable|string|min:8',
        ]);

        // Si no se proporciona password, generar uno por defecto
        if (!isset($validated['password'])) {
            $validated['password'] = Hash::make('password123');
        } else {
            $validated['password'] = Hash::make($validated['password']);
        }

        // Si no se proporciona rol, asignar 'user' por defecto
        if (!isset($validated['role'])) {
            $validated['role'] = 'user';
        }

        $user = User::create($validated);

        return response()->json($user->load('pets'), 201);
    }

    /**
     * Display the specified user
     */
    public function show($id)
    {
        $user = User::with('pets')->findOrFail($id);

        return response()->json($user);
    }

    /**
     * Update the specified user
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => ['sometimes', 'required', 'email', Rule::unique('users')->ignore($user->id)],
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'role' => 'sometimes|in:admin,veterinarian,user',
            'password' => 'nullable|string|min:8',
        ]);

        // Si se proporciona password, hashearlo
        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return response()->json($user->load('pets'));
    }

    /**
     * Remove the specified user
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        
        // Eliminar el usuario (las mascotas se eliminarán en cascada si está configurado)
        $user->delete();

        return response()->json(['message' => 'Usuario eliminado exitosamente']);
    }

    /**
     * Update user password
     */
    public function updatePassword(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Verificar que la contraseña actual sea correcta
        if (!Hash::check($validated['current_password'], $user->password)) {
            return response()->json([
                'message' => 'La contraseña actual no es correcta'
            ], 422);
        }

        // Actualizar la contraseña
        $user->update([
            'password' => Hash::make($validated['password'])
        ]);

        return response()->json([
            'message' => 'Contraseña actualizada exitosamente'
        ]);
    }
}

<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;

/**
 * Controlador de Autenticación
 * 
 * Maneja el registro, login y logout de usuarios
 * Utiliza Laravel Sanctum para generar tokens de acceso
 */
class AuthController extends Controller
{
    /**
     * Registrar un nuevo usuario
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * 
     * Body esperado:
     * - name: string (requerido)
     * - email: string (requerido, único)
     * - password: string (requerido, mínimo 8 caracteres)
     * - password_confirmation: string (requerido, debe coincidir)
     * - role: string (opcional: admin, veterinarian, user)
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'role' => 'nullable|in:admin,veterinarian,user',
            'captcha_token' => 'required|string',
        ]);

        // Verificar CAPTCHA propio
        if (!CaptchaController::verifyToken($request->captcha_token)) {
            throw ValidationException::withMessages([
                'captcha' => ['Verificación de CAPTCHA inválida o expirada. Por favor, completa el CAPTCHA nuevamente.'],
            ]);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'address' => $request->address,
            'role' => $request->role ?? 'user',
        ]);

        // Disparar evento de registro para enviar email de verificación
        event(new Registered($user));

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
            'token_type' => 'Bearer',
            'message' => 'Registro exitoso. Por favor, verifica tu correo electrónico.',
        ], 201);
    }

    /**
     * Iniciar sesión
     * 
     * Autentica al usuario y genera un token de acceso
     * Elimina tokens anteriores antes de crear uno nuevo
     * Verifica opcionalmente que el usuario tenga el rol requerido
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws ValidationException Si las credenciales son incorrectas
     * 
     * Body esperado:
     * - email: string (requerido)
     * - password: string (requerido)
     * - required_role: string (opcional: admin, veterinarian, user)
     * 
     * Respuesta exitosa:
     * - user: objeto con datos del usuario
     * - token: token de acceso Bearer
     * - token_type: "Bearer"
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'required_role' => 'nullable|in:admin,veterinarian,user',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Las credenciales son incorrectas.'],
            ]);
        }

        // Verificar rol si se especificó
        if ($request->has('required_role')) {
            $requiredRole = $request->required_role;
            
            // Para admin, permitir tanto admin como veterinarian
            if ($requiredRole === 'admin' && !in_array($user->role, ['admin', 'veterinarian'])) {
                throw ValidationException::withMessages([
                    'email' => ['No tienes permisos para acceder al panel de administración.'],
                ]);
            }
            
            // Para web, solo permitir user
            if ($requiredRole === 'user' && $user->role !== 'user') {
                throw ValidationException::withMessages([
                    'email' => ['Esta área es exclusiva para clientes. Por favor, usa el panel de administración.'],
                ]);
            }
        }

        // Eliminar tokens anteriores
        $user->tokens()->delete();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    /**
     * Cerrar sesión
     * 
     * Elimina el token de acceso actual del usuario
     * Requiere autenticación (middleware auth:sanctum)
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sesión cerrada exitosamente',
        ]);
    }

    /**
     * Obtener usuario autenticado
     * 
     * Devuelve los datos del usuario actualmente autenticado
     * Requiere autenticación (middleware auth:sanctum)
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    /**
     * Reenviar email de verificación
     */
    public function resendVerificationEmail(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'El correo ya ha sido verificado.',
            ], 400);
        }

        $request->user()->sendEmailVerificationNotification();

        return response()->json([
            'message' => 'Email de verificación enviado.',
        ]);
    }

    /**
     * Verificar email
     */
    public function verifyEmail(Request $request, $id, $hash)
    {
        $user = User::findOrFail($id);

        if (!hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            return response()->json([
                'message' => 'El enlace de verificación no es válido.',
            ], 403);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'El correo ya ha sido verificado.',
            ]);
        }

        $user->markEmailAsVerified();

        return response()->json([
            'message' => 'Email verificado exitosamente.',
        ]);
    }

    /**
     * Solicitar reseteo de contraseña
     */
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json([
                'message' => 'Link de reseteo enviado a tu correo.',
            ]);
        }

        throw ValidationException::withMessages([
            'email' => [__($status)],
        ]);
    }

    /**
     * Resetear contraseña
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json([
                'message' => 'Contraseña reseteada exitosamente.',
            ]);
        }

        throw ValidationException::withMessages([
            'email' => [__($status)],
        ]);
    }
}

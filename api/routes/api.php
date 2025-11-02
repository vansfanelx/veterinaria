<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PetController;
use App\Http\Controllers\API\AppointmentController;
use App\Http\Controllers\API\MedicalHistoryController;
use App\Http\Controllers\API\WebController;
use App\Http\Controllers\API\CaptchaController;
use App\Http\Controllers\UserController;

/**
 * ===========================================
 * RUTAS API - Sistema Veterinaria
 * ===========================================
 * 
 * Todas las rutas tienen prefijo /api
 * Las rutas protegidas requieren token Sanctum
 * 
 * Autenticación: Laravel Sanctum (Bearer Token)
 * Formato de respuesta: JSON
 */

// ========================================
// RUTAS PÚBLICAS - No requieren autenticación
// ========================================

/**
 * POST /api/login
 * Iniciar sesión y obtener token de acceso
 * Rate limit: 5 intentos por minuto
 */
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:5,1');

/**
 * GET /api/captcha/generate
 * Generar nuevo CAPTCHA
 */
Route::get('/captcha/generate', [CaptchaController::class, 'generate']);

/**
 * POST /api/captcha/validate
 * Validar respuesta del CAPTCHA
 */
Route::post('/captcha/validate', [CaptchaController::class, 'validate']);

/**
 * POST /api/register  
 * Registrar nuevo usuario
 */
Route::post('/register', [AuthController::class, 'register']);

/**
 * POST /api/forgot-password
 * Solicitar link de reseteo de contraseña
 */
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);

/**
 * POST /api/reset-password
 * Resetear contraseña con token
 */
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

/**
 * GET /api/verify-email/{id}/{hash}
 * Verificar email del usuario
 */
Route::get('/verify-email/{id}/{hash}', [AuthController::class, 'verifyEmail'])->name('verification.verify');

// ========================================
// RUTAS PÚBLICAS PARA WEB FRONTEND
// ========================================

/**
 * GET /api/web/available-slots
 * Obtener fechas y horarios disponibles para citas
 */
Route::get('/web/available-slots', [WebController::class, 'getAvailableSlots']);

/**
 * GET /api/web/veterinarians
 * Obtener lista de veterinarios
 */
Route::get('/web/veterinarians', [WebController::class, 'getVeterinarians']);

// ========================================
// RUTAS PROTEGIDAS - Requieren autenticación
// ========================================
// Middleware: auth:sanctum
// Header requerido: Authorization: Bearer {token}

Route::middleware('auth:sanctum')->group(function () {
    // --- Autenticación ---
    
    /** POST /api/logout - Cerrar sesión */
    Route::post('/logout', [AuthController::class, 'logout']);
    
    /** GET /api/user - Obtener usuario actual */
    Route::get('/user', [AuthController::class, 'user']);
    
    /** POST /api/resend-verification-email - Reenviar email de verificación */
    Route::post('/resend-verification-email', [AuthController::class, 'resendVerificationEmail']);
    
    // ========================================
    // RUTAS PARA CLIENTES (Web Frontend)
    // Solo usuarios con rol 'user'
    // ========================================
    Route::middleware('role:user')->group(function () {
        // GET /api/web/my-pets - Obtener mascotas del usuario
        Route::get('/web/my-pets', [WebController::class, 'getMyPets']);
        
        // GET /api/web/pets/{petId}/medical-history - Historial médico de mascota
        Route::get('/web/pets/{petId}/medical-history', [WebController::class, 'getPetMedicalHistory']);
        
        // GET /api/web/my-appointments - Obtener citas del usuario
        Route::get('/web/my-appointments', [WebController::class, 'getMyAppointments']);
        
        // POST /api/web/appointments - Solicitar nueva cita
        Route::post('/web/appointments', [WebController::class, 'requestAppointment']);
        
        // DELETE /api/web/appointments/{id} - Cancelar cita
        Route::delete('/web/appointments/{id}', [WebController::class, 'cancelAppointment']);
    });
    
    // ========================================
    // RUTAS PARA ADMINISTRADORES Y VETERINARIOS
    // Solo usuarios con rol 'admin' o 'veterinarian'
    // ========================================
    Route::middleware('role:admin,veterinarian')->group(function () {
        // --- Mascotas (Pets) ---
        // GET    /api/pets          - Listar todas las mascotas
        // POST   /api/pets          - Crear nueva mascota
        // GET    /api/pets/{id}     - Ver detalle de mascota
        // PUT    /api/pets/{id}     - Actualizar mascota
        // DELETE /api/pets/{id}     - Eliminar mascota
        Route::apiResource('pets', PetController::class);
        
        // --- Citas (Appointments) ---
        // GET    /api/appointments          - Listar todas las citas
        // POST   /api/appointments          - Crear nueva cita
        // GET    /api/appointments/{id}     - Ver detalle de cita
        // PUT    /api/appointments/{id}     - Actualizar cita
        // DELETE /api/appointments/{id}     - Eliminar cita
        Route::apiResource('appointments', AppointmentController::class);
        
        // --- Historiales Médicos (Medical Histories) ---
        // GET    /api/medical-histories          - Listar todos los historiales
        // POST   /api/medical-histories          - Crear nuevo historial
        // GET    /api/medical-histories/{id}     - Ver detalle de historial
        // PUT    /api/medical-histories/{id}     - Actualizar historial
        // DELETE /api/medical-histories/{id}     - Eliminar historial
        Route::apiResource('medical-histories', MedicalHistoryController::class);
    });
    
    // ========================================
    // RUTAS SOLO PARA ADMINISTRADORES
    // Solo usuarios con rol 'admin'
    // ========================================
    Route::middleware('role:admin')->group(function () {
        // --- Usuarios/Clientes (Users) ---
        // GET    /api/users          - Listar todos los usuarios
        // POST   /api/users          - Crear nuevo usuario
        // GET    /api/users/{id}     - Ver detalle de usuario
        // PUT    /api/users/{id}     - Actualizar usuario
        // DELETE /api/users/{id}     - Eliminar usuario
        Route::apiResource('users', UserController::class);
        
        // PUT /api/users/{id}/password - Actualizar contraseña de usuario
        Route::put('/users/{id}/password', [UserController::class, 'updatePassword']);
    });
});

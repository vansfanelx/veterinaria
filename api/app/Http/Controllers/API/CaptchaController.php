<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;

/**
 * Controlador de CAPTCHA
 * Genera y valida captchas visuales con operaciones matemáticas
 */
class CaptchaController extends Controller
{
    /**
     * Generar un nuevo CAPTCHA
     * 
     * GET /api/captcha/generate
     * 
     * Retorna:
     * - token: identificador único del captcha
     * - question: pregunta matemática en texto
     * - image: imagen SVG en base64
     */
    public function generate()
    {
        // Generar operación matemática aleatoria
        $num1 = rand(1, 20);
        $num2 = rand(1, 20);
        $operations = ['+', '-', '*'];
        $operation = $operations[array_rand($operations)];
        
        // Calcular resultado
        $result = match($operation) {
            '+' => $num1 + $num2,
            '-' => $num1 - $num2,
            '*' => $num1 * $num2,
        };
        
        // Para resta, asegurar que el resultado sea positivo
        if ($operation === '-' && $result < 0) {
            $temp = $num1;
            $num1 = $num2;
            $num2 = $temp;
            $result = $num1 - $num2;
        }
        
        // Generar token único
        $token = Str::random(32);
        
        // Guardar en caché (válido por 5 minutos)
        cache()->put("captcha_{$token}", $result, now()->addMinutes(5));
        
        // Generar pregunta
        $operationSymbol = match($operation) {
            '+' => 'más',
            '-' => 'menos',
            '*' => 'por',
        };
        
        $question = "¿Cuánto es {$num1} {$operationSymbol} {$num2}?";
        
        // Generar imagen SVG
        $svg = $this->generateSvg($num1, $operation, $num2);
        $imageBase64 = base64_encode($svg);
        
        return response()->json([
            'token' => $token,
            'question' => $question,
            'image' => 'data:image/svg+xml;base64,' . $imageBase64,
            'expires_in' => 300 // 5 minutos
        ]);
    }
    
    /**
     * Validar respuesta del CAPTCHA
     * 
     * POST /api/captcha/validate
     * 
     * Body:
     * - token: string (requerido)
     * - answer: numeric (requerido)
     */
    public function validate(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
            'answer' => 'required|numeric',
        ]);
        
        $token = $request->token;
        $answer = (int) $request->answer;
        
        // Obtener respuesta correcta del caché
        $correctAnswer = cache()->get("captcha_{$token}");
        
        if ($correctAnswer === null) {
            return response()->json([
                'valid' => false,
                'message' => 'CAPTCHA expirado o inválido. Por favor, genera uno nuevo.'
            ], 400);
        }
        
        // Validar respuesta
        $isValid = $answer === $correctAnswer;
        
        // Eliminar del caché después de validar (un solo uso)
        cache()->forget("captcha_{$token}");
        
        if ($isValid) {
            // Generar token de verificación válido por 10 minutos
            $verificationToken = Str::random(40);
            cache()->put("captcha_verified_{$verificationToken}", true, now()->addMinutes(10));
            
            return response()->json([
                'valid' => true,
                'message' => 'CAPTCHA válido',
                'verification_token' => $verificationToken
            ]);
        }
        
        return response()->json([
            'valid' => false,
            'message' => 'Respuesta incorrecta. Inténtalo nuevamente.'
        ], 400);
    }
    
    /**
     * Verificar si un token de verificación es válido
     * Usado internamente por otros controladores
     */
    public static function verifyToken($token)
    {
        if (!$token) {
            return false;
        }
        
        $isValid = cache()->get("captcha_verified_{$token}");
        
        if ($isValid) {
            // Eliminar después de usar (un solo uso)
            cache()->forget("captcha_verified_{$token}");
            return true;
        }
        
        return false;
    }
    
    /**
     * Generar imagen SVG del CAPTCHA
     */
    private function generateSvg($num1, $operation, $num2)
    {
        // Colores aleatorios para el fondo
        $bgColors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];
        $bgColor = $bgColors[array_rand($bgColors)];
        
        // Símbolos de operación
        $symbol = match($operation) {
            '+' => '+',
            '-' => '−',
            '*' => '×',
        };
        
        // Generar líneas de ruido aleatorias
        $noiseLines = '';
        for ($i = 0; $i < 8; $i++) {
            $x1 = rand(0, 300);
            $y1 = rand(0, 120);
            $x2 = rand(0, 300);
            $y2 = rand(0, 120);
            $opacity = rand(10, 30) / 100;
            $noiseLines .= "<line x1='{$x1}' y1='{$y1}' x2='{$x2}' y2='{$y2}' stroke='white' stroke-width='2' opacity='{$opacity}'/>";
        }
        
        // Generar puntos de ruido
        $noiseDots = '';
        for ($i = 0; $i < 50; $i++) {
            $cx = rand(0, 300);
            $cy = rand(0, 120);
            $r = rand(1, 3);
            $opacity = rand(20, 40) / 100;
            $noiseDots .= "<circle cx='{$cx}' cy='{$cy}' r='{$r}' fill='white' opacity='{$opacity}'/>";
        }
        
        // Rotación aleatoria ligera para los números
        $rotate1 = rand(-10, 10);
        $rotate2 = rand(-10, 10);
        $rotate3 = rand(-10, 10);
        
        $svg = <<<SVG
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="120" viewBox="0 0 300 120">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:{$bgColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{$bgColor};stop-opacity:0.7" />
    </linearGradient>
    <filter id="shadow">
      <feDropShadow dx="2" dy="2" stdDeviation="2" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <!-- Fondo con gradiente -->
  <rect width="300" height="120" fill="url(#grad)" rx="12"/>
  
  <!-- Líneas de ruido -->
  {$noiseLines}
  
  <!-- Puntos de ruido -->
  {$noiseDots}
  
  <!-- Números y operación -->
  <g filter="url(#shadow)">
    <text x="60" y="75" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" transform="rotate({$rotate1} 60 75)">{$num1}</text>
    <text x="130" y="75" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" transform="rotate({$rotate2} 130 75)">{$symbol}</text>
    <text x="200" y="75" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" transform="rotate({$rotate3} 200 75)">{$num2}</text>
  </g>
  
  <!-- Texto decorativo -->
  <text x="150" y="110" font-family="Arial, sans-serif" font-size="12" fill="rgba(255,255,255,0.6)" text-anchor="middle">Verificación de seguridad</text>
</svg>
SVG;
        
        return $svg;
    }
}

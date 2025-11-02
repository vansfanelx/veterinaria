<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail as VerifyEmailBase;
use Illuminate\Notifications\Messages\MailMessage;

class VerifyEmailNotification extends VerifyEmailBase
{
    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable): MailMessage
    {
        $verificationUrl = $this->verificationUrl($notifiable);
        
        // Cambiar la URL del backend a la del frontend
        $frontendUrl = str_replace(
            config('app.url') . '/api',
            'http://localhost:4200',
            $verificationUrl
        );

        return (new MailMessage)
            ->subject('Verificación de Correo Electrónico - VetiVet')
            ->greeting('¡Hola ' . $notifiable->name . '!')
            ->line('Gracias por registrarte en VetiVet, tu clínica veterinaria de confianza.')
            ->line('Para completar tu registro, necesitamos verificar tu dirección de correo electrónico.')
            ->action('Verificar Correo Electrónico', $frontendUrl)
            ->line('Si no creaste esta cuenta, puedes ignorar este correo.')
            ->line('Este enlace de verificación expirará en 60 minutos.')
            ->salutation('Saludos,')
            ->salutation('El equipo de VetiVet');
    }
}

<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Seed usuarios administrativos y de prueba del sistema
     * 
     * Roles disponibles:
     * - admin: Acceso total al panel de administración
     * - veterinarian: Acceso al panel de administración (gestión de citas, mascotas, historiales)
     * - user: Acceso solo al frontend web (clientes)
     */
    public function run(): void
    {
        // ADMINISTRADOR PRINCIPAL
        User::updateOrCreate(
            ['email' => 'admin@vetivet.com'],
            [
                'name' => 'Administrador Principal',
                'email' => 'admin@vetivet.com',
                'password' => Hash::make('Admin123'),
                'role' => 'admin',
                'phone' => '+1234567890',
                'address' => 'Oficina Central VetiVet',
                'email_verified_at' => now(),
            ]
        );

        // VETERINARIOS
        $veterinarians = [
            [
                'name' => 'Dr. Carlos Mendoza',
                'email' => 'carlos.mendoza@vetivet.com',
                'password' => Hash::make('Vet123'),
                'role' => 'veterinarian',
                'phone' => '+1234567891',
                'address' => 'Clínica Veterinaria VetiVet',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Dra. Ana Martínez',
                'email' => 'ana.martinez@vetivet.com',
                'password' => Hash::make('Vet123'),
                'role' => 'veterinarian',
                'phone' => '+1234567892',
                'address' => 'Clínica Veterinaria VetiVet',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Dr. Luis Ramírez',
                'email' => 'luis.ramirez@vetivet.com',
                'password' => Hash::make('Vet123'),
                'role' => 'veterinarian',
                'phone' => '+1234567893',
                'address' => 'Clínica Veterinaria VetiVet',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Dra. María García',
                'email' => 'maria.garcia@vetivet.com',
                'password' => Hash::make('Vet123'),
                'role' => 'veterinarian',
                'phone' => '+1234567894',
                'address' => 'Clínica Veterinaria VetiVet',
                'email_verified_at' => now(),
            ],
        ];

        foreach ($veterinarians as $vet) {
            User::updateOrCreate(
                ['email' => $vet['email']],
                $vet
            );
        }

        // CLIENTES DE PRUEBA
        $clients = [
            [
                'name' => 'Juan Pérez',
                'email' => 'juan.perez@example.com',
                'password' => Hash::make('User123'),
                'role' => 'user',
                'phone' => '+1234567895',
                'address' => 'Calle Principal 123',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'María González',
                'email' => 'maria.gonzalez@example.com',
                'password' => Hash::make('User123'),
                'role' => 'user',
                'phone' => '+1234567896',
                'address' => 'Avenida Central 456',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Pedro Sánchez',
                'email' => 'pedro.sanchez@example.com',
                'password' => Hash::make('User123'),
                'role' => 'user',
                'phone' => '+1234567897',
                'address' => 'Calle Secundaria 789',
                'email_verified_at' => now(),
            ],
        ];

        foreach ($clients as $client) {
            User::updateOrCreate(
                ['email' => $client['email']],
                $client
            );
        }

        $this->command->info('✓ Usuarios del sistema creados exitosamente');
        $this->command->info('');
        $this->command->info('CREDENCIALES DE ACCESO:');
        $this->command->info('═══════════════════════════════════════════');
        $this->command->info('');
        $this->command->info('【 PANEL DE ADMINISTRACIÓN 】');
        $this->command->info('URL: http://localhost:55286');
        $this->command->info('');
        $this->command->info('Administrador:');
        $this->command->info('  Email: admin@vetivet.com');
        $this->command->info('  Pass:  Admin123');
        $this->command->info('');
        $this->command->info('Veterinarios (4 disponibles):');
        $this->command->info('  Email: carlos.mendoza@vetivet.com');
        $this->command->info('  Pass:  Vet123');
        $this->command->info('');
        $this->command->info('【 FRONTEND WEB (Clientes) 】');
        $this->command->info('URL: http://localhost:8003');
        $this->command->info('');
        $this->command->info('Cliente de prueba:');
        $this->command->info('  Email: juan.perez@example.com');
        $this->command->info('  Pass:  User123');
        $this->command->info('');
        $this->command->info('═══════════════════════════════════════════');
    }
}

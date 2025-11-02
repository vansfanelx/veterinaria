<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Orden de ejecución:
        // 1. Usuarios (admin, veterinarios, clientes)
        // 2. Mascotas (asociadas a clientes)
        // 3. Citas (asociadas a mascotas y veterinarios)
        // 4. Historiales médicos (asociados a citas)
        
        $this->call([
            AdminUserSeeder::class,
            PetSeeder::class,
            AppointmentSeeder::class,
            MedicalHistorySeeder::class,
        ]);

        $this->command->info('');
        $this->command->info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        $this->command->info('✓ Base de datos poblada exitosamente');
        $this->command->info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    }
}

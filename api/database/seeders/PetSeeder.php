<?php

namespace Database\Seeders;

use App\Models\Pet;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PetSeeder extends Seeder
{
    /**
     * Poblar la base de datos con mascotas de prueba
     */
    public function run(): void
    {
        // Obtener clientes (usuarios con rol 'user')
        $clients = User::where('role', 'user')->get();

        if ($clients->isEmpty()) {
            $this->command->warn('⚠ No hay clientes disponibles. Ejecuta AdminUserSeeder primero.');
            return;
        }

        // Cliente 1: Juan Pérez - 3 mascotas
        $client1 = $clients->where('email', 'juan.perez@example.com')->first();
        if ($client1) {
            Pet::create([
                'name' => 'Max',
                'species' => 'Perro',
                'breed' => 'Golden Retriever',
                'birth_date' => '2020-03-15',
                'gender' => 'male',
                'color' => 'Dorado',
                'weight' => 32.5,
                'owner_id' => $client1->id,
                'notes' => 'Muy activo y juguetón. Le encanta nadar.',
            ]);

            Pet::create([
                'name' => 'Luna',
                'species' => 'Gato',
                'breed' => 'Siamés',
                'birth_date' => '2021-07-20',
                'gender' => 'female',
                'color' => 'Crema con puntos marrones',
                'weight' => 4.2,
                'owner_id' => $client1->id,
                'notes' => 'Muy vocal. Le gusta estar en lugares altos.',
            ]);

            Pet::create([
                'name' => 'Coco',
                'species' => 'Conejo',
                'breed' => 'Mini Lop',
                'birth_date' => '2022-11-05',
                'gender' => 'male',
                'color' => 'Blanco y gris',
                'weight' => 1.8,
                'owner_id' => $client1->id,
                'notes' => 'Muy tímido pero afectuoso.',
            ]);
        }

        // Cliente 2: María González - 2 mascotas
        $client2 = $clients->where('email', 'maria.gonzalez@example.com')->first();
        if ($client2) {
            Pet::create([
                'name' => 'Rocky',
                'species' => 'Perro',
                'breed' => 'Bulldog Francés',
                'birth_date' => '2019-05-10',
                'gender' => 'male',
                'color' => 'Atigrado',
                'weight' => 13.2,
                'owner_id' => $client2->id,
                'notes' => 'Propenso a problemas respiratorios. Requiere aire acondicionado en verano.',
            ]);

            Pet::create([
                'name' => 'Michi',
                'species' => 'Gato',
                'breed' => 'Persa',
                'birth_date' => '2021-02-14',
                'gender' => 'female',
                'color' => 'Blanco',
                'weight' => 5.1,
                'owner_id' => $client2->id,
                'notes' => 'Requiere cepillado diario. Dieta especial para prevención de bolas de pelo.',
            ]);
        }

        // Cliente 3: Pedro Sánchez - 2 mascotas
        $client3 = $clients->where('email', 'pedro.sanchez@example.com')->first();
        if ($client3) {
            Pet::create([
                'name' => 'Thor',
                'species' => 'Perro',
                'breed' => 'Pastor Alemán',
                'birth_date' => '2018-09-22',
                'gender' => 'male',
                'color' => 'Negro y café',
                'weight' => 38.7,
                'owner_id' => $client3->id,
                'notes' => 'Bien entrenado. Histórico de displasia de cadera.',
            ]);

            Pet::create([
                'name' => 'Nina',
                'species' => 'Gato',
                'breed' => 'Maine Coon',
                'birth_date' => '2020-12-01',
                'gender' => 'female',
                'color' => 'Gris plateado',
                'weight' => 6.8,
                'owner_id' => $client3->id,
                'notes' => 'Gata de raza grande. Muy sociable con otros animales.',
            ]);
        }

        $petCount = Pet::count();
        $this->command->info("✓ {$petCount} mascotas creadas exitosamente");
    }
}

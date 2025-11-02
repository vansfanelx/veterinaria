<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class VeterinarianSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $veterinarians = [
            [
                'name' => 'Dr. Juan Pérez',
                'email' => 'juan.perez@vetivet.com',
                'password' => Hash::make('password'),
                'role' => 'veterinarian',
                'phone' => '555-1234',
                'address' => 'Cardiología Veterinaria',
                'email_verified_at' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Dra. María García',
                'email' => 'maria.garcia@vetivet.com',
                'password' => Hash::make('password'),
                'role' => 'veterinarian',
                'phone' => '555-5678',
                'address' => 'Dermatología Veterinaria',
                'email_verified_at' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Dr. Carlos López',
                'email' => 'carlos.lopez@vetivet.com',
                'password' => Hash::make('password'),
                'role' => 'veterinarian',
                'phone' => '555-9012',
                'address' => 'Cirugía Veterinaria',
                'email_verified_at' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Dra. Ana Martínez',
                'email' => 'ana.martinez@vetivet.com',
                'password' => Hash::make('password'),
                'role' => 'veterinarian',
                'phone' => '555-3456',
                'address' => 'Medicina General',
                'email_verified_at' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ];

        DB::table('users')->insert($veterinarians);
    }
}

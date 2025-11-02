# 📊 Datos de Prueba - Sistema VetiVet

Este documento detalla todos los datos de prueba creados en la base de datos mediante seeders.

---

## 👥 Usuarios del Sistema

### 🔑 Administrador
```
Nombre: Administrador Principal
Email: admin@vetivet.com
Contraseña: Admin123
Rol: admin
Acceso: Panel de Administración (http://localhost:55286)
```

### 👨‍⚕️ Veterinarios (4)

1. **Dr. Carlos Mendoza**
   - Email: `carlos.mendoza@vetivet.com`
   - Contraseña: `Vet123`
   - Teléfono: +1234567891

2. **Dra. Ana Martínez**
   - Email: `ana.martinez@vetivet.com`
   - Contraseña: `Vet123`
   - Teléfono: +1234567892

3. **Dr. Luis Ramírez**
   - Email: `luis.ramirez@vetivet.com`
   - Contraseña: `Vet123`
   - Teléfono: +1234567893

4. **Dra. María García**
   - Email: `maria.garcia@vetivet.com`
   - Contraseña: `Vet123`
   - Teléfono: +1234567894

### 👤 Clientes (3)

1. **Juan Pérez**
   - Email: `juan.perez@example.com`
   - Contraseña: `User123`
   - Teléfono: +1234567895
   - Dirección: Calle Principal 123
   - Mascotas: 3 (Max, Luna, Coco)

2. **María González**
   - Email: `maria.gonzalez@example.com`
   - Contraseña: `User123`
   - Teléfono: +1234567896
   - Dirección: Avenida Central 456
   - Mascotas: 2 (Rocky, Michi)

3. **Pedro Sánchez**
   - Email: `pedro.sanchez@example.com`
   - Contraseña: `User123`
   - Teléfono: +1234567897
   - Dirección: Calle Secundaria 789
   - Mascotas: 2 (Thor, Nina)

---

## 🐾 Mascotas (7 total)

### Cliente: Juan Pérez

#### 1. Max 🐕
```
Especie: Perro
Raza: Golden Retriever
Género: Macho
Fecha de Nacimiento: 15/03/2020 (5 años)
Color: Dorado
Peso: 32.5 kg
Notas: Muy activo y juguetón. Le encanta nadar.
```

#### 2. Luna 🐱
```
Especie: Gato
Raza: Siamés
Género: Hembra
Fecha de Nacimiento: 20/07/2021 (4 años)
Color: Crema con puntos marrones
Peso: 4.2 kg
Notas: Muy vocal. Le gusta estar en lugares altos.
```

#### 3. Coco 🐰
```
Especie: Conejo
Raza: Mini Lop
Género: Macho
Fecha de Nacimiento: 05/11/2022 (2 años)
Color: Blanco y gris
Peso: 1.8 kg
Notas: Muy tímido pero afectuoso.
```

### Cliente: María González

#### 4. Rocky 🐕
```
Especie: Perro
Raza: Bulldog Francés
Género: Macho
Fecha de Nacimiento: 10/05/2019 (6 años)
Color: Atigrado
Peso: 13.2 kg
Notas: Propenso a problemas respiratorios. Requiere aire acondicionado en verano.
```

#### 5. Michi 🐱
```
Especie: Gato
Raza: Persa
Género: Hembra
Fecha de Nacimiento: 14/02/2021 (4 años)
Color: Blanco
Peso: 5.1 kg
Notas: Requiere cepillado diario. Dieta especial para prevención de bolas de pelo.
```

### Cliente: Pedro Sánchez

#### 6. Thor 🐕
```
Especie: Perro
Raza: Pastor Alemán
Género: Macho
Fecha de Nacimiento: 22/09/2018 (7 años)
Color: Negro y café
Peso: 38.7 kg
Notas: Bien entrenado. Histórico de displasia de cadera.
```

#### 7. Nina 🐱
```
Especie: Gato
Raza: Maine Coon
Género: Hembra
Fecha de Nacimiento: 01/12/2020 (4 años)
Color: Gris plateado
Peso: 6.8 kg
Notas: Gata de raza grande. Muy sociable con otros animales.
```

---

## 📅 Citas (12 total)

### ✅ Citas Completadas (4)

1. **Max - Vacunación anual**
   - Fecha: Hace 2 meses
   - Hora: 10:00
   - Estado: Completada
   - Tiene historial médico ✓

2. **Max - Chequeo general**
   - Fecha: Hace 1 mes
   - Hora: 14:30
   - Estado: Completada
   - Tiene historial médico ✓

3. **Rocky - Dificultad respiratoria**
   - Fecha: Hace 3 semanas
   - Hora: 11:00
   - Estado: Completada
   - Tiene historial médico ✓

4. **Thor - Revisión de displasia de cadera**
   - Fecha: Hace 1 semana
   - Hora: 09:00
   - Estado: Completada
   - Tiene historial médico ✓

### 🟢 Citas Confirmadas (5)

5. **Luna - Consulta de rutina**
   - Fecha: Ayer
   - Hora: 15:00
   - Estado: Confirmada

6. **Michi - Limpieza dental**
   - Fecha: Hoy
   - Hora: 10:30
   - Estado: Confirmada
   - Nota: Ayuno de 8 horas

7. **Coco - Primera consulta**
   - Fecha: Mañana
   - Hora: 11:00
   - Estado: Confirmada
   - Nota: Revisión general y vacunas

8. **Nina - Corte de uñas y estética**
   - Fecha: En 3 días
   - Hora: 16:00
   - Estado: Confirmada

9. **Max - Refuerzo de vacunas**
   - Fecha: En 5 días
   - Hora: 09:30
   - Estado: Confirmada
   - Nota: Llevar cartilla

### 🟡 Citas Pendientes (2)

10. **Rocky - Seguimiento respiratorio**
    - Fecha: En 1 semana
    - Hora: 14:00
    - Estado: Pendiente
    - Nota: Control post-tratamiento

11. **Thor - Radiografías de cadera**
    - Fecha: En 10 días
    - Hora: 08:00
    - Estado: Pendiente
    - Nota: Ayuno de 12 horas. Estudio con sedación.

### ❌ Citas Canceladas (1)

12. **Luna - Desparasitación**
    - Fecha: En 7 días
    - Hora: 13:00
    - Estado: Cancelada
    - Nota: Cliente cancela por viaje

---

## 🏥 Historiales Médicos (4 total)

### 1. Max - Vacunación preventiva
```
Fecha: Hace 2 meses
Diagnóstico: Vacunación preventiva completada
Síntomas: Ninguno - Visita preventiva
Tratamiento: Aplicación de vacuna múltiple y antirrábica
Prescripciones: Reposo por 24 horas. Vigilar zona de aplicación.
Temperatura: 38.5°C
Peso: 32.5 kg
Notas: Paciente en excelente estado de salud. Próxima vacunación en 1 año.
```

### 2. Max - Chequeo general
```
Fecha: Hace 1 mes
Diagnóstico: Estado de salud óptimo
Síntomas: Ninguno - Chequeo preventivo
Tratamiento: Desparasitación interna y externa
Prescripciones: Comprimido antiparasitario (Drontal Plus) dosis única. Pipeta antipulgas aplicada.
Temperatura: 38.5°C
Peso: 32.5 kg
Notas: Análisis de sangre normales. Próximo chequeo en 6 meses.
```

### 3. Rocky - Síndrome braquicefálico
```
Fecha: Hace 3 semanas
Diagnóstico: Síndrome braquicefálico leve
Síntomas: Jadeo excesivo, ronquidos, intolerancia al ejercicio
Tratamiento: Control de peso, evitar temperaturas altas, ejercicio moderado
Prescripciones: Antiinflamatorio (Carprofeno) 2mg/kg cada 12h por 5 días
Temperatura: 38.8°C
Peso: 13.2 kg
Notas: Recomendar aire acondicionado en verano. Seguimiento en 3 semanas.
```

### 4. Thor - Displasia de cadera
```
Fecha: Hace 1 semana
Diagnóstico: Displasia de cadera grado II - Artrosis leve
Síntomas: Cojera matutina, dificultad para levantarse, rigidez
Tratamiento: Condroprotectores, fisioterapia, control de peso
Prescripciones: Glucosamina + Condroitina 500mg cada 24h. Tramadol 3mg/kg si hay dolor.
Temperatura: 38.5°C
Peso: 38.7 kg
Notas: Recomendar natación como ejercicio. Evitar escaleras. Radiografías de control en 3 meses.
```

---

## 📊 Resumen Estadístico

```
👥 Usuarios
   ├── 1 Administrador
   ├── 4 Veterinarios
   └── 3 Clientes

🐾 Mascotas (7)
   ├── 4 Perros (Max, Rocky, Thor)
   ├── 3 Gatos (Luna, Michi, Nina)
   └── 1 Conejo (Coco)

📅 Citas (12)
   ├── 4 Completadas (33%)
   ├── 5 Confirmadas (42%)
   ├── 2 Pendientes (17%)
   └── 1 Cancelada (8%)

🏥 Historiales Médicos
   └── 4 registros (1 por cada cita completada)
```

---

## 🔄 Comandos para Resetear Datos

### Resetear todo (migraciones + seeders)
```bash
cd api
php artisan migrate:fresh --seed
```

### Solo ejecutar seeders (sin borrar datos)
```bash
cd api
php artisan db:seed
```

### Ejecutar un seeder específico
```bash
cd api
php artisan db:seed --class=AdminUserSeeder
php artisan db:seed --class=PetSeeder
php artisan db:seed --class=AppointmentSeeder
php artisan db:seed --class=MedicalHistorySeeder
```

---

## 🎯 Escenarios de Prueba

### 1. Login como Administrador
```
1. Ir a: http://localhost:55286
2. Email: admin@vetivet.com
3. Password: Admin123
4. Verificar acceso total al sistema
```

### 2. Login como Veterinario
```
1. Ir a: http://localhost:55286
2. Email: carlos.mendoza@vetivet.com
3. Password: Vet123
4. Verificar acceso a mascotas, citas, historiales
5. Verificar que NO puede gestionar usuarios
```

### 3. Login como Cliente
```
1. Ir a: http://localhost:8003
2. Email: juan.perez@example.com
3. Password: User123
4. Verificar que ve 3 mascotas (Max, Luna, Coco)
5. Verificar que ve sus citas
```

### 4. Probar Filtros de Citas
```
- Filtrar por "completed": debe mostrar 4 citas
- Filtrar por "confirmed": debe mostrar 5 citas
- Filtrar por "pending": debe mostrar 2 citas
- Filtrar por "cancelled": debe mostrar 1 cita
- Filtrar por fecha de hoy: debe mostrar cita de Michi
- Filtrar por mañana: debe mostrar cita de Coco
```

### 5. Verificar Historiales Médicos
```
- Max: debe tener 2 historiales
- Rocky: debe tener 1 historial
- Thor: debe tener 1 historial
- Otras mascotas: sin historiales aún
```

---

## 📝 Notas Importantes

1. **Emails Verificados**: Todos los usuarios tienen `email_verified_at` establecido, pueden iniciar sesión inmediatamente.

2. **Contraseñas de Prueba**: 
   - Cambiar en producción
   - Admin123, Vet123, User123 son solo para desarrollo

3. **Relaciones**:
   - Cada cita está asociada a una mascota, un cliente y un veterinario
   - Solo las citas completadas tienen historial médico
   - Las mascotas están asociadas a sus dueños

4. **Fechas Dinámicas**:
   - Las fechas se generan relativamente a la fecha actual
   - Hay citas pasadas, presentes y futuras
   - Los historiales usan las fechas de las citas

5. **Datos Realistas**:
   - Diagnósticos médicos apropiados por especie
   - Temperaturas normales según el animal
   - Tratamientos y medicamentos comunes en veterinaria

---

## 🔍 Verificación de Datos

Para verificar que los datos se crearon correctamente:

```bash
cd api
php artisan tinker

# Contar registros
\App\Models\User::count();              # Debe ser 8 (1 admin + 4 vets + 3 clientes)
\App\Models\Pet::count();               # Debe ser 7
\App\Models\Appointment::count();       # Debe ser 12
\App\Models\MedicalHistory::count();    # Debe ser 4

# Ver usuarios por rol
\App\Models\User::where('role', 'admin')->count();         # 1
\App\Models\User::where('role', 'veterinarian')->count();  # 4
\App\Models\User::where('role', 'user')->count();          # 3

# Ver citas por estado
\App\Models\Appointment::where('status', 'completed')->count();   # 4
\App\Models\Appointment::where('status', 'confirmed')->count();   # 5
\App\Models\Appointment::where('status', 'pending')->count();     # 2
\App\Models\Appointment::where('status', 'cancelled')->count();   # 1
```

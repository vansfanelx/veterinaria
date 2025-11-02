<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MedicalHistory extends Model
{
    protected $fillable = [
        'pet_id',
        'appointment_id',
        'visit_date',
        'diagnosis',
        'symptoms',
        'treatment',
        'prescriptions',
        'weight',
        'temperature',
        'notes',
        'veterinarian_id',
    ];

    protected $casts = [
        'visit_date' => 'date',
        'weight' => 'decimal:2',
        'temperature' => 'decimal:2',
    ];

    public function pet(): BelongsTo
    {
        return $this->belongsTo(Pet::class);
    }

    public function appointment(): BelongsTo
    {
        return $this->belongsTo(Appointment::class);
    }

    public function veterinarian(): BelongsTo
    {
        return $this->belongsTo(User::class, 'veterinarian_id');
    }
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: 'admin' | 'veterinarian' | 'user';
  email_verified_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  token_type: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
  address?: string;
  captcha_token: string;
}

export interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  birth_date: string;
  owner_id: number;
  owner?: User;
  created_at?: string;
  updated_at?: string;
}

export interface Appointment {
  id: number;
  pet_id: number;
  user_id: number;
  veterinarian_id: number;
  date: string;
  time: string;
  reason: string;
  status: 'pendiente' | 'confirmada' | 'completada' | 'cancelada';
  pet?: Pet;
  user?: User;
  veterinarian?: User;
  created_at?: string;
  updated_at?: string;
}

export interface MedicalHistory {
  id: number;
  pet_id: number;
  veterinarian_id: number;
  visit_date: string;
  symptoms: string;
  diagnosis: string;
  treatment: string;
  notes?: string;
  pet?: Pet;
  veterinarian?: User;
  created_at?: string;
  updated_at?: string;
}

export interface AvailableSlot {
  date: string;
  day_name: string;
  slots: string[];
  slots_count: number;
}

export interface Veterinarian {
  id: number;
  name: string;
  specialty: string;
  email: string;
  phone?: string;
}

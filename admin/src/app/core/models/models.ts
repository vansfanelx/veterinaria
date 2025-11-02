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
  pets?: Array<{
    id: number;
    name: string;
    species: string;
    breed?: string;
  }>;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role?: 'admin' | 'veterinarian' | 'user';
}

export interface AuthResponse {
  user: User;
  token: string;
  token_type: string;
}

export interface Pet {
  id?: number;
  name: string;
  species: string;
  breed?: string;
  birth_date?: string;
  gender?: 'male' | 'female';
  color?: string;
  weight?: number;
  owner_id?: number;
  notes?: string;
  created_at?: string;
  updated_at?: string;
  owner?: {
    id: number;
    name: string;
    email: string;
  };
  appointments?: any[];
  medicalHistories?: any[];
}

export interface Appointment {
  id?: number;
  pet_id: number;
  user_id: number;
  veterinarian_id?: number;
  date: string;
  time: string;
  reason: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at?: string;
  updated_at?: string;
  pet?: {
    id: number;
    name: string;
    species: string;
  };
  user?: {
    id: number;
    name: string;
    email: string;
  };
  veterinarian?: {
    id: number;
    name: string;
  };
  medicalHistory?: any;
}

export interface MedicalHistory {
  id?: number;
  pet_id: number;
  appointment_id?: number;
  visit_date: string;
  diagnosis: string;
  symptoms?: string;
  treatment: string;
  prescriptions?: string;
  weight?: number;
  temperature?: number;
  notes?: string;
  veterinarian_id: number;
  created_at?: string;
  updated_at?: string;
  pet?: {
    id: number;
    name: string;
    species: string;
    breed?: string;
    owner?: {
      id: number;
      name: string;
      email: string;
    };
  };
  appointment?: any;
  veterinarian?: {
    id: number;
    name: string;
  };
}

export interface Veterinarian {
  id: number;
  name: string;
  email: string;
  phone?: string;
  specialty?: string;
  license_number?: string;
  created_at?: string;
  updated_at?: string;
}

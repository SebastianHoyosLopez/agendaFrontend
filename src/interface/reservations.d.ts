// src/types/reservation.d.ts

import { ReactNode } from "react";

export interface AuthContextProps {
  children: ReactNode
}

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: string; // Puedes ajustar el tipo según los roles disponibles (ADMIN, USER, etc.)
  reservationsIncludes: any[]; // Ajusta el tipo según la estructura real de las reservas
}

interface UserValidationToken {
  isValid: boolean;
  userValidate?: User;
}

export interface UserOwner {
  id: string;
  createdAt: string;
  updatedAt: string;
  accessLevel: number;
  user: {
    id: string;
    createdAt: string;
    updatedAt: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    role: string;
  };
}

export interface ReservationCreate {
  id: number;
  place: string;
  date: string;
  description: string;
  hour: string;
}

export interface NewReservation {
  place: string;
  date: string;
  description: string;
  hour: string;
}

export interface Earring {
  id: string;
  createdAt: string;
  updatedAt: string;
  earringName: string;
  earringDescription: string;
  status: 'CREATED' | 'IN_PROGRESS' | 'COMPLETED'; // Ajusta según los posibles valores
  responsibleName: string;
}

export interface Reservation {
  id: string;
  createdAt: string;
  updatedAt: string;
  place: string;
  date: string;
  description: string;
  hour: string;
  usersIncludes: UserOwner[];
  earrings: Earring[];
}

export interface LoginResponse {
  accessToken: string;
  user: {
    createdAt: string;
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    role: string;
    updatedAt: string;
    username: string;
  };
}

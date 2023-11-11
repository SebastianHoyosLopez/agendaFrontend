// src/types/reservation.d.ts

import { ReactNode } from "react";

export interface AuthContextProps {
  children: ReactNode
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

export interface Reservation {
  id: string;
  createdAt: string;
  updatedAt: string;
  place: string;
  date: string;
  description: string;
  hour: string;
  usersIncludes: User[];
  earrings: any[];
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

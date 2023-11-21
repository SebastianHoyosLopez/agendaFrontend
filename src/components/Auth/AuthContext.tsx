import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

// AuthContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  checkToken: () => Promise<boolean>;
}


const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter()

  const login = () => {
    setIsAuthenticated(true);
    router.push('/reservations')
    // Puedes hacer más cosas aquí, como almacenar el token en localStorage si es necesario.
  };

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove('token')
    router.push('/login')
    // Puedes hacer más cosas aquí, como limpiar el token de localStorage si es necesario.
  };

  const checkToken = async () => {

    const token = Cookies.get('token')

    if (!token) {
      console.error('Token no encontrado');
      
      return false;
    }
    
    try {
      // Realiza una llamada al servidor para validar el token
      const response = await fetch('http://localhost:4000/apiAgenda/auth/validate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }), 
      });

      if (response.ok) {
        const data = await response.json();
        return data.isValid;
      } else {
        console.error('Error al verificar el token inicia sesión');
        return false;
      }
    } catch (error) {
      console.error('Error al realizar la solicitud', error);
      return false;
    }
  };

  const contextValue: AuthContextValue = {
    isAuthenticated,
    login,
    logout,
    checkToken,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }

  return context;
};

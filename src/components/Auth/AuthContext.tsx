// AuthContext.tsx
import React, { createContext, useContext, ReactNode, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { validateToken } from "@/api/api";

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
  const router = useRouter();

  const login = () => {
    setIsAuthenticated(true);
    router.push("/reservations");
  };

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove("token");
    router.push("/login");
  };

  const checkToken = async () => {
    const token = Cookies.get("token");

    if (!token) {
      console.error("Token no encontrado");
      return false;
    }

    try {
      const isValid = await validateToken();
      return isValid;
    } catch (error) {
      console.error("Error al verificar el token. Inicia sesión.", error);
      return false;
    }
  };

  const contextValue: AuthContextValue = {
    isAuthenticated,
    login,
    logout,
    checkToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
  }

  return context;
};

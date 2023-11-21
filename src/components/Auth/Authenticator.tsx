import React, { ReactNode, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

interface AuthenticatorProps {
  children: ReactNode;
}

const Authenticator: React.FC<AuthenticatorProps> = ({ children }) => {
  const { checkToken } = useAuth();
  const token = Cookies.get("token");
  const router = useRouter();

  useEffect(() => {
    const checkUserToken = async () => {
      if (!token && !(await checkToken())) {
        // Si no hay token o el token no es válido, redirige a la página de inicio de sesión.
        router.push('/login');
      }
    };
    checkUserToken();
  }, []);

  return <>{children}</>;
};

export default Authenticator;

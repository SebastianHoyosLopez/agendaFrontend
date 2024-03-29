import React, { useState } from "react";
import { useAuth } from "@/components/Auth/AuthContext";
import { useRouter } from "next/router";
import { login } from "@/api/api";
import { LoginForm } from "@/components/forms/loginForm/LoginForm";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login: authLogin } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      if (data) {
        authLogin();
      } else {
        console.error("Inicio de sesión fallido");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud", error);
    }
  };

  return (
    <>
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
      />
    </>
  );
};

export default Login;

import React, { useState } from "react";
import { useAuth } from "@/components/Auth/AuthContext";
import { useRouter } from "next/router";
import { LoginResponse } from "@/interface";
import Cookies from "js-cookie";
import Form from "../../components/form/Form";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:4000/apiAgenda/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const data: LoginResponse = await response.json();
        const token = data.accessToken;

        Cookies.set("token", token);

        // Actualizamos el estado global de autenticación usando la función login del contexto.
        login();
        router.push("/");

        console.log("Inicio de sesión exitoso. Token:", token);
        console.log(data);
      } else {
        console.error("Inicio de sesión fallido");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud", error);
    }
  };
  return (
    <>
      <Form
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

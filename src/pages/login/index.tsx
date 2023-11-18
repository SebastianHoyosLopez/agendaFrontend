import React, { useEffect, useState } from "react";
import { useAuth } from "@/components/Auth/AuthContext";
import { useRouter } from "next/router";
import { LoginResponse } from "@/interface";
import Cookies from "js-cookie";
import FormLogin from "../../components/form/formLogin/FormLogin";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      router.push('/')
    }
  }, [token, router])

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

        const userId = data.user.id;

        Cookies.set("userId", userId);
        Cookies.set("token", token);

        login();
        router.push("/");

      } else {
        console.error("Inicio de sesión fallido");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud", error);
    }
  };
  return (
    <>
      <FormLogin
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

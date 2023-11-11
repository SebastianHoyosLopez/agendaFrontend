// src/pages/login.tsx
import React, { useState } from 'react';
import { LoginResponse } from '@/interface';
import { useAuth } from '@/components/Auth/AuthContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:4000/apiAgenda/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data: LoginResponse = await response.json();
        const token = data.accessToken;

        // Actualizamos el estado global de autenticación usando la función login del contexto.
        login(token);

        console.log('Inicio de sesión exitoso. Token:', token);
        console.log(data);
      } else {
        console.error('Inicio de sesión fallido');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;

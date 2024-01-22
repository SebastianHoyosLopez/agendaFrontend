import React, { ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import "./loginForm.css";

interface FormProps {
  handleLogin: (e: FormEvent) => Promise<void>;
  setPassword: (value: string) => void;
  setUsername: (value: string) => void;
  username: string;
  password: string;
}

export const LoginForm: React.FC<FormProps> = ({
  handleLogin,
  setPassword,
  setUsername,
  username,
  password,
}) => {
  return (
    <div className="container-login">
      <div className="wrap-login">
        <form action="" method="">
          <span className="login-form-title">Iniciar Sesión</span>
          {/* <Image className="avatar" src="img/user.svg" alt="" /> */}
          {/* <Image
            className="avatar"
            src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png"
            alt=""
          /> */}
          <div className="wrap-input100">
            <input
              className="input100"
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
            <span className="focus-efecto"></span>
          </div>
          <div className="wrap-input100">
            <input
              className="input100"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <span className="focus-efecto"></span>
          </div>
          <div className="container-login-form-btn">
            <div className="wrap-login-form-btn">
              <div className="login-form-bgbtn"></div>
              <button
                onClick={handleLogin}
                name="btnEntrar"
                className="login-form-btn"
              >
                ENTRAR
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { ChangeEvent, FormEvent } from 'react';
import styles from './formLogin.module.css'

interface FormProps {
  handleLogin: (e: FormEvent) => Promise<void>;
  setPassword: (value: string) => void;
  setUsername: (value: string) => void;
  username: string;
  password: string;
}

const FormLogin: React.FC<FormProps> = ({ handleLogin, setPassword, setUsername, username, password }) => {
  return (
    <div className={styles.login_page}>
      <div className={styles.form}>
        <form>
          <input
            className={styles.input}
            type="text"
            placeholder='username'
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
          <input
            className={styles.input}
            type="password"
            placeholder='password'
            value={password} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
          <button className={styles.button} onClick={handleLogin}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default FormLogin;

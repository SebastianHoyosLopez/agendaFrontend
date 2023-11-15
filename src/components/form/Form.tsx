import React, { ChangeEvent, FormEvent } from 'react';
import './form.css'

interface FormProps {
  handleLogin: (e: FormEvent) => Promise<void>;
  setPassword: (value: string) => void;
  setUsername: (value: string) => void;
  username: string;
  password: string;
}

const Form: React.FC<FormProps> = ({ handleLogin, setPassword, setUsername, username, password }) => {
  return (
    <div className='login-page'>
      <div className='form'>
        <form className='login-form'>
          <input
            type="text"
            placeholder='username'
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
          <input
            type="password"
            placeholder='password'
            value={password} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Form;

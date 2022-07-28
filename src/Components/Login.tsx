import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { login } from '../Api';
import { userLoginType, keyValue } from '../Interfaces';
import Classes from './Login.module.css';

export default function Login() {
  const initValue:userLoginType = {
    username: '',
    password: '',
  };
  const [credentials, setCredentials] = useState<userLoginType>(initValue);
  // let navigate = useNavigate();

  const update = (prop:keyValue) => {
    let temp:userLoginType = { ...credentials };
    if(prop.key === 'username')
    temp.username = prop.value;
    else if(prop.key === 'password')
    temp.password = prop.value;
    setCredentials(temp);
  };

  const validateLogin = async (evt:React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    let { username, password } = credentials;
    if (username && password) {
      setCredentials(initValue);
      console.log('creds', credentials);
      login({ username: username, password })
      // navigate('/home')
    }
  };
  return (
    <div className={Classes.login}>
      <form onSubmit={validateLogin}>
        <h3>User Login</h3>
        <div className={Classes.input}>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            value={credentials.username}
            onChange={(evt:React.ChangeEvent<HTMLInputElement>) =>
              update({ key: 'username', value: evt.target.value })
            }
            autoComplete='off'
            required
          />
        </div>
        <div className={Classes.input}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={credentials.password}
            onChange={(evt:React.ChangeEvent<HTMLInputElement>) =>
              update({ key: 'password', value: evt.target.value })
            }
            autoComplete='off'
            required
          />
        </div>
        <button type='submit'>Login</button>
        <p>
          Not registered? Register <NavLink to='/signup'>here</NavLink>
        </p>
      </form>
    </div>
  );
}

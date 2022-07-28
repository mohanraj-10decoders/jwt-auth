import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import customAxios from '../Axios';
import { userLoginType, keyValue } from '../Interfaces';
import Classes from './Login.module.css';

export default function Login() {
  const initValue: userLoginType = {
    username: '',
    password: '',
  };
  const [credentials, setCredentials] = useState<userLoginType>(initValue);
  let navigate = useNavigate();

  const update = (prop: keyValue) => {
    let temp: userLoginType = { ...credentials };
    if (prop.key === 'username') temp.username = prop.value;
    else if (prop.key === 'password') temp.password = prop.value;
    setCredentials(temp);
  };

  const validateLogin = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    let { username, password } = credentials;
    if (username && password) {
      setCredentials(initValue);
      // console.log('creds', credentials);
      customAxios
        .post('/auth/login', { email: username })
        .then((resp) => {
          console.log('resp data', resp);
          if (resp?.data?.status === 'Success') {
            localStorage.setItem('access_token', resp.data.token);
            localStorage.setItem('refresh_token', resp.data.refreshToken);
            navigate('/home');
          } else {
            alert('Login failed');
          }
        })
        .catch((err) => console.error(err.message));
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
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
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
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
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

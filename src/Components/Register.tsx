import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { keyValue, userRegType } from '../Interfaces';
import customAxios from '../Axios';
import Classes from './Register.module.css';

export default function Register() {
  const initValue = {
    name: '',
    email: '',
    password: '',
    cPassword: '',
  };
  const [userDetail, setUserDetail] = useState<userRegType>(initValue);
  let navigate = useNavigate();

  const update = (prop:keyValue) => {
    let {name, email, password, cPassword}  = userDetail;
    if(prop.key === 'name') name = prop.value ;
    else if(prop.key === 'email') email = prop.value ;
    else if(prop.key === 'password') password = prop.value ;
    else if(prop.key === 'cPassword') cPassword = prop.value ;
    setUserDetail({name,email, password, cPassword});
  };

  const regUser = (evt:React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    let { name, email, password, cPassword } = userDetail;
    if (name && email && password && password === cPassword) {
      setUserDetail(initValue);
      console.log('reg user', userDetail);
      customAxios
    .post('/auth/signup', { username: email, password })
    .then((resp) => {
      if(resp.status === 201) {
        alert('User registered successfully!!');
        navigate('/login');
      }
      else{
        alert('Failed to register user')
      }
    })
    .catch((err) => console.error(err.message));
    }
  };
  return (
    <div className={Classes.register}>
      <form onSubmit={regUser}>
        <h3>Registration</h3>
        <div className={Classes.input}>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            value={userDetail.name}
            onChange={(evt:React.ChangeEvent<HTMLInputElement>) => update({ key: 'name', value: evt.target.value })}
            autoFocus={true}
            autoComplete='off'
            required
          />
        </div>
        <div className={Classes.input}>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            value={userDetail.email}
            onChange={(evt:React.ChangeEvent<HTMLInputElement>) =>
              update({ key: 'email', value: evt.target.value })
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
            value={userDetail.password}
            onChange={(evt:React.ChangeEvent<HTMLInputElement>) =>
              update({ key: 'password', value: evt.target.value })
            }
            autoComplete='off'
            required
          />
        </div>
        <div className={Classes.input}>
          <label htmlFor='cpassword'>Confirm password</label>
          <input
            type='password'
            id='cpassword'
            value={userDetail.cPassword}
            onChange={(evt:React.ChangeEvent<HTMLInputElement>) =>
              update({ key: 'cPassword', value: evt.target.value })
            }
            autoComplete='off'
            required
          />
        </div>
        <button type='submit'>Register</button>
        <p>
          Already registered? Login <NavLink to='/login'>here</NavLink>
        </p>
      </form>
    </div>
  );
}

import Classes from './Home.module.css';

import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Home() {
  return (
    <div className={Classes.home}>
      <p>
        Not registered yet?
        <br />
        Click <NavLink to='/signUp'>here</NavLink> to register
      </p>
      <p>
        Already registered?
        <br />
        LogIn <NavLink to='/login'>here</NavLink>
      </p>
    </div>
  );
}

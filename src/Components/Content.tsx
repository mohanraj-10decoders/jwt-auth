import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import customAxios from '../Axios';
import classes from './Content.module.css';

export default function Content() {
  let navigate = useNavigate();
  const [emp, setEmp] = useState([]);
  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };
  const getDetail = () => {
    customAxios
      .get('/auth/employees')
      .then((resp) => {
        setEmp(resp?.data?.data?.employees);
        // console.log(resp);
      })
      .catch((err) => console.error(err.message));
  };

  useEffect(() => console.log('emp', emp), [emp]);
  return (
    <>
      <button onClick={getDetail}>Get Employees</button>
      {emp?.map((employee, index) => {
        return <div id={index.toString()}>{index}</div>;
      })}
      <button onClick={logout} className={classes.logout}>
        Logout
      </button>
    </>
  );
}

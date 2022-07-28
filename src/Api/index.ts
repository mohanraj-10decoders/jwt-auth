import customAxios from '../Axios';
import { userLoginType } from '../Interfaces';

export const login = async (props: userLoginType) => {
  customAxios
    .post('/auth/login', props)
    .then((resp) => {
      console.log('resp data', resp);
      if (resp.data.status === 'Success') {
        localStorage.setItem('access_token', resp.data.token);
        localStorage.setItem('refresh_token', resp.data.refreshToken);
      } else {
      }
    })
    .catch((err) => console.error(err.message));
};

export const register = (props: userLoginType) => {
  customAxios
    .post('/auth/signup', props)
    .then((data) => console.log('resp data', data))
    .catch((err) => console.error(err.message));
};

export const refreshAccessToken = async () => {
  let token = localStorage.getItem('refresh_token');
  let resp = await customAxios.post('/auth/refresh', token);
  if (resp.status === 200) return true;
  return false;
};

export const getDetail = async () => {
  let resp = await customAxios.get('/auth/employees');
  console.log('getDetail resp', resp.data);
};

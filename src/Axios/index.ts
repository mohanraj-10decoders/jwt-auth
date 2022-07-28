import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'http://localhost:5000/',
});

customAxios.interceptors.request.use(
  async (config) => {
    const token: string | null = localStorage.getItem('access_token');
    config.headers = {
      'x-access-token': `${token}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// customAxios.interceptors.response.use(
//   (response) => {
//     console.log('response in interceptor', response);
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem('refreshToken');
//       axios.defaults.headers.common['x-access-token'] = `${refreshToken}`;
//       return customAxios(originalRequest);
//     }
//     console.log('err resp in inter', error);
//     return Promise.reject(error);
//   }
// );

export default customAxios;

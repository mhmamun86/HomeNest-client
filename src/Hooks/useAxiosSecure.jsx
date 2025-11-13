import useAuth from '@/Hooks/useAuth';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const apiSecure = axios.create({
  baseURL: 'https://homenest-api-server.vercel.app',
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const requestInterceptor = apiSecure.interceptors.request.use(
      async config => {
        if (user) {
          const token = await user.accessToken;
          // console.log(token, 'from hook');
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      }
    );

    const responseIntercepter = apiSecure.interceptors.response.use(
      res => {
        return res;
      },
      err => {
        console.log(err);
        const status = err.status;
        if (status === 401 || status === 403) {
          console.log('Bad request');
          logOut().then(() => {
            navigate('/login');
          });
        }
      }
    );

    return () => {
      apiSecure.interceptors.request.eject(requestInterceptor);
      apiSecure.interceptors.response.eject(responseIntercepter);
    };
  }, [user, logOut, navigate]);

  return apiSecure;
};

export default useAxiosSecure;

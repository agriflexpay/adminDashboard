import axios from 'axios';
import { useLocalStorage } from '../../AUTH/useLocalStorage';
// Replace 'your-api-key' with your actual API key
const [user, setUser] = useLocalStorage('user', null);
const apiKey = user.authToken

// Create a configured Axios instance with default headers
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:6002', // Replace with your API's base URL
  headers: {
    'Content-Type': 'application/json',
    'x-access-token': apiKey,
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    if(response.status==403){
      console.log(response)
      window.location.reload()
      return Promise.reject(error);
    }
    return response
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 403 &&
      originalRequest.url === 'http://localhost:6002/api/auth/refreshToken'
    ) {
      window.location.href = '/login';
      return Promise.reject(error);
    }

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = user.refreshToken;
      try {
        const { data } = await axiosInstance.post('/api/auth/refreshToken', {
          refreshToken,
        });
        setUser(data);
        axiosInstance.defaults.headers['x-access-token'] = data.authToken;
        return axiosInstance(originalRequest);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
    return Promise.reject(error);
  }
);
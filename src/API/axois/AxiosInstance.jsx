import axios from 'axios';
import { useLocalStorage } from '../../AUTH/useLocalStorage';
// Replace 'your-api-key' with your actual API key
const [user, setUser] = useLocalStorage('user', null);
const apiKey = user.authToken

// Create a configured Axios instance with default headers
const axiosInstance = axios.create({
  baseURL: 'https://api.example.com', // Replace with your API's base URL
  headers: {
    'Content-Type': 'application/json',
    'x-access-token': apiKey,
  },
});

export default axiosInstance;

import { createContext, useContext, useMemo,useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage"
import axios from 'axios';
const AuthContext = createContext({});
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [storedValue, setValue] = useLocalStorage("user", null);
  const navigate = useNavigate('');
  const [showtoast, setShowtoast] = useState(null);
  // call this function when you want to authenticate the user
  const login = async (data) => {
    setUser(data);
    navigate("/dashboard");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate("/login", { replace: true });
  };
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:6002/', // Replace with your API's base URL
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': user?.authToken,
    },
  });
  // axiosInstance.interceptors.response.use(
  //   (response) => {
     
  //     if (response.status === 403) {
  //       useLocalStorage("user", null);
  //        window.location.href = '/login';
  //       return Promise.reject(response);
  //     }
  //     return Promise.resolve(response);
  //   },
  //   async (error) => {
  //     // Handle error...
  //     const originalRequest = error.config;
  //     if (error.response.status === 403 && originalRequest.url === 'http://localhost:6002/api/auth/refreshToken') {
  //       useLocalStorage("user", null);
  //       window.location.href = '/login';
  //       return Promise.reject(error);
  //     }
  
  //     if (error.response.status === 403) {
  //       let retryCount = originalRequest.retryCount || 0;
  //       if (retryCount < 2) {
  //         originalRequest.retryCount = retryCount + 1;
  //         const refreshToken = user.refreshToken;
  //         try {
  //           const { data } = await axiosInstance.post('/api/auth/refreshToken', {
  //             refreshToken,
  //           });
  //           setUser(data);
  //           axiosInstance.defaults.headers['x-access-token'] = data.authToken;
  //           return axiosInstance(originalRequest);
  //         } catch (_error) {
            
  //           useLocalStorage("user", null);
  //            window.location.href = '/login';
  //           return Promise.reject(_error);
  //         }
  //       } else {
  //          window.location.href = '/login';
  //         useLocalStorage("user", null);
  //         return Promise.reject(error);
  //       }
  //     }
  //      window.location.href = '/login';
  //     useLocalStorage("user", null);
  //     return Promise.reject(error);
  //   }
  // );
  
  const showToastMessage = (text,type) => {
    if(type==="success"){
      toast.success(text);
  }
  else if(type==="error"){
      toast.error(text);
  }
  else if(type==="warning"){
      toast.warning(text);
  }
  else if(type==="info"){
      toast.info(text);
  }
  else if(type==="dark"){
      toast.dark(text);
  }
  else if(type==="default"){
      toast(text);
  }
  else{
      toast(text);
  }
  };
  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      axiosInstance,
      showToastMessage,
      showtoast,
      setShowtoast,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export const useAuth = () => {
  return useContext(AuthContext);
};
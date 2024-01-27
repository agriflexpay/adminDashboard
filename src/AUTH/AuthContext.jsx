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
    baseURL: 'http://localhost:6002', // Replace with your API's base URL
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': user?.authToken,
    },
  });
 
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
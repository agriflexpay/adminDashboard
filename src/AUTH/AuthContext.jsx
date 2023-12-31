import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage"
import axios from 'axios';
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [storedValue, setValue] = useLocalStorage("user", null);

  const navigate = useNavigate('');

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
  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      axiosInstance
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export const useAuth = () => {
  return useContext(AuthContext);
};
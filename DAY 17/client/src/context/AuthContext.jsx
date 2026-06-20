import { createContext, useContext, useEffect, useState } from 'react';
import { apiClient } from '../api/apiClient';

const AuthContext = createContext(null);
const STORAGE_KEY = 'day15-auth-user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const register = async (payload) => {
    const data = await apiClient.post('/auth/register', payload);
    setUser(data);
    return data;
  };

  const login = async (payload) => {
    const data = await apiClient.post('/auth/login', payload);
    setUser(data);
    return data;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

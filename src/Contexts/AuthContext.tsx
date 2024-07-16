import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Api/axios';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('authToken');

        console.log(token);

        if (token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await api.get('/user');
          setUser(response.data);
        } else {
          setUser(null);
          throw new Error('No token found');
        }
      } catch (error) {
        navigate('/login', { state: { error: 'Sessão expirada ou não autenticado. Faça login novamente.' } });
        throw error;
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [navigate]);

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });

      const token = response.data.access_token;
      localStorage.setItem('authToken', token);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const userResponse = await api.get('/user');
      setUser(userResponse.data);
    } catch (error) {
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('authToken');

      delete api.defaults.headers.common['Authorization'];
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
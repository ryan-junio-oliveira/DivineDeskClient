import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from '../Api/axios'; // Importar a configuração global do Axios

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

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        //TODO : BUSCAR O TOKEN LA NO BACK END
        const token = localStorage.getItem('authToken');

        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await axios.get('/user');
          setUser(response.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const response = await axios.post('/login', { email, password });

      const token = response.data.access_token;
      localStorage.setItem('authToken', token);

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const userResponse = await axios.get('/user');
      setUser(userResponse.data);

    } catch (error) {
      // console.error('Login failed', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post('/logout');
      localStorage.removeItem('authToken');

      delete axios.defaults.headers.common['Authorization'];
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
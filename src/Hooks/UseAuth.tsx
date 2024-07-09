// src/hooks/useAuth.ts
import { useContext } from 'react';
import AuthContext from '../Contexts/AuthContext';

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
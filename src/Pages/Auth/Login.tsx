import React from 'react';
import NavbarHome from '../../Components/Home/NavBarHome';
import LoginForm from '../../Components/Login/LoginForm';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/protected');
  };

  return (
    <>
      <NavbarHome />
      <div className='h-100'>
        <LoginForm onSuccess={handleLoginSuccess} />
      </div>
    </>
  );
};

export default Login;

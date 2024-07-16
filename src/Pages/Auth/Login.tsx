import React from 'react';
import NavbarHome from '../../Components/Home/NavBarHome';
import LoginForm from '../../Components/Login/LoginForm';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/dashboard');
  };

  const handleLoginFailure = () => {
    alert('Falha ao tentar realizar login. Verifique suas credenciais.');
  };

  return (
    <>
      <NavbarHome />
      <div className='h-100'>
        <LoginForm onSuccess={handleLoginSuccess} onFailure={handleLoginFailure} />
      </div>
    </>
  );
};

export default Login;
import React, { useState } from 'react';
import useAuth from '../../Hooks/UseAuth';
import { Form, Button, Container } from 'react-bootstrap';

interface LoginFormProps {
  onSuccess?: () => void; // Callback para sucesso no login
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      if (onSuccess) onSuccess(); // Chamada da função de sucesso, se fornecida
    } catch (error) {
      console.error('Login failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center">
      <Form onSubmit={handleSubmit} className="p-4 rounded shadow-lg bg-white m-auto">
        <h2 className='text-center'>Login</h2>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
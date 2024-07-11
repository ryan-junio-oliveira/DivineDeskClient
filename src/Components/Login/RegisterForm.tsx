import React, { useState } from 'react';
import axios from '../../Api/axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; general?: string }>({});

  const validateInputs = () => {
    const newErrors: { name?: string; email?: string; password?: string } = {};
    if (!name) newErrors.name = 'Nome é obrigatório.';
    if (!email) newErrors.email = 'Email é obrigatório.';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email inválido.';
    if (!password) newErrors.password = 'Senha é obrigatória.';
    else if (password.length < 6) newErrors.password = 'A senha deve ter pelo menos 6 caracteres.';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    setErrors({});
    try {
      await axios.post('/register', { name, email, password });
      if (onSuccess) onSuccess();
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Registration failed', error);
      setErrors({ general: 'Falha no registro. Por favor, tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="d-flex h-100">
      <Form onSubmit={handleSubmit} className="p-4 rounded shadow-lg bg-white mt-4 m-auto col-12 col-sm-5 gap-3 d-flex flex-column">
        <h2 className='text-center' id='titleForm'>Register</h2>
        {errors.general && <Alert variant="danger">{errors.general}</Alert>}
        <Form.Group className='w-100 m-auto' controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='w-100 m-auto' controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='w-100 m-auto' controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Button id="btnRegister" className='w-25 m-auto' variant="primary" type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Register'}
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterForm;

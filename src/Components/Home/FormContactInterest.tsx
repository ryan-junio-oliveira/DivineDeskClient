import React, { useState } from 'react';
import axios from '../../Api/axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const FormContactInterest: React.FC = () => {
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ phone?: string; email?: string; message?: string; general?: string }>({});
  const [success, setSuccess] = useState<string>('');

  const validateInputs = () => {
    const newErrors: { phone?: string; email?: string; message?: string } = {};
    if (!phone) newErrors.phone = 'Telefone é obrigatório.';
    if (!email) newErrors.email = 'Email é obrigatório.';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email inválido.';
    if (!message) newErrors.message = 'Mensagem é obrigatória.';
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
    setSuccess('');
    try {
      await axios.post('/new-interest', { phone, email, message });
      setSuccess('Mensagem enviada com sucesso!');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Falha no envio da mensagem', error);
      setErrors({ general: 'Falha no envio da mensagem. Por favor, tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="d-flex h-100">
      <Form onSubmit={handleSubmit} className="p-4 rounded shadow-lg bg-white mt-4 m-auto col-12 col-sm-5 gap-3 d-flex flex-column">
        <h2 className='text-center' id='titleForm'>Contato</h2>
        {errors.general && <Alert variant="danger">{errors.general}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form.Group className='w-100 m-auto' controlId="formBasicPhone">
          <Form.Label>Telefone</Form.Label>
          <Form.Control
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Insira seu telefone"
            isInvalid={!!errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='w-100 m-auto' controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Insira seu email"
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='w-100 m-auto' controlId="formBasicMessage">
          <Form.Label>Mensagem</Form.Label>
          <Form.Control
            as="textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escreva sua mensagem"
            rows={5}
            isInvalid={!!errors.message}
          />
          <Form.Control.Feedback type="invalid">
            {errors.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button id="btnSend" className='w-25 m-auto' variant="primary" type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </Button>
      </Form>
    </Container>
  );
};

export default FormContactInterest;
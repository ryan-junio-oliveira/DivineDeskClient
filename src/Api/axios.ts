import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    withCredentials: true, // Garante que as credenciais sejam enviadas com cada requisição
    withXSRFToken: true,
    headers: {
        'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
        'Accept': 'application/json', // Define o tipo de aceitação como JSON
    },
});

export default api;

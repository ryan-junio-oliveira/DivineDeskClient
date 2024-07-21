import axios from '../apis/axios.js';

export default {
    login(user) {
        return axios.post('/login', user);
    },
    logout() {
        return axios.post('/logout');
    },
    getUser() {
        return axios.get('/user');
    }
}
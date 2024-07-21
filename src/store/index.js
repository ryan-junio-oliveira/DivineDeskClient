import { createStore } from 'vuex';
import axios from '../apis/axios';

export default createStore({
  state: {
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || {},
    role: localStorage.getItem('role') || '',
    error: {
      general: '',
      email: '',
      password: ''
    },
  },
  mutations: {
    auth_success(state, { token, user }) {
      state.token = token;
      state.user = user;
      state.role = user.role || '';
      state.error = {
        general: '',
        email: '',
        password: ''
      };
    },
    logout(state) {
      state.token = '';
      state.user = {};
      state.role = '';
      state.error = {
        general: '',
        email: '',
        password: ''
      };
    },
    set_error(state, error) {
      state.error = error;
    }
  },
  actions: {
    async login({ commit }, user) {
      try {
        const resp = await axios.post('/auth/login', user);
        const token = resp.data.access_token;

        if (token) {
          const res = await axios.get('/user', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const user = res.data;

          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('role', user.role || '');

          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          commit('auth_success', { token, user });
          this.dispatch('redirectAfterLogin');
        } else {
          commit('set_error', { general: 'Erro ao realizar login' });
        }
      } catch (error) {
        const errorData = error.response?.data || {};
        commit('set_error', {
          general: errorData.message || 'Login ou senha incorretos',
          email: errorData.errors?.email || '',
          password: errorData.errors?.password || ''
        });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        delete axios.defaults.headers.common['Authorization'];
        throw error;
      }
    },

    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        delete axios.defaults.headers.common['Authorization'];
        resolve();
      });
    },

    redirectAfterLogin() {
      window.location.href = '/dashboard'; // Redireciona para a rota protegida
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    user: state => state.user,
    userRole: state => state.role,
    error: state => state.error
  },
});
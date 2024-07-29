<template>
  <div class="container-fluid d-flex h-100">
    <form @submit.prevent="handleSubmit" class="p-4 rounded shadow-lg bg-white mt-4 m-auto form-container d-flex flex-column gap-3">
      <h2 class="text-center" id="titleForm">Login</h2>

      <Alert :message="errors.general" variant="danger" />
      <Alert :message="errors.email" variant="danger" />
      <Alert :message="errors.password" variant="danger" />

      <div class="form-group w-100 m-auto">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" class="form-control" placeholder="Digite seu email"
          :class="{ 'is-invalid': !!errors.email }" />
        <div class="invalid-feedback" id="email-feedback">{{ errors.email }}</div>
      </div>

      <div class="form-group w-100 m-auto">
        <label for="password">Senha</label>
        <input id="password" type="password" v-model="password" class="form-control" placeholder="Senha"
          :class="{ 'is-invalid': !!errors.password }" />
        <div class="invalid-feedback" id="password-feedback">{{ errors.password }}</div>
      </div>

      <button id="btnLogin" class="btn btn-primary m-auto" type="submit" :disabled="loading">
        {{ loading ? 'Loading...' : 'Login' }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Alert from '../../components/ui/Alert.vue';

export default {
  components: {
    Alert
  },
  data() {
    return {
      email: '',
      password: '',
      loading: false
    };
  },
  computed: {
    ...mapGetters(['error']),
    errors() {
      return this.error || { general: '', email: '', password: '' };
    }
  },
  methods: {
    ...mapActions(['login']),
    async handleSubmit() {
      this.loading = true;
      try {
        await this.login({ email: this.email, password: this.password });
        this.$router.push('/dashboard'); // Redireciona para a rota protegida
      } catch (error) {
        // Mensagens de erro já definidas pela Vuex mutation
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.form-container {
  width: 100%;
  max-width: 600px;
}

@media (max-width: 767px) {
  .form-container {
    width: 90%;
  }
}

@media (min-width: 768px) {
  .form-container {
    width: 60%;
  }
}
</style>

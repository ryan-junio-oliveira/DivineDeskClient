<template>
  <b-container fluid class="d-flex h-100">
    <b-form @submit.prevent="handleSubmit"
      class="p-4 rounded shadow-lg bg-white mt-4 m-auto form-container d-flex flex-column">
      <h2 class="text-center" id="titleForm">Login</h2>
      <b-alert v-if="errors.general" variant="danger">{{ errors.general }}</b-alert>
      <b-alert v-if="errors.email" variant="danger">{{ errors.email }}</b-alert>
      <b-alert v-if="errors.password" variant="danger">{{ errors.password }}</b-alert>

      <b-form-group class="w-100 m-auto" label="Email" label-for="email">
        <b-form-input id="email" type="email" v-model="email" placeholder="Enter email"
          :state="!!errors.email ? false : null" />
        <b-form-invalid-feedback id="email-feedback">{{ errors.email }}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group class="w-100 m-auto" label="Senha" label-for="password">
        <b-form-input id="password" type="password" v-model="password" placeholder="Password"
          :state="!!errors.password ? false : null" />
        <b-form-invalid-feedback id="password-feedback">{{ errors.password }}</b-form-invalid-feedback>
      </b-form-group>

      <b-button id="btnLogin" class="w-25 m-auto" variant="primary" type="submit" :disabled="loading">
        {{ loading ? 'Loading...' : 'Login' }}
      </b-button>
    </b-form>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { BContainer, BForm, BFormGroup, BFormInput, BButton, BFormInvalidFeedback, BAlert } from 'bootstrap-vue-3';

export default {
  components: {
    BContainer,
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
    BFormInvalidFeedback,
    BAlert
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
      return {
        general: this.error.general || '',
        email: this.error.email || '',
        password: this.error.password || ''
      };
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
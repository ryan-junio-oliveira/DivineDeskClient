<template>
  <div v-if="showRegisterModal" class="modal fade show" style="display: block;" tabindex="-1" role="dialog"
    aria-labelledby="registerMemberModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-nav">
          <h5 class="modal-title">Cadastrar Novo Membro</h5>
          <button type="button" class="btn-close btn-close-white" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="name" class="form-label">Nome</label>
              <input type="text" placeholder="Digite o nome" class="form-control" id="name" v-model="form.name"
                required>
            </div>
            <div class="mb-3">
              <label for="last_name" class="form-label">Sobrenome</label>
              <input type="text" placeholder="Digite o sobrenome" class="form-control" id="lastName"
                v-model="form.last_name" required>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" placeholder="Digite o Email" class="form-control" id="email" v-model="form.email"
                required>
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label">Telefone</label>
              <input type="text" placeholder="Digite o Telefone" class="form-control" id="phone" v-model="form.tel"
                required>
            </div>
            <div class="mb-3">
              <label for="text" class="form-label">Endereço</label>
              <input type="text" placeholder="Digite o Endereço" class="form-control" id="phone" v-model="form.address"
                required>
            </div>
            <div class="mb-3">
              <label for="text" class="form-label">Estado Civil</label>
              <input type="text" placeholder="Digite o Estado Civil" class="form-control" id="phone"
                v-model="form.marital_status" required>
            </div>
            <button type="submit" id="btnRegister" class="btn btn-primary">Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import memberService from '../../services/memberService';

export default {
  name: 'RegisterMemberModal',
  props: {
    showRegisterModal: Boolean
  },
  data() {
    return {
      form: {
        name: '',
        last_name: '',
        email: '',
        tel: '',
        address: '',
        marital_status: ''
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        const token = localStorage.getItem('token');
        await memberService.addMember(this.form, token);
        this.$emit('member-registered');
        this.closeModal();
      } catch (error) {
      }
    },
    closeModal() {
      this.$emit('close-register-modal');
    }
  }
};
</script>

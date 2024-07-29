<template>
  <div class="modal fade" id="register-member-modal" tabindex="-1" aria-labelledby="registerMemberModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="registerMemberModalLabel">Cadastrar Novo Membro</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="name" class="form-label">Nome</label>
              <input type="text" class="form-control" id="name" v-model="form.name" required>
            </div>

            <div class="mb-3">
              <label for="age" class="form-label">Idade</label>
              <input type="number" class="form-control" id="age" v-model="form.age" required>
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" v-model="form.email" required>
            </div>

            <div class="mb-3">
              <label for="phone" class="form-label">Telefone</label>
              <input type="text" class="form-control" id="phone" v-model="form.phone" required>
            </div>

            <button type="submit" class="btn btn-primary">Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterMemberModal',
  data() {
    return {
      form: {
        name: '',
        age: '',
        email: '',
        phone: ''
      }
    };
  },
  methods: {
    submitForm() {
      console.log('Form Data:', this.form);
      // Aqui você pode adicionar a lógica para salvar os dados do formulário
      this.$bvModal.hide('register-member-modal');
    }
  }
};
</script>

<style scoped>
/* Adicione estilos customizados, se necessário */
</style>
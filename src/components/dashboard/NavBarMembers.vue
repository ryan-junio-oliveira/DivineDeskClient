<template>
    <div>
        <nav class="navbar navbar-dark bg-nav">
            <div class="container-fluid d-flex justify-content-between align-items-center w-100">
                <a class="navbar-brand text-white" href="#">
                    <h4>Membros</h4>
                </a>
                <div class="d-flex gap-2">
                    <form class="d-flex gap-1">
                        <input class="form-control form-control-sm mr-sm-2" type="search" placeholder="Pesquisar"
                            aria-label="Search">
                        <button class="btn btn-light btn-sm my-2 my-sm-0" type="submit">Pesquisar</button>
                    </form>
                    <button class="btn btn-light btn-sm" @click="openModal">
                        Novo membro
                    </button>
                </div>
            </div>
        </nav>

        <div v-if="showModal" class="modal fade show" style="display: block;" tabindex="-1" role="dialog"
            aria-labelledby="registerMemberModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-nav">
                        <h5 class="modal-title">Cadastrar Novo Membro</h5>
                        <button type="button" class="btn-close btn-close-white" @click="closeModal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="submitForm">
                            <div class="mb-3">
                                <label for="name" class="form-label">Nome</label>
                                <input type="text" placeholder="Digite o nome" class="form-control" id="name"
                                    v-model="form.name" required>
                            </div>
                            <div class="mb-3">
                                <label for="last_name" class="form-label">Sobrenome</label>
                                <input type="text" placeholder="Digite o sobrenome" class="form-control" id="lastName"
                                    v-model="form.last_name" required>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" placeholder="Digite o Email" class="form-control" id="email"
                                    v-model="form.email" required>
                            </div>
                            <div class="mb-3">
                                <label for="phone" class="form-label">Telefone</label>
                                <input type="text" placeholder="Digite o Telefone" class="form-control" id="phone"
                                    v-model="form.tel" required>
                            </div>
                            <div class="mb-3">
                                <label for="text" class="form-label">Endereço</label>
                                <input type="text" placeholder="Digite o Endereço" class="form-control" id="phone"
                                    v-model="form.address" required>
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

        <!-- Modal -->
        <div v-if="showModal" class="modal-backdrop fade show" style="display: block;"></div>
    </div>
</template>

<script>

import axios from '../../apis/axios';

export default {
    name: 'NavbarComponent',
    data() {
        return {
            form: {
                name: '',
                age: '',
                email: '',
                phone: ''
            },
            showModal: false
        };
    },
    methods: {
        openModal() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        async submitForm() {
            try {
                const token = localStorage.getItem('token');

                await axios.post('/members/store', this.form, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                await this.getMembers();
                this.showEditModal = false;
            } catch (error) {
                console.error('Erro ao salvar dados:', error);
            } finally {
                this.closeModal();
            }
        },
    }
};
</script>

<style scoped>
.modal-backdrop {
    z-index: 1050;
}

.modal {
    z-index: 1060;
}
</style>

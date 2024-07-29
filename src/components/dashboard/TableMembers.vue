<template>
    <div>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Sobrenome</th>
                    <th>Telefone</th>
                    <th>Email</th>
                    <th>Estado civil</th>
                    <th>Acões</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="Array.isArray(items.data) && items.data.length === 0">
                    <td colspan="4" class="text-center">Nenhum membro cadastrado</td>
                </tr>
                <tr v-else v-for="item in items.data" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.last_name }}</td>
                    <td>{{ item.teste }}</td>
                    <td>{{ item.teste }}</td>
                    <td>{{ item.teste }}</td>
                    <td>
                        <button id="btnEdit" class="btn btn-sm btn-primary me-2" @click="openEditModal(item)">
                            <font-awesome-icon icon="edit" />
                        </button>
                        <button class="btn btn-sm btn-danger" @click="openDeleteModal(item)">
                            <font-awesome-icon icon="trash" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Modal de Edição -->
        <div v-if="showEditModal" class="modal fade show" style="display: block;" tabindex="-1" role="dialog"
            aria-labelledby="editMemberModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-nav">
                        <h5 class="modal-title" id="editMemberModalLabel">Editar Membro</h5>
                        <button type="button" class="btn-close btn-close-white" @click="closeEditModal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="submitForm">
                            <div class="mb-3">
                                <label for="edit-name" class="form-label">Nome</label>
                                <input type="text" class="form-control" id="edit-name" v-model="form.name" required>
                            </div>
                            <div class="mb-3">
                                <label for="edit-age" class="form-label">Idade</label>
                                <input type="number" class="form-control" id="edit-age" v-model="form.age" required>
                            </div>
                            <div class="mb-3">
                                <label for="edit-email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="edit-email" v-model="form.email" required>
                            </div>
                            <div class="mb-3">
                                <label for="edit-phone" class="form-label">Telefone</label>
                                <input type="text" class="form-control" id="edit-phone" v-model="form.phone" required>
                            </div>
                            <button type="submit" id="btnEdit" class="btn btn-primary">Salvar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de Confirmação de Exclusão -->
        <div v-if="showDeleteModal" class="modal fade show" style="display: block;" tabindex="-1" role="dialog"
            aria-labelledby="deleteMemberModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-nav">
                        <h5 class="modal-title" id="deleteMemberModalLabel">Confirmar Exclusão</h5>
                        <button type="button" class="btn-close btn-close-white" @click="closeDeleteModal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Tem certeza de que deseja excluir o membro {{ currentItem.first_name }} {{
                            currentItem.last_name }}?</p>
                        <div class="d-flex gap-2">
                            <button class="btn btn-danger" @click="confirmDelete">Excluir</button>
                            <button class="btn btn-primary" id="btnCancel" @click="closeDeleteModal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Backdrop -->
        <div v-if="showEditModal || showDeleteModal" class="modal-backdrop fade show" style="display: block;"></div>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from '../../apis/axios'; // Ajuste o caminho conforme necessário

library.add(faEdit, faTrash);

export default {
    name: 'TableComponent',
    components: {
        FontAwesomeIcon
    },
    data() {
        return {
            items: [],
            form: {
                name: '',
                age: '',
                email: '',
                phone: ''
            },
            currentItem: null,
            showEditModal: false,
            showDeleteModal: false
        };
    },
    async created() {
        await this.getMembers();
    },
    methods: {
        async getMembers() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/members/all', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                this.items = response.data;
            } catch (error) {
                console.error('Erro ao carregar membros:', error);
            }
        },
        openEditModal(item) {
            this.currentItem = item;
            this.form = { ...item };
            this.showEditModal = true;
        },
        closeEditModal() {
            this.showEditModal = false;
        },
        openDeleteModal(item) {
            this.currentItem = item;
            this.showDeleteModal = true;
        },
        closeDeleteModal() {
            this.showDeleteModal = false;
        },
        async confirmDelete() {
            try {
                await axios.deleteItem(this.currentItem.id); // Substitua pelo método correto do seu serviço
                this.items = this.items.filter(item => item.id !== this.currentItem.id);
                this.closeDeleteModal();
            } catch (error) {
                console.error('Erro ao excluir item:', error);
            }
        },
        async submitForm() {
            try {
                if (this.currentItem) {
                    await axios.updateItem(this.currentItem.id, this.form); // Substitua pelo método correto do seu serviço
                } else {
                    await axios.createItem(this.form); // Substitua pelo método correto do seu serviço
                }
                await this.getMembers();
                this.showEditModal = false;
            } catch (error) {
                console.error('Erro ao salvar dados:', error);
            }
        }
    }
};
</script>

<style scoped>
/* No additional styles needed, relying on Bootstrap for styling */
</style>

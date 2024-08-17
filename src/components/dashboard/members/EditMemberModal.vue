<template>
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
                            <label for="edit-last-name" class="form-label">Sobrenome</label>
                            <input type="text" class="form-control" id="edit-last-name" v-model="form.last_name"
                                required>
                        </div>
                        <div class="mb-3">
                            <label for="edit-email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="edit-email" v-model="form.email" required>
                        </div>
                        <div class="mb-3">
                            <label for="edit-tel" class="form-label">Telefone</label>
                            <input type="text" class="form-control" id="edit-tel" v-model="form.tel" required>
                        </div>
                        <div class="mb-3">
                            <label for="edit-address" class="form-label">Endereço</label>
                            <input type="text" class="form-control" id="edit-address" v-model="form.address" required>
                        </div>
                        <div class="mb-3">
                            <label for="edit-marital-status" class="form-label">Estado Civil</label>
                            <input type="text" class="form-control" id="edit-marital-status"
                                v-model="form.marital_status" required>
                        </div>
                        <button type="submit" id="btnEdit" class="btn btn-primary">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <Notification v-if="notification" :message="notification.message" :type="notification.type" />
</template>

<script>
import Notification from '../../../components/ui/Notification.vue';
import memberService from '../../../services/memberService';

export default {
    name: 'EditMemberModal',
    components: {
        Notification
    },
    props: {
        showEditModal: Boolean,
        item: Object
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
            },
            notification: null
        };
    },
    watch: {
        item: {
            immediate: true,
            handler(newValue) {
                if (newValue) {
                    this.form = { ...newValue };
                }
            }
        }
    },
    methods: {
        closeEditModal() {
            this.$emit('close-edit-modal');
        },
        async submitForm() {
            try {
                const response = await memberService.editMember(this.form);
                this.$emit('member-updated');
                this.closeEditModal();
                this.showNotification('Membro editado com successo', 'success');
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'An error occurred';
                this.showNotification(errorMessage, 'error');
            }
        },
        showNotification(message, type = 'error', duration = 3000) {
            this.notification = { message, type, duration };
            setTimeout(() => {
                this.notification = null;
            }, duration);
        }
    }
};
</script>

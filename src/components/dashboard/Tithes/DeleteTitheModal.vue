<template>
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
                    <p>Tem certeza de que deseja excluir o dízimo de {{ item.member_name }}?</p>
                    <div class="d-flex gap-2">
                        <button class="btn btn-danger" @click="confirmDelete">Excluir</button>
                        <button class="btn btn-primary" id="btnCancel" @click="closeDeleteModal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Notification v-if="notification" :message="notification.message" :type="notification.type" />
</template>

<script>
import Notification from '../../../components/ui/Notification.vue';
import titheService from '../../../services/titheService';

export default {
    name: 'RegisterTitheModal',
    components: {
        Notification
    },
    props: {
        showDeleteModal: Boolean,
        item: Object
    },
    data() {
        return {
            notification: null
        };
    },
    methods: {
        closeDeleteModal() {
            this.$emit('close-delete-modal');
        },
        async confirmDelete() {
            try {
                const response = await titheService.deleteTithe(this.item.id);
                this.$emit('tithe-deleted');
                this.closeDeleteModal();
                this.showNotification('Dízimo deletado com sucesso!', 'success');
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

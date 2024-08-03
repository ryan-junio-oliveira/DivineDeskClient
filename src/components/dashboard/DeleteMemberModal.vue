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
                    <p>Tem certeza de que deseja excluir o membro {{ item.name }} {{ item.last_name }}?</p>
                    <div class="d-flex gap-2">
                        <button class="btn btn-danger" @click="confirmDelete">Excluir</button>
                        <button class="btn btn-primary" id="btnCancel" @click="closeDeleteModal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../../apis/axios';
import memberService from '../../services/memberService';

export default {
    props: {
        showDeleteModal: Boolean,
        item: Object
    },
    methods: {
        closeDeleteModal() {
            this.$emit('close-delete-modal');
        },
        async confirmDelete() {
            try {
                const response = await memberService.deleteMember(this.item.id);
                this.$emit('member-deleted');
                this.closeDeleteModal();
            } catch (error) {
                //todo: alert error
            }
        }
    }
};
</script>

<template>
    <div v-if="showEditModal" class="modal fade show" style="display: block;" tabindex="-1" role="dialog"
        aria-labelledby="editTitheModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-nav">
                    <h5 class="modal-title" id="editTitheModalLabel">Editar Dízimo: {{ item.id }}</h5>
                    <button type="button" class="btn-close btn-close-white" @click="closeEditModal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submitForm">
                        <div class="mb-3">
                            <select class="form-select" v-model="form.member_id">
                                <option v-if="Array.isArray(members.data) && members.data.length === 0" value=""
                                    disabled>
                                    Não há membros cadastrados
                                </option>
                                <option value="" selected>Selecione o membro</option>
                                <option v-for="member in members.data" :key="member.id" :value="member.id">
                                    {{ member.name }}
                                </option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="value" class="form-label">Valor</label>
                            <input type="number" placeholder="Digite o valor" class="form-control" id="value"
                                v-model="form.value" required>
                        </div>

                        <div class="mb-3">
                            <label for="date" class="form-label">Data</label>
                            <input type="date" class="form-control" id="date" v-model="form.date" required>
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
import titheService from '../../../services/titheService';
import memberService from '../../../services/memberService';

export default {
    name: 'EditTitheModal.vue',
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
                member_id: '',
                value: '',
                date: ''
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
                const response = await titheService.editTithe(this.form);
                this.$emit('tithe-updated');
                this.closeEditModal(); 
                this.showNotification('Dízimo editado com sucesso!', 'success');
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'An error occurred';
                this.showNotification(errorMessage, 'error');
            }
        },
        async getMembers() {
            try {
                this.members = await memberService.allMembers();
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
    },
    created() {
        this.getMembers();
    }
};
</script>

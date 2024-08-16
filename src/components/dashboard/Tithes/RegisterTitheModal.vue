<template>
    <div v-if="showRegisterModal" class="modal fade show" style="display: block;" tabindex="-1" role="dialog"
        aria-labelledby="registerTitheModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-nav">
                    <h5 class="modal-title">Adicionar novo dízimo</h5>
                    <button type="button" class="btn-close btn-close-white" @click="closeModal"
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

                        <button type="submit" id="btnRegister" class="btn btn-primary">Adicionar</button>
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
    name: 'RegisterTitheModal',
    components: {
        Notification
    },
    props: {
        showRegisterModal: Boolean
    },
    data() {
        return {
            members: {
                data: []
            },
            form: {
                member_id: '',
                value: '',
                date: ''
            },
            notification: null
        };
    },
    methods: {
        async submitForm() {
            try {
                await titheService.addTithes(this.form);
                this.$emit('tithe-registered');
                this.closeModal();
                this.showNotification('Dízimo registrado com sucesso!', 'success');
            } catch (error) {
                this.closeModal();
                const errorMessage = error.response?.data?.message || 'An error occurred';
                this.showNotification(errorMessage, 'error');
            }
        },
        closeModal() {
            this.$emit('close-register-modal');
        },
        async getMembers() {
            try {
                this.members = await memberService.allMembers();
            } catch (error) {
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
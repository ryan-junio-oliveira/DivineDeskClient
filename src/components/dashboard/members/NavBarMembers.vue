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
                    <button class="btn btn-light btn-sm" @click="openRegisterModal">
                        Novo membro
                    </button>
                </div>
            </div>
        </nav>

        <RegisterMemberModal :showRegisterModal="showRegisterModal"
            @close-register-modal="showRegisterModal = false" @member-registered="getMembers" />

        <!-- Modal -->
        <div v-if="showRegisterModal" class="modal-backdrop fade show" style="display: block;"></div>
    </div>
</template>

<script>
import RegisterMemberModal from './RegisterMemberModal.vue';
import memberService from '../../../services/memberService';

export default {
    name: 'NavbarComponent',
    components: {
        RegisterMemberModal
    },
    data() {
        return {
            showRegisterModal: false
        };
    },
    methods: {
        openRegisterModal() {
            this.showRegisterModal = true;
        },
        closeRegisterModal() {
            this.showRegisterModal = false;
        },
        async getMembers() {
            try {
                const members = await memberService.allMembers();
                this.$emit('member-registered', members);
            } catch (error) {
            }
        }
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

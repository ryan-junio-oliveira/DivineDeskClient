<template>
    <div>
        <nav class="navbar navbar-dark bg-nav">
            <div class="container-fluid d-flex justify-content-between align-items-center w-100">
                <a class="navbar-brand text-white" href="#">
                    <h4>Dízimos</h4>
                </a>
                <div class="d-flex gap-2">
                    <form class="d-flex gap-1">
                        <input class="form-control form-control-sm mr-sm-2" type="search" placeholder="Pesquisar"
                            aria-label="Search">
                        <button class="btn btn-light btn-sm my-2 my-sm-0" type="submit">Pesquisar</button>
                    </form>
                    <button class="btn btn-light btn-sm" @click="openRegisterModal">
                        Novo Dízimo
                    </button>
                </div>
            </div>
        </nav>

        <RegisterTitheModal :showRegisterModal="showRegisterModal"
            @close-register-modal="showRegisterModal = false" @tithe-registered="getTithes" />

        <!-- Modal Backdrop -->
        <div v-if="showRegisterModal" class="modal-backdrop fade show"></div>
    </div>
</template>

<script>
import RegisterTitheModal from './RegisterTitheModal.vue';
import titheService from '../../../services/titheService';

export default {
    name: 'NavbarComponent',
    components: {
        RegisterTitheModal
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
        async getTithes() {
            try {
                const tithes = await titheService.allTithes();
                this.$emit('tithes-registered', tithes);
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

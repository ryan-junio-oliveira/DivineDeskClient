<template>
    <div>
        <nav class="navbar navbar-dark bg-nav">
            <div class="container-fluid d-flex justify-content-between align-items-center w-100">
                <a class="navbar-brand text-white" href="#">
                    <h4>Ofertas</h4>
                </a>
                <div class="d-flex gap-2">
                    <form class="d-flex gap-1">
                        <input class="form-control form-control-sm mr-sm-2" type="search" placeholder="Pesquisar"
                            aria-label="Search">
                        <button class="btn btn-light btn-sm my-2 my-sm-0" type="submit">Pesquisar</button>
                    </form>
                    <button class="btn btn-light btn-sm" @click="openRegisterModal">
                        Nova Oferta
                    </button>
                </div>
            </div>
        </nav>

        <RegisterOfferModal :showRegisterModal="showRegisterModal"
            @close-register-modal="showRegisterModal = false" @offer-registered="getOffers" />

        <!-- Modal Backdrop -->
        <div v-if="showRegisterModal" class="modal-backdrop fade show"></div>
    </div>
</template>

<script>
import RegisterOfferModal from './RegisterOfferModal.vue';
import offerService from '../../../services/offerService';

export default {
    name: 'NavbarComponent',
    components: {
        RegisterOfferModal
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
        async getOffers() {
            try {
                const offers = await offerService.allOffers();
                console.log(offers);
                this.$emit('offers-registered', offers);
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

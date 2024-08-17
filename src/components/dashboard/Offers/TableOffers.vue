<template>
    <div>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Valor</th>
                    <th>Data</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="Array.isArray(items.data) && items.data.length === 0">
                    <td class="text-center" colspan="5">Nenhuma oferta registrada</td>
                </tr>
                <tr v-else v-for="item in items.data" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.value }}</td>
                    <td>{{ item.date }}</td>
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

        <EditOfferModal :showEditModal="showEditModal" :item="currentItem" @close-edit-modal="showEditModal = false"
            @offer-updated="getOffers" />
        <DeleteOfferModal :showDeleteModal="showDeleteModal" :item="currentItem"
            @close-delete-modal="showDeleteModal = false" @offer-deleted="getOffers" />

        <!-- Backdrop -->
        <div v-if="showEditModal || showDeleteModal || showOfferModal" class="modal-backdrop fade show" style="display: block;"></div>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrash, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import offerService from '../../../services/offerService';
import EditOfferModal from './EditOfferModal.vue';
import DeleteOfferModal from './DeleteOfferModal.vue';

library.add(faEdit, faTrash, faCircleInfo);

export default {
    name: 'TableComponent',
    components: {
        FontAwesomeIcon, EditOfferModal, DeleteOfferModal
    },
    props: {
        refresh: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            items: {
                data: []
            },
            currentItem: null,
            showEditModal: false,
            showDeleteModal: false,
            showRegisterModal: false,
            showOfferModal: false
        };
    },
    async created() {
        await this.getOffers();
    },
    methods: {
        async getOffers() {
            try {
                this.items = await offerService.allOffers();
            } catch (error) {
            }
        },
        async openEditModal(item) {
            const data = await offerService.showOffer(item.id);
            this.currentItem = { ...data };
            this.showEditModal = true;
        },
        openDeleteModal(item) {
            this.currentItem = { ...item };
            this.showDeleteModal = true;
        },
        openRegisterModal() {
            this.showRegisterModal = true;
        },
    },
    watch: {
    refresh: {
        immediate: true,
        handler() {
            this.getOffers();
        }
    }
}

};
</script>

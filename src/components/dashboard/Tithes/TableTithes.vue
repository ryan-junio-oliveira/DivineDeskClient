<template>
    <div>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Valor</th>
                    <th>Membro</th>
                    <th>Data</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="Array.isArray(items.data) && items.data.length === 0">
                    <td class="text-center" colspan="5">Nenhum dizimo registrado</td>
                </tr>
                <tr v-else v-for="item in items.data" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.member_name }}</td>
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

        <EditTitheModal :showEditModal="showEditModal" :item="currentItem" @close-edit-modal="showEditModal = false"
            @tithe-updated="getTithes" />
        <DeleteTitheModal :showDeleteModal="showDeleteModal" :item="currentItem"
            @close-delete-modal="showDeleteModal = false" @tithe-deleted="getTithes" />

        <!-- Backdrop -->
        <div v-if="showEditModal || showDeleteModal || showTitheModal" class="modal-backdrop fade show" style="display: block;"></div>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrash, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import titheService from '../../../services/titheService';
import EditTitheModal from './EditTitheModal.vue';
import DeleteTitheModal from './DeleteTitheModal.vue';

library.add(faEdit, faTrash, faCircleInfo);

export default {
    name: 'TableComponent',
    components: {
        FontAwesomeIcon, EditTitheModal, DeleteTitheModal
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
            showTitheModal: false
        };
    },
    async created() {
        await this.getTithes();
    },
    methods: {
        async getTithes() {
            try {
                this.items = await titheService.allTithes();
            } catch (error) {
            }
        },
        async openEditModal(item) {
            const data = await titheService.showTithe(item.id);
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
            this.getTithes();
        }
    }
}

};
</script>

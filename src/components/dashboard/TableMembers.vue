<template>
    <div>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Sobrenome</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="Array.isArray(items.data) && items.data.length === 0">
                    <td class="text-center" colspan="3">Nenhum membro cadastrado</td>
                </tr>
                <tr v-else v-for="item in items.data" :key="item.id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.last_name }}</td>
                    <td>
                        <button id="btnDetails" class="btn btn-sm btn-secondary me-2" @click="openDetailsModal(item)">
                            <font-awesome-icon icon="circle-info" />
                        </button>
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

        <EditMemberModal :showEditModal="showEditModal" :item="currentItem" @close-edit-modal="showEditModal = false"
            @member-updated="getMembers" />
        <DeleteMemberModal :showDeleteModal="showDeleteModal" :item="currentItem"
            @close-delete-modal="showDeleteModal = false" @member-deleted="getMembers" />

        <!-- Backdrop -->
        <div v-if="showEditModal || showDeleteModal" class="modal-backdrop fade show" style="display: block;"></div>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrash, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import axios from '../../apis/axios';
import memberService from '../../services/memberService';
import EditMemberModal from './EditMemberModal.vue';
import DeleteMemberModal from './DeleteMemberModal.vue';

library.add(faEdit, faTrash, faCircleInfo);

export default {
    name: 'TableComponent',
    components: {
        FontAwesomeIcon, EditMemberModal, DeleteMemberModal
    },
    data() {
        return {
            items: [],
            currentItem: null,
            showEditModal: false,
            showDeleteModal: false
        };
    },
    async created() {
        this.items = await memberService.allMembers();
    },
    methods: {
        async openEditModal(item) {
            this.currentItem = await this.showMemberEdit(item.id);
            this.showEditModal = true;

        },
        async showMemberEdit(id) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`/members/show/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                return response.data;
            } catch (error) {
            }
        },
        openDeleteModal(item) {
            this.currentItem = { ...item };
            this.showDeleteModal = true;
        },
        openDetailsModal(item) {
            // Implement the logic for the details modal if needed
        }
    }
};
</script>

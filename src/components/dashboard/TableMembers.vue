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
        <ShowMemberModal :showMemberModal="showMemberModal" :item="currentItem"
            @close-show-member-modal="showMemberModal = false" />

        <!-- Backdrop -->
        <div v-if="showEditModal || showDeleteModal || showMemberModal" class="modal-backdrop fade show" style="display: block;"></div>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrash, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import memberService from '../../services/memberService';
import EditMemberModal from './EditMemberModal.vue';
import DeleteMemberModal from './DeleteMemberModal.vue';
import ShowMemberModal from './ShowMemberModal.vue';

library.add(faEdit, faTrash, faCircleInfo);

export default {
    name: 'TableComponent',
    components: {
        FontAwesomeIcon, EditMemberModal, DeleteMemberModal, ShowMemberModal
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
            showMemberModal: false
        };
    },
    async created() {
        await this.getMembers();
    },
    methods: {
        async getMembers() {
            try {
                this.items = await memberService.allMembers();
            } catch (error) {
            }
        },
        async openEditModal(item) {
            const data = await memberService.showMember(item.id);
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
        async openDetailsModal(item) {
            const data = await memberService.showMember(item.id);
            this.currentItem = { ...data };
            console.log(this.currentItem);
            this.showMemberModal = true;
        }
    },
    watch: {
    refresh: {
        immediate: true,
        handler() {
            this.getMembers();
        }
    }
}

};
</script>

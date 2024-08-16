<template>
    <div v-if="showMemberModal" class="modal fade show" style="display: block;" tabindex="-1" role="dialog"
        aria-labelledby="showMemberModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-nav">
                    <h5 class="modal-title" id="showMemberModalLabel">Informações Membro</h5>
                    <button type="button" class="btn-close btn-close-white" @click="closeShowMemberModal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Nome:</strong> {{ item.name }}</li>
                        <li class="list-group-item"><strong>Sobrenome:</strong> {{ item.last_name }}</li>
                        <li class="list-group-item"><strong>Email:</strong> {{ item.email }}</li>
                        <li class="list-group-item"><strong>Telefone:</strong> {{ item.tel }}</li>
                        <li class="list-group-item"><strong>Endereço:</strong> {{ item.address }}</li>
                        <li class="list-group-item"><strong>Estado Civil:</strong> {{ item.marital_status }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../../../apis/axios';
import memberService from '../../../services/memberService';

export default {
    props: {
        showMemberModal: Boolean,
        item: Object
    },
    data() {
        return {};
    },
    methods: {
        closeShowMemberModal() {
            this.$emit('close-show-member-modal');
        }
    }
};
</script>

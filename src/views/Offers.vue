<template>
    <div>
        <div class="app-container">
            <Sidebar :is-collapsed="isCollapsed" />
            <div :class="['content', { 'content-collapsed': isCollapsed }]">
                <NavBarOffers @offers-registered="updateTableOffers" />
                <TableOffers :refresh="refreshTrigger" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Sidebar from '../components/dashboard/Sidebar.vue';
import NavBarOffers from '../components/dashboard/Offers/NavBarOffers.vue';
import TableOffers from '../components/dashboard/Offers/TableOffers.vue';
import useCollapse from '../hooks/collapse.js';

const { isCollapsed } = useCollapse();

const refreshTrigger = ref(false);

const updateTableOffers = () => {
    refreshTrigger.value = !refreshTrigger.value;
};
</script>

<style scoped>
.app-container {
    display: flex;
}

.content {
    margin-left: 250px;
    padding: 1rem;
    flex: 1;
    transition: margin-left 0.3s;
}

.content-collapsed {
    margin-left: 80px;
}
</style>

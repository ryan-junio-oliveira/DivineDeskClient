<template>
    <div>
        <div class="app-container">
            <Sidebar :is-collapsed="isCollapsed" />
            <div :class="['content', { 'content-collapsed': isCollapsed }]">
                <NavBarMembers @member-registered="updateTableMembers" />
                <TableMembers :refresh="refreshTrigger" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Sidebar from '../components/dashboard/Sidebar.vue';
import TableMembers from '../components/dashboard/TableMembers.vue';
import NavBarMembers from '../components/dashboard/NavBarMembers.vue';

const isCollapsed = ref(window.innerWidth <= 768);

const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
};

const handleResize = () => {
    isCollapsed.value = window.innerWidth <= 768;
};

onMounted(() => {
    window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
});

const refreshTrigger = ref(false);

const updateTableMembers = () => {
    refreshTrigger.value = !refreshTrigger.value;
};
</script>

<style scoped>
.app-container {
    display: flex;
}

.content {
    margin-left: 200px;
    padding: 1rem;
    flex: 1;
    transition: margin-left 0.3s;
}

.content-collapsed {
    margin-left: 80px;
}
</style>

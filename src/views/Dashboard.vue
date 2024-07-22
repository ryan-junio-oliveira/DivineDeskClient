<template>
    <div>
      <NavBarHome :class="{'navbar-collapsed': isCollapsed}" @toggle-sidebar="toggleSidebar" />
      <div class="app-container">
        <Sidebar :is-collapsed="isCollapsed" />
        <div :class="['content', { 'content-collapsed': isCollapsed }]">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Sidebar from '../components/dashboard/Sidebar.vue';
  
  const isCollapsed = ref(window.innerWidth <= 768);
  
  const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
  };
  
  window.addEventListener('resize', () => {
    isCollapsed.value = window.innerWidth <= 768;
  });
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
  
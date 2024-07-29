<!-- src/components/Alert.vue -->
<template>
    <div v-if="message" :class="['alert', `alert-${variant}`]">
      {{ message }}
    </div>
  </template>
  
  <script>
  export default {
    props: {
      message: {
        type: String,
        default: ''
      },
      variant: {
        type: String,
        default: 'danger'
      }
    }
  };
  </script>
  
  <style scoped>
  .alert {
    padding: 0.75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.375rem;
  }
  
  .alert-danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  }
  </style>  
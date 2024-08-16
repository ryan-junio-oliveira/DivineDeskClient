<template>
  <transition name="fade">
    <div v-if="visible" class="notification" :class="type">
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'error'
  },
  duration: {
    type: Number,
    default: 3000
  }
});

const visible = ref(true);

const hideNotification = () => {
  visible.value = false;
};

onMounted(() => {
  setTimeout(hideNotification, props.duration);
});
</script>

<style scoped>
.notification {
  position: fixed;
  top: 40px;
  right: 30px;
  padding: 20px;
  border-radius: 4px;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  z-index: 1000;
  opacity: 1;
  font-family: "Montserrat", sans-serif !important;
}

.notification.error {
  background-color: #eb5757;
}

.notification.success {
  background-color: #4caf50;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease-out;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

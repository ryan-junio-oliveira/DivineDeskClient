<template>
    <div>
        <NavBarHome />
        <div class="container mt-5">
            <FormLogin/>
        </div>
    </div>
</template>

<script setup lang="ts">
import NavBarHome from '../components/home/NavBarHome.vue';
import FormLogin from '../components/auth/FormLogin.vue';
</script>

<style lang="scss">
@import '../assets/scss/home.scss';
</style>

<style scoped>
.container {
    margin-top: 60px;
}
</style>
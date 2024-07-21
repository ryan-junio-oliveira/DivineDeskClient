<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-nav">
        <div class="container">
            <a class="navbar-brand d-flex gap-1" href="/">
                <img :src="logoSrc" width="50" height="50" class="d-inline-block align-top" alt="Logo" />
                <h3 class="m-auto">Divine Desk</h3>
            </a>
            <button class="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#basic-navbar-nav" aria-controls="basic-navbar-nav" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="basic-navbar-nav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link text-white" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="/login">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="/contact-interest">Contato</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const logoSrc = computed(() => import.meta.env.BASE_URL + 'src/assets/img/logo.png');
</script>

<style scoped>
</style>
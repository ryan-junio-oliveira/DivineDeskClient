<template>
    <div>
        <NavBarHome />
        <div class="container mt-5">
            <FormLogin />
        </div>
    </div>
</template>

<script>
import NavBarHome from '../components/home/NavBarHome.vue';
import FormLogin from '../components/auth/FormLogin.vue';

export default{
    components: {
        NavBarHome, FormLogin
    }
}


</script>

<style lang="scss">
@import '../assets/scss/home.scss';
</style>
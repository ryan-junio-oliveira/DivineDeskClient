import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { BootstrapVue3 } from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '@popperjs/core';

const app = createApp(App);
app.use(BootstrapVue3);

app.use(router)
   .use(store)
   .mount('#app');
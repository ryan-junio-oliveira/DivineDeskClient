import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';  
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Members from '../views/Members.vue';
import Tithes from '../views/Tithes.vue';
import Offers from '../views/Offers.vue';
// import Admin from '../views/Admin.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/members', name: 'Members', component: Members, meta: { requiresAuth: true} },
  { path: '/offers', name: 'Offers', component: Offers, meta: { requiresAuth: true} },
  { path: '/tithes', name: 'Tithes', component: Tithes, meta: { requiresAuth: true} },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true, roles: ['1'] } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next('/login');
    } else if (to.matched.some(record => record.meta.roles) && !to.meta.roles.includes(userRole)) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
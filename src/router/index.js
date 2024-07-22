import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
// import Admin from '../views/Admin.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true} },
  // { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true, roles: ['user', 'admin'] } },
  // { path: '/admin', name: 'Admin', component: Admin, meta: { requiresAuth: true, roles: ['admin'] } },
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
      next('/dashboard');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
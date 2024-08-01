<template>
  <div :class="['sidebar bg-nav', { 'sidebar-collapsed': isCollapsed }]" style="z-index: 1000;">
    <button class="btn btn-toggle" @click="toggleSidebar">
      <font-awesome-icon :icon="isCollapsed ? 'bars' : 'times'" />
    </button>
    <div class="sidebar-content mt-4 d-flex flex-column">
      <a class="navbar-brand d-flex gap-1" href="/">
        <h4 id="logoTitle" class="mt-4">Divine Desk</h4>
      </a>
      <hr />
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">
            <font-awesome-icon icon="home" class="icon" />
            <span v-if="!isCollapsed">Home</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard" class="nav-link" active-class="active">
            <font-awesome-icon icon="tachometer-alt" class="icon" />
            <span v-if="!isCollapsed">Dashboard</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/orders" class="nav-link" active-class="active">
            <font-awesome-icon icon="shopping-cart" class="icon" />
            <span v-if="!isCollapsed">Orders</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/products" class="nav-link" active-class="active">
            <font-awesome-icon icon="box" class="icon" />
            <span v-if="!isCollapsed">Products</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/members" class="nav-link" active-class="active">
            <font-awesome-icon icon="users" class="icon" />
            <span v-if="!isCollapsed">Membros</span>
          </router-link>
        </li>
      </ul>
      <hr />
      <div class="dropdown">
        <a href="#" class="dropdown-toggle" id="dropdownUser" data-bs-toggle="dropdown">
          <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2" />
          <strong v-if="!isCollapsed">{{ user.user.name }}</strong>
        </a>
        <ul class="dropdown-menu" aria-labelledby="dropdownUser">
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li>
            <hr class="dropdown-divider">
          </li>
          <li><a class="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faTimes, faHome, faTachometerAlt, faShoppingCart, faBox, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { mapGetters } from 'vuex';

const logoSrc = computed(() => import.meta.env.BASE_URL + 'src/assets/img/logo.png');

library.add(faBars, faTimes, faHome, faTachometerAlt, faShoppingCart, faBox, faUsers);

export default {
  name: 'Sidebar',
  components: {
    FontAwesomeIcon,
  },
  computed: {
    ...mapGetters(['user'])
  },
  data() {
    return {
      isCollapsed: window.innerWidth <= 768,
    };
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
    handleResize() {
      if (window.innerWidth <= 768) {
        this.isCollapsed = true;
      }
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>

<style scoped>
.sidebar {
  height: 100vh;
  width: 200px;
  max-width: 100%;
  padding: 1rem;
  transition: width 0.3s;
  overflow-y: auto;
  position: fixed;
}

.sidebar-collapsed {
  width: 80px;
}

.sidebar-collapsed .sidebar-content {
  align-items: center;
}

.sidebar .sidebar-content .dropdown-toggle {
  color: var(--bs-light);
}

.sidebar-collapsed .sidebar-content .dropdown-toggle, .sidebar-collapsed .sidebar-content #logoTitle {
  display: none;
}

.sidebar-header {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.sidebar-header .icon {
  margin-right: 0.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 0;
  color: var(--bs-light);
}

.nav-link .icon {
  margin-right: 0.5rem;
}

.btn-toggle {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: none;
  color: var(--bs-light);
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;
}

@media (max-width: 768px) {
  .btn-toggle {
    display: block;
  }
}
</style>

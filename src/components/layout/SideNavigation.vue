<script setup>
import { useDisplay } from 'vuetify'
import { ref, watch } from 'vue'

const props = defineProps(['isDrawerVisible'])
const { mobile } = useDisplay()
const isDrawerVisible = ref(props.isDrawerVisible)

watch(props, () => {
  isDrawerVisible.value = props.isDrawerVisible
})

const navItems = [
  { icon: 'mdi-view-dashboard', title: 'Dashboard', route: '/dashboard' },
  { icon: 'mdi-information', title: 'About Us', route: '/about/us' },
  { icon: 'mdi-calendar-month', title: 'Appointment', route: '/appointment' },
  { icon: 'mdi-help-box-multiple', title: 'Guide', route: '/guide' },
  { icon: 'mdi-contacts', title: 'Contact', route: '/contact' },
  { icon: 'mdi-wrench', title: 'Account Settings', route: '/account/settings' },
]
</script>

<template>
  <v-navigation-drawer
    v-model="isDrawerVisible"
    :temporary="mobile"
    :permanent="!mobile"
    width="280"
  >
    <!-- Logo Section -->
  <div class="logo-section d-flex align-center justify-center pa-4">
    <router-link to="/dashboard">
      <img src="/images/logo2.png" alt="Logo" width="250" height="120" />
    </router-link>
  </div>


    <v-divider></v-divider>

    <!-- Navigation Items in Card Form -->
    <v-list density="compact" nav color="green-darken-1 " class="density">
        <v-list-item
          v-for="(item, index) in navItems"
          :key="index"
          class="nav-list-item"
        >
          <v-card
            class="d-flex align-center nav-card"
            elevation="1"
            width="100%"
            height="36px"
          >
            <v-list-item
              :prepend-icon="item.icon"
              :title="item.title"
              :to="item.route"
              class="nav-content"
            ></v-list-item>
          </v-card>
        </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.logo-section img {
  border-radius: 8px;
}

.v-navigation-drawer {
  background-color: #f5f5f5;
}

.nav-card {
  border-radius: 0px;
  transition: 0.3s ease;
  width: 100%; /* Ensure card spans full width */
  margin-top: 13px;
  /* border: 2px solid #4B8B3B;  */
}

.nav-card:hover {
  background-color: #e0f2e9; /* Hover background color to match */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nav-content {
  padding: 0.5rem 1rem;
  width: 100%;
}

.v-list-item__title {
  color: inherit;
}

</style>

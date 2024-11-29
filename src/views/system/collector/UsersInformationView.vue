<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import CollectorSideNavigation from '@/components/layout/CollectorSideNavigation.vue';
import { ref } from 'vue'

const isDrawerVisible = ref(true)

</script>


<template>
  <AppLayout
    :is-with-app-bar-nav-icon="true"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <template #navigation>
      <CollectorSideNavigation :is-drawer-visible="isDrawerVisible" />
    </template>

    <template #content>
      <v-container>
        <!-- Breadcrumbs -->
        <v-card class="mb-5" elevation="2">
          <template #title>
            <span class="text-h6 font-weight-bold">
              <v-breadcrumbs :items="['Collector', 'Users Information']" color="green-darken-3"></v-breadcrumbs>
            </span>
          </template>
        </v-card>

        <!-- Title -->
        <v-card class="my-5 border-green" color="green-lighten-5" outlined>
          <br>
          <p class="text-center font-weight-bold text-green-darken-1">USERS INFORMATION</p>
          <v-card-title class="text-h5 font-weight-bold text-center">DETAILS</v-card-title>
          <br>
        </v-card>
      </v-container>
    </template>
  </AppLayout>
</template>


<style scoped>
/* Styling for the containers */
.data-container {
  border: 2px solid #4b8b3b;
  border-radius: 8px;
  padding: 16px;
  background-color: #f9f9f9;
  margin-bottom: 20px;
}

.container-title {
  font-size: 18px;
  font-weight: bold;
  color: #4b8b3b;
  margin-bottom: 10px;
}

.data-list {
  list-style: none;
  padding: 0;
}

.data-list li {
  font-size: 14px;
  margin-bottom: 8px;
}

.v-row {
  margin-top: 20px;
}
</style>

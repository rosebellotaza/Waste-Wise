<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import CollectorSideNavigation from '@/components/layout/CollectorSideNavigation.vue';
import MapCollector from '@/components/maps/MapCollector.vue';
import { ref } from 'vue'

const isDrawerVisible = ref(true)

</script>

<template>
  <AppLayout
    :is-with-app-bar-nav-icon="true"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <template #navigation>
      <CollectorSideNavigation :is-drawer-visible="isDrawerVisible"></CollectorSideNavigation>
    </template>

    <template #content>
      <v-container>
        <!-- Breadcrumbs Card -->
        <v-card class="mb-5">
          <template #title>
            <span class="text-h6 font-weight-bold">
              <v-breadcrumbs :items="['Collector', 'Dashboard']" color="green-darken-3"></v-breadcrumbs>
            </span>
          </template>
        </v-card>

        <!-- Title Card -->
        <v-card class="my-5 border-green" color="green-lighten-5" outlined>
          <br>
          <p class="text-center font-weight-bold text-green-darken-1">USERS' LOCATIONS</p>
          <v-card-title class="text-h5 font-weight-bold text-center">PINNED LOCATIONS</v-card-title>
          <br>
        </v-card>
        <MapCollector></MapCollector>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
.border-green {
    border: 2px solid #4B8B3B; /* Adjust the color and width as needed */
  }
</style>

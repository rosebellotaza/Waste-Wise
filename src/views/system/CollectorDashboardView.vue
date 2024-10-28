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
      <CollectorSideNavigation :is-drawer-visible="isDrawerVisible"></CollectorSideNavigation>
    </template>

    <template #content>
      <v-container>
        <!-- Breadcrumbs Card -->
        <v-card class="mb-5">
          <template #title>
            <span class="text-h6 font-weight-bold">
              <v-breadcrumbs :items="['Collector', 'Dashboard']"></v-breadcrumbs>
            </span>
          </template>
        </v-card>

        <!-- Title Card -->
        <v-card class="my-5" color="green-lighten-5" outlined>
          <br>
          <p class="text-center font-weight-bold text-green-darken-1">USERS LOCATIONS</p>
          <v-card-title class="text-h5 font-weight-bold text-center">PINNED MAPS</v-card-title>
          <br>
        </v-card>
      </v-container>
    </template>
  </AppLayout>
</template>

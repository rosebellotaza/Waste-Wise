<script setup>
import AppLayout from '@/components/layout/AppLayout.vue';
import CollectorSideNavigation from '@/components/layout/CollectorSideNavigation.vue';
import { ref, onMounted } from 'vue';
import { supabase } from '@/utils/supabase';

const isDrawerVisible = ref(true);
const wasteMarkers = ref([]); // Holds waste_markers data along with user details

// Fetch waste_markers with user details
const fetchWasteMarkers = async () => {
  try {
    const { data, error } = await supabase
      .from('waste_markers')
      .select(`
        user_id,
        created_at,
        latitude,
        longitude,
        users (
          name,
          email
        )
      `);

    if (error) {
      throw new Error(error.message);
    }

    // Store the retrieved data
    wasteMarkers.value = data;
  } catch (error) {
    console.error('Error fetching waste markers:', error);
  }
};

// Fetch waste markers when the component is mounted
onMounted(() => {
  fetchWasteMarkers();
});
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
              <v-breadcrumbs :items="['Collector', 'Waste Markers']" color="green-darken-3" />
            </span>
          </template>
        </v-card>

        <!-- Title -->
        <v-card class="my-5 border-green" color="green-lighten-5" outlined>
          <p class="text-center font-weight-bold text-green-darken-1">WASTE MARKERS</p>
          <v-card-title class="text-h5 font-weight-bold text-center">MARKER DETAILS</v-card-title>
        </v-card>

        <!-- Single Card for Each Waste Marker -->
        <v-row>
          <v-col
            v-for="(marker, index) in wasteMarkers"
            :key="index"
            cols="12" sm="6" md="4"
          >
            <!-- Single Card containing all records for the waste marker -->
            <v-card class="pa-4 elevation-2">
              <v-row>
                <!-- User Name -->
                <v-card-title class="font-weight-bold">Name</v-card-title>
                <v-card-subtitle>{{ marker.users?.name || 'N/A' }}</v-card-subtitle>
              </v-row>

              <v-row>
                <!-- User Email -->
                <v-card-title class="font-weight-bold">Email</v-card-title>
                <v-card-subtitle>{{ marker.users?.email || 'N/A' }}</v-card-subtitle>
              </v-row>

              <v-row>
                <!-- Created At -->
                <v-card-title class="font-weight-bold">Created At</v-card-title>
                <v-card-subtitle>{{ marker.created_at }}</v-card-subtitle>
              </v-row>

              <v-row>
                <!-- Location -->
                <v-card-title class="font-weight-bold">Location</v-card-title>
                <v-card-subtitle>
                  Latitude: {{ marker.latitude }}<br />
                  Longitude: {{ marker.longitude }}
                </v-card-subtitle>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>


<style scoped>
.border-green {
    border: 2px solid #4B8B3B; /* Adjust the color and width as needed */
  }
</style>
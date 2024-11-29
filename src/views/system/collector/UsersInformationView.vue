<script setup>
import AppLayout from "@/components/layout/AppLayout.vue";
import CollectorSideNavigation from "@/components/layout/CollectorSideNavigation.vue";
import { ref, onMounted } from "vue";
import { supabase } from "@/utils/supabase";
import { useAuthUserStore } from "@/stores/authUser"; // Import the auth store

const isDrawerVisible = ref(true);
const wasteMarkers = ref([]); // Holds waste_markers data
const userEmail = ref(""); // To store the user's email

// Fetch waste_markers records
const fetchWasteMarkers = async () => {
  try {
    const { data, error } = await supabase
      .from("waste_markers")
      .select("user_id, created_at, description");

    if (error) {
      throw new Error(error.message);
    }

    // Store the retrieved data
    wasteMarkers.value = data;
  } catch (error) {
    console.error("Error fetching waste markers:", error);
  }
};

// Fetch the current user's email from Supabase Auth
const { getUserInformation } = useAuthUserStore();

const fetchUserEmail = async () => {
  try {
    await getUserInformation(); // Fetch user info
    userEmail.value = useAuthUserStore().userData?.email || ""; // Get the email
  } catch (error) {
    console.error("Error fetching user email:", error);
  }
};

// Fetch waste markers and user email when the component is mounted
onMounted(() => {
  fetchWasteMarkers();
  fetchUserEmail();
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
              <v-breadcrumbs
                :items="['Collector', 'Waste Markers']"
                color="green-darken-3"
              />
            </span>
          </template>
        </v-card>

        <!-- Title -->
        <v-card class="my-5 border-green" color="green-lighten-5" outlined>
          <p class="text-center font-weight-bold text-green-darken-1">
            WASTE MARKERS
          </p>
          <v-card-title class="text-h5 font-weight-bold text-center">
            MARKER DETAILS
          </v-card-title>
        </v-card>

        <!-- Data Containers -->
        <v-row>
          <!-- User ID Container -->
          <v-col cols="12" sm="4">
            <div class="data-container">
              <h3 class="container-title">User ID</h3>
              <ul class="data-list">
                <li v-for="(marker, index) in wasteMarkers" :key="index">
                  {{ marker.user_id }}
                </li>
              </ul>
            </div>
          </v-col>

          <!-- Created At Container -->
          <v-col cols="12" sm="4">
            <div class="data-container">
              <h3 class="container-title">Created At</h3>
              <ul class="data-list">
                <li v-for="(marker, index) in wasteMarkers" :key="index">
                  {{ marker.created_at }}
                </li>
              </ul>
            </div>
          </v-col>

          <!-- Email Container (Replacing Location) -->
          <v-col cols="12" sm="4">
            <div class="data-container">
              <h3 class="container-title">Description</h3>
              <ul class="data-list">
                <li v-for="(marker, index) in wasteMarkers" :key="index">
                  {{ marker.description }}
                </li>
              </ul>
            </div>
          </v-col>
        </v-row>
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

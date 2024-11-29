<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'
import MapUser from '@/components/maps/MapUser.vue';
import { ref } from 'vue'

const isDrawerVisible = ref(true);
const form = ref({
  fullName: '',
  email: '',
  phoneNumber: '',
  location: '',
  comments: ''
});

function submitForm() {
  // Handle form submission here
  console.log("Form submitted:", form.value);
}

// Define the steps for the user guide
const steps = [
  {
    title: 'Step 1: Set your Schedule',
    icon: 'mdi-calendar-clock',
    description: 'Log in to your account and go to Appointment section. You may check the Guide option for the collection schedule to see what type of waste is collected on specific days.',
  },
  {
    title: 'Step 2: Pin Your Location',
    icon: 'mdi-map-marker-radius',
    description: 'Use the integrated maps feature to pin your location for accurate pickup.',
  },
  {
    title: 'Step 3: Collector will arrive',
    icon: 'mdi-truck',
    description: 'Relax and wait for the waste collector to arrive to collect your waste.',
  },
] 
</script>

<template>
  <AppLayout
    :is-with-app-bar-nav-icon="true"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <template #navigation>
      <SideNavigation :is-drawer-visible="isDrawerVisible"></SideNavigation>
    </template>

    <template #content>
      <v-container>
        <!-- Introductory Card -->
        <v-card class="mb-5 fade-in" >
          <template #title>
            <span class="text-h6 font-weight-bold">
              <v-breadcrumbs :items="['System', 'Appoint Here'] " color="green-darken-3"></v-breadcrumbs>
            </span>
          </template>
        </v-card>

        <!-- Title Section -->
        <v-card class="my-5 fade-in border-green" color="green-lighten-5" outlined>
          <br>
          <p class="text-center font-weight-bold text-green-darken-1">WASTE WISE MANAGEMENT</p>
          <v-card-title class="text-h5 font-weight-bold text-center">APPOINT NOW</v-card-title>
          <br>
        </v-card>

        <!-- User Guide Section -->
        <v-card class="my-5 user-guide-card fade-in" outlined>
          <br>
          <v-card-title class="text-h4 font-weight-bold text-center text-green-darken-1">How Does It Work?</v-card-title>
          <v-card-text>
            <div class="guide-description">
              <h4 class="text-center text-black">Follow these simple steps to effectively use the Waste Wise Management System.</h4>
            </div>
            <v-container>
              <v-row>
                <v-col v-for="(step, index) in steps" :key="index" cols="12" md="4" class="d-flex align-center justify-center">
                  <v-card class="step-card">
                    <v-card-title class="step-title text-center pt-3">{{ step.title }}</v-card-title>
                    <v-card-text class="text-center">
                      <v-icon class="step-icon p-2">{{ step.icon }}</v-icon>
                      <p>{{ step.description }}</p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>

        <!-- Appointment Form -->
        <v-card class="my-8 p-5 fade-in border-green" outlined>
          <v-card-title class="text-h5 font-weight-bold text-green-darken-1 text-center">
            <br>
            Pick Up Disposal
          </v-card-title>
            <template v-slot:prepend-inner>
              <v-icon color="green-darken-4">mdi-pin</v-icon>
            </template>
            <MapUser />
          <br />
        </v-card>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
.fade-in {
  animation: fadeIn 1s ease-in-out;
}

.v-btn {
  transition: transform 0.3s ease-in-out;
}

.v-btn:hover {
  transform: scale(1.05);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.green-icon .v-input__prepend-inner .v-icon {
  color: #1B5E20; /* green darken-4 */
}

.border-green {
  border: 2px solid #4B8B3B; /* Adjust the color and width as needed */
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.text-center {
  text-align: center;
}

.user-guide-card {
  background-image: url('/images/bg2.jpg'); /* Replace with your actual image path */
  background-size: contain;
  background-position: center;
  color: #fff;
}

.step-card {
  background-color: rgba(255, 255, 255, 0.8); /* White background with transparency */
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  height: 251px;
  width: 500px;
}

.step-card:hover {
  transform: scale(1.05);
}

.step-title {
  font-weight: bold;
  font-size: 1.25rem;
}

.step-icon {
  font-size: 3rem;
  color: #4B8B3B; /* Your theme color */
}

.text-center {
  text-align: center;
}
</style>

<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'
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
              <v-breadcrumbs :items="['System', 'Appoint Here']"></v-breadcrumbs>
            </span>
          </template>
        </v-card>

        <!-- Title Section -->
        <v-card class="my-5 fade-in" color="green-lighten-5" outlined>
          <br>
          <p class="text-center font-weight-bold text-green-darken-1">WASTE WISE MANAGEMENT</p>
          <v-card-title class="text-h5 font-weight-bold text-center">APPOINT NOW</v-card-title>
          <br>
        </v-card>

        <!-- Appointment Form -->
        <v-card class="my-5 p-5 fade-in" outlined>
          <v-card-title class="text-h5 font-weight-bold text-green-darken-1 text-center">
            <br>
            Pick Up Schedule
          </v-card-title>

          <v-form class="form">
          <!-- Full Name -->
          <v-text-field
            v-model="form.fullName"
            label="Full Name"
            outlined
            dense
            class="my-4"
          >
            <template v-slot:prepend-inner>
              <v-icon color="green-darken-4">mdi-account</v-icon>
            </template>
          </v-text-field>

          <!-- Email Address -->
          <v-text-field
            v-model="form.email"
            label="Email Address"
            outlined
            dense
            class="my-4"
          >
            <template v-slot:prepend-inner>
              <v-icon color="green-darken-4">mdi-email</v-icon>
            </template>
          </v-text-field>

          <!-- Phone Number -->
          <v-text-field
            v-model="form.phoneNumber"
            label="Phone Number"
            outlined
            dense
            class="my-4"
          >
            <template v-slot:prepend-inner>
              <v-icon color="green-darken-4">mdi-phone</v-icon>
            </template>
          </v-text-field>

           <!-- Location Button
           <v-btn
            color="green darken-4"
            class="my-4"
            outlined
            @click="openMapDialog"
          >
            <v-icon left>mdi-map-marker</v-icon>
            Pin Your Location
          </v-btn> -->

          <!-- Additional Comments -->
          <v-textarea
            v-model="form.comments"
            label="Additional Comments"
            outlined
            dense
            rows="3"
            class="my-4"
          >
            <template v-slot:prepend-inner>
              <v-icon color="green-darken-4">mdi-comment-text-outline</v-icon>
            </template>
          </v-textarea>

          <!-- Submit Button -->
          <v-btn
              color="green darken-1"
              class="mt-4 mx-auto d-block"
              elevation="2"
              @click="submitForm"
            >
              Schedule Appointment
            </v-btn>
            <br>
        </v-form>


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

.form {
  margin-left: 15px;
  margin-right: 15px;
}

.green-icon .v-input__prepend-inner .v-icon {
  color: #1B5E20; /* green darken-4 */
}
</style>

<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'
import { ref } from 'vue'

const isDrawerVisible = ref(true)

const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})
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
        <!-- Breadcrumbs Card -->
        <v-card class="mb-5">
          <template #title>
            <span class="text-h6 font-weight-bold">
              <v-breadcrumbs :items="['System', 'Contact Us']"></v-breadcrumbs>
            </span>
          </template>
        </v-card>

        <!-- Title Card -->
        <v-card class="my-5" color="green-lighten-5" outlined>
          <br>
          <p class="text-center font-weight-bold text-green-darken-1">GET 24/7 SUPPORT</p>
          <v-card-title class="text-h5 font-weight-bold text-center">CONTACT US</v-card-title>
          <br>
        </v-card>

        <!-- Contact Section -->
        <v-row class="my-5">
          <!-- Left Side: Contact Form -->
          <v-col cols="12" md="8">
            <v-card class="pa-5" outlined>
              <h2 class="text-h5 font-weight-bold text-green-darken-1">Have you any question?</h2>
              <p>Feel free to contact us and leave a message! Waste Wise will keep in touch with you.</p>

              <!-- Form -->
              <v-form>
                <v-text-field
                  v-model="form.name"
                  label="Name"
                  outlined
                  dense
                  class="my-4"
                  placeholder="Enter your name"
                >
                  <template #prepend-inner>
                    <v-icon color="green-darken-4">mdi-account</v-icon>
                  </template>
                </v-text-field>

                <v-text-field
                  v-model="form.email"
                  label="Email"
                  outlined
                  dense
                  class="my-4"
                  placeholder="Enter your email"
                >
                  <template #prepend-inner>
                    <v-icon color="green-darken-4">mdi-email</v-icon>
                  </template>
                </v-text-field>

                <v-text-field
                  v-model="form.phone"
                  label="Phone"
                  outlined
                  dense
                  class="my-4"
                  placeholder="Enter your phone number"
                >
                  <template #prepend-inner>
                    <v-icon color="green-darken-4">mdi-phone</v-icon>
                  </template>
                </v-text-field>

                <v-text-field
                  v-model="form.subject"
                  label="Subject"
                  outlined
                  dense
                  class="my-4"
                  placeholder="Enter subject"
                >
                  <template #prepend-inner>
                    <v-icon color="green-darken-4">mdi-format-title</v-icon>
                  </template>
                </v-text-field>

                <v-textarea
                  v-model="form.message"
                  label="Message"
                  outlined
                  dense
                  rows="4"
                  class="my-4"
                  placeholder="Enter your message"
                >
                  <template #prepend-inner>
                    <v-icon color="green-darken-4">mdi-comment-text-outline</v-icon>
                  </template>
                </v-textarea>

                <v-btn color="green-darken-4" class="mt-4" outlined>
                  SUBMIT
                </v-btn>
              </v-form>
            </v-card>
          </v-col>

          <!-- Right Side: Shop Information -->
          <v-col cols="12" md="4">
            <v-card class="pa-5" outlined>
              <h2 class="text-h6 font-weight-bold">
                <v-icon color="green darken-4" class="mr-2">mdi-map-marker</v-icon>
                Shop Address
              </h2>
              <p>Butuan City, Ampayon<br>Philippines</p>

              <h2 class="text-h6 font-weight-bold mt-5">
                <v-icon color="green darken-4" class="mr-2">mdi-clock-outline</v-icon>
                Shop Hours
              </h2>
              <p>
                MON - FRIDAY: 8 AM to 6 PM<br>
                SAT - SUN: 10 AM to 3 PM
              </p>

              <h2 class="text-h6 font-weight-bold mt-5">
                <v-icon color="green darken-4" class="mr-2">mdi-phone</v-icon>
                Contact
              </h2>
              <p>Phone: +00 111 222 3333<br>Email: wastewise@gmail.com</p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>




<style scoped>
/* Centered heading animation */
h2 {
  animation: fadeInUp 1s ease;
}

/* Slide-in animation for cards */
.v-card {
  animation: slideIn 0.6s ease;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>


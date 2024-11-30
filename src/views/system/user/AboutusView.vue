<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'
import { ref } from 'vue'

const isDrawerVisible = ref(true)

// Waste Wise features data
const features = [
  { title: 'Efficient Waste Sorting', description: 'Easily categorize and track various types of waste for efficient recycling and disposal.', icon: 'mdi-recycle' },
  { title: 'Data Insights', description: 'Get real-time reports and statistics to monitor your waste output and improve recycling habits.', icon: 'mdi-chart-bar' },
  { title: 'Environmental Impact', description: 'Contribute to sustainability efforts by tracking your carbon footprint and waste reduction progress.', icon: 'mdi-leaf' },
  { title: 'Cost-Effective', description: 'Minimize waste disposal costs by maximizing recycling and using eco-friendly solutions.', icon: 'mdi-cash-multiple' }
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
      <!-- Main content with matching animations -->
      <v-container class="dashboard-animation" >
        <v-card class="dashboard-animation-card mb-5 " >
          <template #title>
            <span class="text-h6 font-weight-bold">
              <v-breadcrumbs :items="['System', 'About Us']" color="green-darken-3"></v-breadcrumbs>
            </span>
          </template>
        </v-card>

        <!-- About Us Header -->
        <v-card class="my-5 fade-in border-green" color="green-lighten-5" outlined>
          <br>
          <p class="text-center font-weight-bold text-green-darken-1">WE MANAGE WASTE</p>
          <v-card-title class="text-h5 font-weight-bold text-center">ABOUT US</v-card-title>
          <br>
        </v-card>

        <!-- Why Waste Wise Section -->
        <v-row class="mb-5 align-center">
          <v-col cols="12" md="6">
            <br>
            <h2 class="text-h4 font-weight-bold text-center text-green-darken-2">Why Waste Wise</h2>
            <br>
            <v-row>
              <v-col v-for="(feature, index) in features" :key="index" cols="6" class="text-center">
                <v-icon :color="'green'" size="40">{{ feature.icon }}</v-icon>
                <h3 class="text-h6 font-weight-bold">{{ feature.title }}</h3>
                <p>{{ feature.description }}</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-img src="/images/aboutus.jpg" alt="Waste Wise Image" height="300"></v-img>
          </v-col>
        </v-row>

        <!-- Our Team Section -->
        <v-container class="text-center my-10">
          <h2 class="text-h4 font-weight-bold text-green-darken-2 mb-5">Our Team</h2>
          <p class="text-center">We are dedicated and passionate team of developers commited to creating innovative solutions.<br> Our diverse skills and collaborative approach allow us to tackle complex challenges and deliver exceptional results.</p>
          <br>
          <v-row justify="center" class="team-row">
            <v-col cols="12" md="4" class="team-member fade-in-up">
              <v-card outlined class="border-green">
                <v-avatar size="150" class="mx-auto my-4">
                  <img src="/images/gjane.jpg" alt="Girly Jane Notarion" class="avatar-image" />
                </v-avatar>
                <div class="font-weight-bold text-h6 text-green-darken-3">Girly Jane Notarion</div>
                <div class="mb-4 text-body-2">System Analyst</div>
                <br>
                <v-row justify="center" class="social-icons">
                  <v-btn icon href="https://www.facebook.com/jane.notarion" target="_blank">
                    <v-icon color="green">mdi-facebook</v-icon>
                  </v-btn>
                  <v-btn icon href="https://wa.me/+639811292542" target="_blank">
                    <v-icon color="green">mdi-whatsapp</v-icon>
                  </v-btn>
                  <v-btn icon href="https://github.com/girlynotarion" target="_blank">
                    <v-icon color="green">mdi-github</v-icon>
                  </v-btn>
                </v-row>
                <br>
              </v-card>
            </v-col>
            <v-col cols="12" md="4" class="team-member fade-in-up">
              <v-card outlined class="border-green">
                <v-avatar size="150" class="mx-auto my-4">
                  <img src="/images/rbell.jpg" alt="Rosebell Narie Otaza" class="avatar-image" />
                </v-avatar>
                <div class="font-weight-bold text-h6 text-green-darken-3">Rosebell Narie Otaza</div>
                <div class="mb-4 text-body-2">Frontend Developer</div>
                <br>
                <v-row justify="center" class="social-icons">
                  <v-btn icon href="https://www.facebook.com/rotaza08/" target="_blank">
                    <v-icon color="green">mdi-facebook</v-icon>
                  </v-btn>
                  <v-btn icon href="https://wa.me/+639912143127" target="_blank">
                    <v-icon color="green">mdi-whatsapp</v-icon>
                  </v-btn>
                  <v-btn icon href="https://github.com/rosebellotaza" target="_blank">
                    <v-icon color="green">mdi-github</v-icon>
                  </v-btn>
                </v-row>
                <br>
              </v-card>
            </v-col>
          </v-row>
        </v-container>


      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
.dashboard-animation {
  animation: fadeIn 0.8s ease-in-out;
}

.dashboard-animation-card {
  animation: slideIn 1s ease-out;
}

.fade-in {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

.team-section {
  display: flex;
  justify-content: center;
}

.text-green-darken-2 {
  color: #4CAF50;
}

/* Fade-in and slide-up animation */
.fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease-in-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover effect for social icons */
.social-icon-hover:hover {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

/* Hover effect for team cards */
.team-member:hover {
  transform: scale(1.02);
  transition: transform 0.3s ease;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%; /* Ensures the image is circular inside the avatar */
}

.border-green {
    border: 2px solid #4B8B3B; /* Adjust the color and width as needed */
  }
</style>

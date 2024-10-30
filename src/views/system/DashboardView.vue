<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'
import { ref } from 'vue'

const isDrawerVisible = ref(true)

// Waste categories data
const wasteCategories = [
  {
    title: 'Biodegradable Waste',
    description:
      'Organic waste that can decompose naturally, such as food scraps and garden waste.',
    image: '/path/to/biodegradable.jpg', // Replace with actual path
  },
  {
    title: 'Non-Biodegradable Waste',
    description: 'Waste that does not decompose, like plastic and metal.',
    image: '/path/to/non-biodegradable.jpg', // Replace with actual path
  },
  {
    title: 'Recyclable Waste',
    description:
      'Materials that can be reprocessed and reused, including paper, glass, and some plastics.',
    image: '/path/to/recyclable.jpg', // Replace with actual path
  },
  {
    title: 'Electronic Waste',
    description:
      'Discarded electronics such as phones, computers, and batteries.',
    image: '/path/to/electronic.jpg', // Replace with actual path
  },
  {
    title: 'Special Waste',
    description:
      'Hazardous waste materials requiring specific disposal methods.',
    image: '/path/to/special.jpg', // Replace with actual path
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
        <!-- Main Title with Fade-in Animation -->
        <v-card class="mb-5 fade-in">
          <template #title>
            <span class="text-h6 font-weight-bold">
              <v-breadcrumbs :items="['System', 'Dashboard']" color="green-darken-3"></v-breadcrumbs>
            </span>
          </template>
        </v-card>

        <!-- Waste Wise Management System Title -->
        <v-card class="my-5 fade-in border-green" color="green-lighten-5" outlined>
          <br />
          <p class="text-center font-weight-bold text-green-darken-1">
            YOUR GUIDE TO SMARTER WASTE SOLUTIONS
          </p>
          <v-card-title class="text-h5 font-weight-bold text-center">
            WASTE WISE MANAGEMENT SYSTEM
          </v-card-title>
          <br />
        </v-card>

        <!-- Features Section Card -->
              <v-row class="my-5 text-center">
        <v-col cols="12" sm="4">
          <v-card flat>
            <v-icon large color="success">mdi-recycle</v-icon>
            <p class="text-h6 font-weight-bold">Free & Eco-Friendly Service</p>
            <p>Helping you manage waste at no cost.</p>
          </v-card>
        </v-col>

        <v-col cols="12" sm="4">
          <v-card flat>
            <v-icon large color="success">mdi-lifebuoy</v-icon>
            <p class="text-h6 font-weight-bold">24/7 Assistance</p>
            <p>We’re here to help anytime.</p>
          </v-card>
        </v-col>

        <v-col cols="12" sm="4">
          <v-card flat>
            <v-icon large color="success">mdi-lightbulb</v-icon>
            <p class="text-h6 font-weight-bold">Helpful Tips & Insights</p>
            <p>Get useful waste management advice.</p>
          </v-card>
        </v-col>
      </v-row>


        <br>
        <!-- Waste Categories Section -->
        <h4 class="text-h4 font-weight-bold mb-4 text-center fade-in text-green-darken-1">
          Waste Categories
        </h4>
        <p class="text-center">Explore different waste types to manage and track effectively.</p>
        <br>
        <br>

        <!-- Waste Categories Cards with Centered Last Row -->
        <v-row>
          <v-col v-for="(category, index) in wasteCategories.slice(0, 3)" :key="index" cols="12" sm="6" md="4">
            <v-card class="mb-4 hover-card fade-in" outlined>
              <v-img :src="category.image" height="150px"></v-img>
              <v-card-title class="text-h6 font-weight-bold text-success">{{ category.title }}</v-card-title>
              <v-card-text>{{ category.description }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Centered Row for Electronic and Special Waste -->
        <v-row justify="center">
          <v-col v-for="(category, index) in wasteCategories.slice(3)" :key="index" cols="12" sm="6" md="4">
            <v-card class="mb-4 hover-card fade-in" outlined>
              <v-img :src="category.image" height="150px"></v-img>
              <v-card-title class="text-h6 font-weight-bold text-success">{{ category.title }}</v-card-title>
              <v-card-text>{{ category.description }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Impact of Proper Waste Management Section with Centered Video -->
        <v-card class="my-5 fade-in border-green" outlined>
          <v-card-title
            class="text-h4 font-weight-bold text-center text-green-darken-1 "
            >Impact of Proper Waste Management</v-card-title
          >
          <v-card-text>
            <p class="text-center">
              Watch this video to learn more about the benefits and importance
              of managing waste responsibly.
            </p>

            <!-- Centered Video Frame -->
            <div class="iframe-container">
              <iframe
                width="600"
                height="350"
                src="https://www.youtube.com/embed/Qyu-fZ8BOnI"
                title="Impact of Proper Waste Management"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </template>
  </AppLayout>
</template>


<style scoped>
.text-success {
  color: #4caf50;
}

/* Fade-in Animation */
.fade-in {
  opacity: 0;
  animation: fadeIn 1s forwards;
}

/* Center iframe */
.iframe-container {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

/* Hover Animation for Waste Category Cards */
.hover-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.hover-card:hover {
  transform: translateY(-10px);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
}

/* Centered Video Container */
.video-responsive {
  display: flex;
  justify-content: center;
}

.border-green {
    border: 2px solid #4B8B3B; /* Adjust the color and width as needed */
  }
</style>

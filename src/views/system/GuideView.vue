<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'
import { ref } from 'vue'

const isDrawerVisible = ref(true)

const collectionSchedule = [
  { day: 'Monday', type: 'Biodegradable Waste', icon: 'mdi-leaf' },
  { day: 'Tuesday', type: 'Non-Biodegradable Waste', icon: 'mdi-trash-can' },
  { day: 'Wednesday', type: 'Recyclable Waste', icon: 'mdi-recycle' },
  { day: 'Thursday', type: 'Electronic Waste', icon: 'mdi-desktop-classic' },
  { day: 'Friday', type: 'Special Waste', icon: 'mdi-alert' },
  { day: 'Saturday', type: 'Biodegradable & Non-Biodegradable', icon: 'mdi-leaf-maple' },
  { day: 'Sunday', type: 'Biodegradable & Non-Biodegradable', icon: 'mdi-leaf-maple' }
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
        <v-card class="mb-5">
          <template #title>
            <span class="text-h6 font-weight-bold">
              <v-breadcrumbs :items="['System', 'Guide and FAQs']" color="green-darken-3"></v-breadcrumbs>
            </span>
          </template>
        </v-card>

        <v-card class="my-5 border-green" color="green-lighten-5" outlined>
          <br>
          <p class="text-center font-weight-bold text-green-darken-1">USER GUIDE AND FAQS</p>
          <v-card-title class="text-h5 font-weight-bold text-center">GUIDE</v-card-title>
          <br>
        </v-card>

        <!-- Waste Collection Schedule Calendar Section -->
        <v-card class="calendar-card my-5 py-4 px-3 border-green" outlined>
          <h2 class="text-center text-green-darken-1 mb-4">Weekly Waste Collection Schedule</h2>
          <p class="text-center mt-2 mb-4">
  Stay organized and environmentally conscious by following our weekly waste collection schedule.<br> Let’s work together for a cleaner and greener community!
</p>
          <v-row class="calendar-grid" dense>
            <v-col
              v-for="(day, index) in collectionSchedule"
              :key="index"
              class="calendar-cell"
              cols="12"
              sm="6"
              md="4"
              lg="2"
            >
              <v-card color="green-lighten-4" class="calendar-day-card text-center">
                <div class="day-header">
                  <span class="day-name font-weight-bold">{{ day.day }}</span>
                  <v-icon large class="day-icon">{{ day.icon }}</v-icon>
                </div>
                <p class="day-type">{{ day.type }}</p>
              </v-card>
            </v-col>
          </v-row>
        </v-card>

        <br>
        <h1 class="text-center text-green-darken-1">Frequently Asked Questions</h1>
        <p class="text-center">Find answers to the most common questions about Waste Wise, <br> your go-to waste management solution.</p>
        <br>

        <!-- FAQ Section -->
        <transition name="fade">
          <v-expansion-panels class="faq" accordion>
            <!-- FAQ Item 1 -->
            <v-expansion-panel>
              <v-expansion-panel-title>
                What is Waste Wise?
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                Waste Wise is a waste management system designed to help users schedule waste collection appointments and manage recycling tasks easily.
              </v-expansion-panel-text>
            </v-expansion-panel>

            <!-- FAQ Item 2 -->
            <v-expansion-panel>
              <v-expansion-panel-title>
                How do I schedule a waste collection appointment?
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                To schedule a waste collection appointment, log in to your account, navigate to the scheduling section, and input your preferred date and time for collection.
              </v-expansion-panel-text>
            </v-expansion-panel>

            <!-- FAQ Item 3 -->
            <v-expansion-panel>
              <v-expansion-panel-title>
                How do I pin my location for waste collection?
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                After scheduling your appointment, you can pin your location using the integrated maps feature to ensure the collection team knows where to go.
              </v-expansion-panel-text>
            </v-expansion-panel>

            <!-- FAQ Item 4 -->
            <v-expansion-panel>
              <v-expansion-panel-title>
                What types of waste does Waste Wise handle?
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                Waste Wise handles various types of waste, including recyclables (plastics, glass, and metals), organic waste (food scraps, garden waste), and non-recyclable waste. Make sure to categorize your waste properly for efficient collection.
              </v-expansion-panel-text>
            </v-expansion-panel>

            <!-- FAQ Item 5 -->
            <v-expansion-panel>
              <v-expansion-panel-title>
                How do I contact Waste Wise support?
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                You can contact support by visiting the 'Contact Us' page. Our support team is ready to assist you with any questions or concerns.
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </transition>

        <br>
        <br>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>

.border-green {
    border: 2px solid #4B8B3B; /* Adjust the color and width as needed */
  }
.v-expansion-panel-title {
  font-weight: bold;
  font-size: 1.1rem;
}

.v-expansion-panel-text {
  font-size: 1rem;
  color: #4B4B4B;
}

.v-expansion-panels {
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.v-expansion-panel {
  border-bottom: 1px solid #e0e0e0;
}

.v-expansion-panel-title:hover {
  color: #388e3c;
}

.v-expansion-panel-text {
  padding: 16px;
  line-height: 1.5;
}

/* General Fade-in Animation for the Section */
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

.calendar-card {
  animation: fadeInUp 0.6s ease-out both;
}


.calendar-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.calendar-cell {
  margin: 8px;
}

/* Fade-in for individual day cards with staggered delay */
.calendar-day-card {
  padding: 16px;
  border-radius: 8px;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s;
  animation: fadeInUp 0.6s ease-out both;
}

/* Delays for staggered fade-in effect */
.calendar-cell:nth-child(1) .calendar-day-card { animation-delay: 0.1s; }
.calendar-cell:nth-child(2) .calendar-day-card { animation-delay: 0.2s; }
.calendar-cell:nth-child(3) .calendar-day-card { animation-delay: 0.3s; }
.calendar-cell:nth-child(4) .calendar-day-card { animation-delay: 0.4s; }
.calendar-cell:nth-child(5) .calendar-day-card { animation-delay: 0.5s; }
.calendar-cell:nth-child(6) .calendar-day-card { animation-delay: 0.6s; }
.calendar-cell:nth-child(7) .calendar-day-card { animation-delay: 0.7s; }

/* Hover Transform and Shadow on Each Day Card */
.calendar-day-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  background-color: #dcedc8;
}

/* Icon and Text Animations */
@keyframes iconBounce {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.day-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
}

/* Animate the day name and waste type text */
.day-name {
  font-size: 1.2rem;
  color: #388e3c;
  transition: color 0.3s;
}

.day-icon {
  color: #388e3c;
  transition: transform 0.3s, color 0.3s;
  animation: iconBounce 1s infinite;
}

.calendar-day-card:hover .day-icon {
  color: #2e7d32;
}

.day-type {
  font-size: 0.9rem;
  color: #4b4b4b;
  text-align: center;
  opacity: 0;
  animation: fadeInUp 0.5s ease-out forwards;
  animation-delay: 0.2s;
}

.calendar-day-card:hover .day-name {
  color: #2e7d32;
  transform: translateY(-2px);
}

.calendar-day-card:hover .day-type {
  color: #4b4b4b;
  transform: translateY(-2px);
}

</style>

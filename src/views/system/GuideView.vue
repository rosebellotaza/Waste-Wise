<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'
import { ref } from 'vue'

const isDrawerVisible = ref(true)

// Define the steps for the user guide
const steps = [
{
    title: 'Step 1: Set your Schedule',
    icon: 'mdi-calendar-clock',
    description: 'Log in to your account and go to schedule section.',
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

        <!-- User Guide Section -->
        <v-card class="my-5 user-guide-card" outlined>
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
                    <v-card-title class="step-title text-center">{{ step.title }}</v-card-title>
                    <v-card-text class="text-center">
                      <v-icon class="step-icon">{{ step.icon }}</v-icon>
                      <p>{{ step.description }}</p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <br>
          <br>
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
              <v-expansion-panel-title collapse-icon="mdi-minus" expand-icon="mdi-plus">
                What is Waste Wise?
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                Waste Wise is a waste management system designed to help users schedule waste collection appointments and manage recycling tasks easily.
              </v-expansion-panel-text>
            </v-expansion-panel>

            <!-- FAQ Item 2 -->
            <v-expansion-panel>
              <v-expansion-panel-title collapse-icon="mdi-minus" expand-icon="mdi-plus">
                How do I schedule a waste collection appointment?
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                To schedule a waste collection appointment, log in to your account, navigate to the scheduling section, and input your preferred date and time for collection.
              </v-expansion-panel-text>
            </v-expansion-panel>

            <!-- FAQ Item 3 -->
            <v-expansion-panel>
              <v-expansion-panel-title collapse-icon="mdi-minus" expand-icon="mdi-plus">
                How do I pin my location for waste collection?
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                After scheduling your appointment, you can pin your location using the integrated maps feature to ensure the collection team knows where to go.
              </v-expansion-panel-text>
            </v-expansion-panel>

            <!-- FAQ Item 4 -->
            <v-expansion-panel>
              <v-expansion-panel-title collapse-icon="mdi-minus" expand-icon="mdi-plus">
                What types of waste does Waste Wise handle?
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                Waste Wise handles various types of waste, including recyclables (plastics, glass, and metals), organic waste (food scraps, garden waste), and non-recyclable waste. Make sure to categorize your waste properly for efficient collection.
              </v-expansion-panel-text>
            </v-expansion-panel>

            <!-- FAQ Item 5 -->
            <v-expansion-panel>
              <v-expansion-panel-title collapse-icon="mdi-minus" expand-icon="mdi-plus">
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

.faq {
  margin-left: 15px;
  padding-right: 30px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.border-green {
  border: 2px solid #4B8B3B; /* Adjust the color and width as needed */
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

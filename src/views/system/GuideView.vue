<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'
import { ref } from 'vue'

const isDrawerVisible = ref(true)
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
        <v-card class="mb-5" >
          <template #title>
            <span class="text-h6 font-weight-bold">
              <v-breadcrumbs :items="['System', 'Guide and FAQs']"></v-breadcrumbs>
            </span>
          </template>
        </v-card>
        <v-card class="my-5" color="green-lighten-5" outlined>
          <br>
          <p class="text-center font-weight-bold text-green-darken-1">USER GUIDE AND FAQS</p>
          <v-card-title class="text-h5 font-weight-bold text-center">GUIDE</v-card-title>
          <br>
        </v-card>
      </v-container>
      <div>
    <!-- FAQ Section -->
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
  </div>   
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
</style>
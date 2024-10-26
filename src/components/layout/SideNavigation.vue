<script setup>
import { useDisplay } from 'vuetify'
import { ref, watch } from 'vue'

const props = defineProps(['isDrawerVisible'])

// Utilize predefined vue functions
const { mobile } = useDisplay()

// Load Variables
const isDrawerVisible = ref(props.isDrawerVisible)
watch(props, () => {
  isDrawerVisible.value = props.isDrawerVisible
})

</script>

<template>
  <v-navigation-drawer
    v-model="isDrawerVisible"
    :temporary="mobile"
    :permanent="!mobile"
    width="300"
  >
    <v-list density="compact" nav     color="green-darken-4"
    >
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Dashboard"
        to="/dashboard"
      ></v-list-item>

      <v-divider></v-divider>

      <v-list-item
        prepend-icon="mdi-information"
        title="About Us"
        to="/about/us"
      ></v-list-item>

      <v-list-item
        prepend-icon="mdi-calendar-month"
        title="Appointment"
        to="/appointment"
      ></v-list-item>

      <v-list-item
        prepend-icon="mdi-help-box-multiple"
        title="Guide"
        to="/guide"
      ></v-list-item>

      <v-list-item
        prepend-icon="mdi-contacts"
        title="Contact"
        to="/contact"
      ></v-list-item>

      <v-divider></v-divider>

      <v-list-item
        prepend-icon="mdi-wrench"
        title="Account Settings"
        to="/account/settings"
      ></v-list-item>

      <v-divider></v-divider>
    </v-list>
  </v-navigation-drawer>
</template>
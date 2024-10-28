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
    <v-divider></v-divider>

    <!-- Navigation Items -->
    <v-list density="compact" nav color="green-darken-1">
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Dashboard"
        to="/collector/dashboard"
      ></v-list-item>

      <v-list-item
        prepend-icon="mdi-information"
        title="Users Information"
        to="/users/information"
      ></v-list-item>

      <v-divider></v-divider>

      <!-- <v-list-item
        prepend-icon="mdi-wrench"
        title="Account Settings"
        to="/account/settings"
      ></v-list-item> -->

      <v-divider></v-divider>
    </v-list>
  </v-navigation-drawer>
</template>

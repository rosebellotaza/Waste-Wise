<script setup>
import { isAuthenticated } from '@/utils/supabase'
import ProfileHeaderNavigation from './ProfileHeaderNavigation.vue';
import { onMounted, ref } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps(['isWithAppBarNavIcon'])

const emit = defineEmits(['isDrawerVisible'])

// Utilize predefined vue functions
const { mobile } = useDisplay()
const theme = ref(localStorage.getItem('theme') ?? 'light')

// Load Variables
const isLoggedIn = ref(false)

//  Toggle Theme
function onToggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
}

// Get Authentication status from supabase
const getLoggedStatus = async () => {
  isLoggedIn.value = await isAuthenticated()
}

// Load Functions during component rendering
onMounted(() => {
  getLoggedStatus()
})
</script>

<template>
  <v-responsive class="border rounded" >
    <v-app :theme="theme" >
      <v-app-bar
        class="px-3"
        :color="theme === 'light' ? 'green-darken-1' : 'green-darken-4'" border
      >

      <v-app-bar-nav-icon
          v-if="props.isWithAppBarNavIcon"
          icon="mdi-menu"
          :theme="theme"
          @click="emit('isDrawerVisible')"
        >
        </v-app-bar-nav-icon>

        <v-spacer></v-spacer>

        <!-- <v-btn
        class="me-2"
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          variant="elevated"
          slim
          @click="onToggleTheme"
        ></v-btn> -->
        <ProfileHeaderNavigation v-if="isLoggedIn"></ProfileHeaderNavigation>
      </v-app-bar>

      <slot name="navigation"></slot>

      <v-main>
          <slot name="content"></slot>
      </v-main>

      <!-- <v-footer :color="theme === 'light' ? 'green-darken-1' : 'green-darken-4'" elevation="24" border app
      >
      <div :class="mobile ? 'w-100 text-center' : ''">
          Copyright © 2024 - Waste Wise | All Rights Reserved
        </div>
      </v-footer> -->
    </v-app>
  </v-responsive>
</template>

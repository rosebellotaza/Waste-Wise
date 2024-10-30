<script setup>
import { isAuthenticated } from '@/utils/supabase'
import ProfileHeaderNavigation from './ProfileHeaderNavigation.vue';
import { onMounted, ref } from 'vue'

const props = defineProps(['isWithAppBarNavIcon'])

const emit = defineEmits(['isDrawerVisible'])

// Load Variables
const isLoggedIn = ref(false)


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
        color="green-darken-1"
      >

      <v-app-bar-nav-icon
          v-if="props.isWithAppBarNavIcon"
          icon="mdi-menu"
          :theme="theme"
          @click="emit('isDrawerVisible')"
        >
        </v-app-bar-nav-icon>

        <v-spacer></v-spacer>
        <ProfileHeaderNavigation v-if="isLoggedIn"></ProfileHeaderNavigation>
      </v-app-bar>

      <slot name="navigation"></slot>

      <v-main>
          <slot name="content"></slot>
      </v-main>
    </v-app>
  </v-responsive>
</template>

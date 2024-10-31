<script setup>
import { isAuthenticated, getUserInformation } from '@/utils/supabase'
import AppLayout from '@/components/layout/AppLayout.vue'
import { onMounted, ref } from 'vue'

// Load Variables
const isLoggedIn = ref(false)
const isAdmin = ref(false)  // Variable to check if user is admin
const isDrawerVisible = ref(true)

// Get Authentication status and role from supabase
const getLoggedStatus = async () => {
  isLoggedIn.value = await isAuthenticated()
  
  // Retrieve user role
  if (isLoggedIn.value) {
    const userInfo = await getUserInformation()
    isAdmin.value = userInfo.is_admin
  }
}

// Load functions during component rendering
onMounted(() => {
  getLoggedStatus()
})
</script>

<template>
  <AppLayout
    :is-with-app-bar-nav-icon="isLoggedIn"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <template #content>
      <v-container>
        <v-row>
          <v-col class="mx-auto mt-16 text-center" cols="12" lg="4">
            <h1 class="text-h1 font-weight-black text-light-green-darken-4">403</h1>
            <h2 class="text-h2 font-weight-black mb-2">Forbidden</h2>

            <p class="text-subtitle-1 font-weight-bold mb-4">
              You don’t have permission to access this page.
            </p>

            <v-btn
              class="mt-2"
              color="light-green-darken-4"
              prepend-icon="mdi-home"
              :to="isAdmin ? '/collector/dashboard' : '/dashboard'"
            >
              Back to {{ isLoggedIn ? (isAdmin ? 'Collector Dashboard' : 'User Dashboard') : 'Homepage' }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>

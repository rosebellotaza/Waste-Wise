<script setup>
import { supabase, formActionDefault, getUserInformation } from '@/utils/supabase'
import { getAvatarText } from '@/utils/helpers'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useAuthUserStore } from '@/stores/authUser'

// Utilize pre-defined vue functions
const authStore = useAuthUserStore()
const router = useRouter()

// Load Variables
const formAction = ref({
  ...formActionDefault,
})

// Logout Functionality
const onLogout = async () => {
  /// Reset Form Action utils; Turn on processing at the same time
  formAction.value = { ...formActionDefault, formProcess: true }

  // Get supabase logout functionality
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error during logout:', error)
    return
  }

  formAction.value.formProcess = false
  // Reset State
  authStore.$reset()
  // Redirect to homepage
  router.replace('/')

  //Getting User Information Functionality
  // const getUser = async () => {
  //   const metadata = await getUserInformation()

  //   userData.value.email = metadata.email
  //   userData.value.fullname = metadata.firstname + ' ' + metadata.lastname
  //   userData.value.initials = getAvatarText(userData.value.fullname)
  // }
}
</script>

<template>
  <v-menu min-width="200px" rounded>
    <template #activator="{ props }">
      <v-btn icon v-bind="props">
        <v-avatar
          v-if="authStore.userData && authStore.userData.image_url"
          :image="authStore.userData.image_url"
          color="green-darken-3"
          size="large"
        >
        </v-avatar>

        <v-avatar v-else color="green-darken-3" size="large">
          <span class="text-h5">
            {{
              getAvatarText(authStore.userData ?
                authStore.userData.firstname +
                  ' ' +
                  authStore.userData.lastname : ''
              )
            }}
          </span>
        </v-avatar>
      </v-btn>
    </template>

    <v-card class="mt-1" >
      <v-card-text>
        <v-list>
          <v-list-item
            :subtitle="authStore.userData ? authStore.userData.email: ''"
            :title="authStore.userData ?
              authStore.userData.firstname + ' ' + authStore.userData.lastname : ''
            "
          >
            <template #prepend>
              <v-avatar
                v-if="authStore.userData && authStore.userData.image_url"
                :image="authStore.userData.image_url"
                color="green-darken-3"
                size="large"
              >
              </v-avatar>

              <v-avatar v-else color="green-darken-3" size="large">
                <span class="text-h5">
                  {{
                    getAvatarText(authStore.userData ?
                      authStore.userData.firstname +
                        ' ' +
                        authStore.userData.lastname: ''
                    )
                  }}
                </span>
              </v-avatar>
            </template>
          </v-list-item>
        </v-list>

        <v-divider class="my-3"></v-divider>

        <v-btn
      prepend-icon="mdi-logout"
      color="green-darken-2"
      class="text-white"
      elevation="2"
      rounded
      block
      @click="onLogout"
      :loading="formAction.formProcess"
      :disabled="formAction.formProcess"
    >
      Logout
    </v-btn>

      </v-card-text>
    </v-card>
  </v-menu>
</template>

<style scoped>
.border-green {
    border: 3px solid #4B8B3B; /* Adjust the color and width as needed */
  }

</style>

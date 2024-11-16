<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import PictureForm from '@/components/system/PictureForm.vue'
import CollectorSideNavigation from '@/components/layout/CollectorSideNavigation.vue'
import { useAuthUserStore } from '@/stores/authUser'
import { ref } from 'vue'
import CollectorProfileForm from '@/components/system/CollectorProfileForm.vue'

// Utilize pre-defined vue functions
const authStore = useAuthUserStore()

// Load Variables
const isDrawerVisible = ref(true)
</script>

<template>
  <AppLayout
    :is-with-app-bar-nav-icon="true"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <template #navigation>
      <CollectorSideNavigation :is-drawer-visible="isDrawerVisible"></CollectorSideNavigation>
    </template>

    <template #content>
      <v-container>
        <v-card class="mb-5">
          <template #title>
            <span class="text-h6 font-weight-bold">
              <v-breadcrumbs :items="['Account', 'Settings']" color="green-darken-3"></v-breadcrumbs>
            </span>
          </template>
        </v-card>

        <v-row>
          <v-col cols="12" lg="4">
            <v-card class="border-green">
              <v-card-text>
                <v-img
                width="50%"
                class="mx-auto rounded-circle"
                color="green-darken-3"
                aspect-ratio="1"
                :src="authStore.userData.image_url || '/images/collector.jpg'"
                alt="Profile Picture"
                cover
              >
              </v-img>


                <h3 class="d-flex align-center justify-center mt-5">
                  <v-icon class="me-2" color="green-darken-4" icon="mdi-account-badge"> </v-icon>
                  {{ authStore.userRole }}
                </h3>

                <v-divider class="my-5"></v-divider>

                <div class="text-center">
                  <h4 class="my-2">
                    <b class="text-green-darken-4">Fullname:</b>
                    {{ authStore.userData.firstname + ' ' + authStore.userData.lastname }}
                  </h4>
                  <h4 class="my-2"><b class="text-green-darken-4">Email:</b> {{ authStore.userData.email }}</h4>
                  <h4 class="my-2"><b class="text-green-darken-4">Contact No.:</b> {{ authStore.userData.phone }}</h4>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" lg="8">
            <!-- <v-card class="mb-5 border-green" title="Profile Picture">
              <v-card-text>
                <PictureForm></PictureForm>
              </v-card-text>
            </v-card> -->

            <v-card class="mb-5 border-green " title="Profile Information ">
              <v-card-text>
                <CollectorProfileForm></CollectorProfileForm>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
.border-green {
    border: 2px solid #4B8B3B; /* Adjust the color and width as needed */
  }
</style>
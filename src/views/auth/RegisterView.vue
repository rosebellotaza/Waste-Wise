<script setup>
// import AppLayout from '@/components/layout/AppLayout.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
</script>

<template>
      <v-sheet color="green-darken-3" height="150vh">
  <!-- <AppLayout  :is-with-app-bar-nav-icon="false"> -->
    <!-- <template #content> -->
      <v-container>
        <v-img src="/images/logo2.png" width="400px" class="mx-auto" :width="mobile ? '75%' : '25%'"></v-img>
      <v-row>
        <v-col cols="12" class="mx-auto" v-if="mobile"></v-col>
        <v-col cols="12" :class="mobile ? '' : 'pt-5'">
          <v-card class="mx-auto" elevation="24" color="white" max-width="800">
            <v-card-title class="text-center">
              <br>
              <h3 class="font-weight-black" style="color: green;">Waste Wise</h3>
              <p style="color: green;">Register Form</p>
            </v-card-title>

            <v-card-text class="pt-2">
              <v-divider class="my-5"></v-divider>

                <RegisterForm></RegisterForm>

              <v-divider class="my-5"></v-divider>
                <h5 class="text-center">
                  Already have account?
                  <RouterLink class="text-green-darken-4 font-weight-black" to="/">Log in here.</RouterLink>
                </h5>
            </v-card-text>
          </v-card>
          </v-col>
      </v-row>
      </v-container>
    <!-- </template> -->
  <!-- </AppLayout> -->
      </v-sheet>
</template>

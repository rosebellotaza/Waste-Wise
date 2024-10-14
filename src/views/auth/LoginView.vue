<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import { useDisplay } from 'vuetify'

const {mobile} =useDisplay()
</script>

<template>
  <AppLayout :is-with-app-bar-nav-icon="false">
    <template #content>
      <v-container fluid>
        <v-img src="/images/logo2.png":width="mobile? '75%' : '25%'" width="400px" class="mx-auto"></v-img>
      <v-row>
        <v-col cols="12"  class="mx-auto" v-if="mobile"></v-col>
        <v-col cols="12"  :class="mobile ? '' : 'pt-16'">
          <v-card class="mx-auto" elevation="24" color="green-darken-3" max-width="700">
            <v-card-title class="text-center" >
                <h3 class="font-weight-black">Waste Wise</h3>
              <p>Login Form</p>
            </v-card-title>

            <v-card-text class="bg-surface-light pt-4">
              <v-divider class="my-5"></v-divider>

              <LoginForm></LoginForm>
              
              <v-divider class="my-5"></v-divider>
              <h5 class="text-center" >
                Don't have account?
                <RouterLink class="text-green-darken-4 font-weight-black" to="/register">Register here.</RouterLink>
              </h5>
            </v-card-text>
          </v-card>
          </v-col>
      </v-row>
      </v-container> 
    </template>
  </AppLayout>
</template>

<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
</script>

<template>
  <AppLayout>
    <template #content>
      <v-img src="/images/logo2.png" width="400px" class="mx-auto"></v-img>
      <v-row>
        <v-col cols="12" md="6" class="mx-auto pt-12">
          <v-card class="mx-auto" elevation="24">
            <v-card-title class="text-center">
              <h3 class="font-weight-black">Waste Wise</h3>
              <p>Login Form</p>
            </v-card-title>

            <v-card-text class="bg-surface-light pt-4">
              <v-divider class="my-5"></v-divider>
              <LoginForm></LoginForm>
              <v-divider class="my-5"></v-divider>
              <h5 class="text-center">
                Don't have account?
                <RouterLink to="/register">Register here.</RouterLink>
              </h5>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </AppLayout>
</template>

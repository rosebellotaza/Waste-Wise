<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue';
</script>

<template>
  <AppLayout>
    <template #content>
      <v-img src="/images/logo2.png" width="400px" class="mx-auto"></v-img>
      <v-row>
        <v-col cols="12" md="6" class="mx-auto pt-8">
          <v-card class="mx-auto" elevation="24" color="green-darken-3">
            <v-card-title class="text-center">
              <h3 class="font-weight-black">Waste Wise</h3>
              <p>Register Form</p>
            </v-card-title>

            <v-card-text class="bg-surface-light pt-4">
              <v-divider class="my-5"></v-divider>
                <RegisterForm></RegisterForm>
              <v-divider class="my-5"></v-divider>
              <v divider class="my-5">
                <h5 class="text-center">
                  Already have account?
                  <RouterLink to="/">Log in here.</RouterLink>
                </h5>
              </v>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </AppLayout>
</template>

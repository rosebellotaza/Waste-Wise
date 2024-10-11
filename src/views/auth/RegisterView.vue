<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
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
              <p>Register Form</p>
            </v-card-title>

            <v-card-text class="bg-surface-light pt-4">
              <v-form fast-fail @submit.prevent>
                <v-text-field
                  label="Firstname"
                  variant="outlined"
                ></v-text-field>
                <v-text-field
                  label="Lastname"
                  variant="outlined"
                ></v-text-field>
                <v-text-field label="Email" variant="outlined"></v-text-field>

                <v-text-field
                  label="Password"
                  type="password"
                  variant="outlined"
                ></v-text-field>
                <v-text-field
                  label="Password Confirmation"
                  variant="outlined"
                ></v-text-field>

                <v-btn class="mt-2" type="submit" block color="green-darken-3"
                  >Register</v-btn
                >
              </v-form>

              <v divider class="my-5">
                <h5 class="text-center">
                  Already have account?
                  <RouterLink to="login">Log in here.</RouterLink>
                </h5>
              </v>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </AppLayout>
</template>

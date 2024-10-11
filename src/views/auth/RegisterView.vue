<script setup>
import { ref } from 'vue'

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar
        class="px-3"
        color="green-darken-4
"
      >
        <v-spacer></v-spacer>

        <v-btn
          :prepend-icon="
            theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
          "
          text="Toggle Theme"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
          <v-row>
            <v-col cols="12" md="6" class="mx-auto pt-16">
              <v-card
                class="mx-auto"
                prepend-icon="mdi-account-plus"
                subtitle="Register"
                elevation="24"
              >
                <template v-slot:title>
                  <span class="font-weight-black">Waste Wise</span>
                </template>

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
                    <v-text-field
                      label="Email"
                      variant="outlined"
                    ></v-text-field>

                    <v-text-field
                      label="Password"
                      type="password"
                      variant="outlined"
                    ></v-text-field>
                    <v-text-field
                      label="Password Confirmation"
                      variant="outlined"
                    ></v-text-field>

                    <v-btn class="mt-2" type="submit" block>Submit</v-btn>
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
        </v-container>
      </v-main>

      <v-footer
        color="green-darken-4
"
        app
        >Copyright @2024. WasteWise</v-footer
      >
    </v-app>
  </v-responsive>
</template>

<script setup>
  import { ref } from 'vue'

  const isPasswordVisible = ref(false)  
  const isConfirmPasswordVisible = ref(false)

</script>

<template>
    <v-form fast-fail @submit.prevent>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            label="First Name"
            prepend-inner-icon="mdi-clipboard-account-outline"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            label="Last Name"
            prepend-inner-icon="mdi-clipboard-account-outline"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field
            label="Email"
            prepend-inner-icon="mdi-email-outline"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
          prepend-inner-icon="mdi-lock-outline"
            label="Password"
            :type="isPasswordVisible ? 'text' : 'password'"
            :append-inner-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="isPasswordVisible = !isPasswordVisible"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
          prepend-inner-icon="mdi-lock-check-outline"
            label="Confirm Password"
            :type="isConfirmPasswordVisible ? 'text' : 'password'"
            :append-inner-icon="isConfirmPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
          ></v-text-field>
        </v-col>
      </v-row>
        
          

                <v-btn class="mt-2 mdi mdi-account-plus" type="submit" block color="green-darken-3"
                  >Register</v-btn
                >
              </v-form>
</template>


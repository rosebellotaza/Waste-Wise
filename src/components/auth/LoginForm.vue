<script setup>
  import { ref } from 'vue'

  const isPasswordVisible = ref(false)
</script>

<template>
    <v-form fast-fail @submit.prevent>
      
      <v-text-field
            label="Email"
            prepend-inner-icon="mdi-email-outline"
          ></v-text-field>

          <v-text-field
          prepend-inner-icon="mdi-lock-outline" 
            label="Password"
            :type="isPasswordVisible ? 'text' : 'password'"
            :append-inner-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>

                <v-btn class="mt-2 mdi mdi-login" type="submit" block color="green-darken-3"
                  >Login</v-btn
                >
              </v-form>
</template>
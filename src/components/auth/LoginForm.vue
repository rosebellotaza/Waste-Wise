<template>
    <v-form fast-fail @submit.prevent>
                <h3 class="mdi mdi-email-outline"  >Email</h3>
                <v-text-field label="" variant="outlined"></v-text-field>

                <h3 class="mdi mdi-lock-outline">Password</h3>
                <v-text-field
                  label=""
                  type="password"
                  variant="outlined"
                ></v-text-field>

                <v-btn class="mt-2" type="submit" block color="green-darken-3"
                  >Login</v-btn
                >
              </v-form>
</template>
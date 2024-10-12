<template>
    <v-form fast-fail @submit.prevent>
                <v-text-field
                  label="Your Name"
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
</template>
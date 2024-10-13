<script setup>
import { ref } from 'vue'

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-responsive class="border rounded" border-radius="50px" >
    <v-app :theme="theme" >
      <v-app-bar
        class="px-3"
        :color="theme === 'light' ? 'green-darken-1' : 'green-darken-4'" border
      >
        <v-spacer></v-spacer>

        <v-btn
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          variant="elevated"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>

      <v-main>
          <slot name="content"></slot>
      </v-main>

      <v-footer :color="theme === 'light' ? 'green-darken-1' : 'green-darken-4'" elevation="24" border app>Copyright @2024. WasteWise</v-footer>
    </v-app>
  </v-responsive>
</template>

<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <template #content>
      <v-card elevation="10">
        <v-layout>
          <v-navigation-drawer
            v-model="drawer"
            :rail="rail"
            permanent
            @click="rail = false"
            color="green-darken-4"
          >
            <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
              title="Jennie Kim"
              nav
            >
              <template v-slot:append>
                <v-btn
                  icon="mdi-chevron-left"
                  variant="text"
                  @click.stop="rail = !rail"
                ></v-btn>
              </template>
            </v-list-item>

            <v-divider></v-divider>

            <v-list density="compact">
              <v-list-item
                prepend-icon="mdi-home-circle"
                title="Home"
                value="home"
              ></v-list-item>
              <v-list-item
                prepend-icon="mdi-information"
                title="About us"
                value="aboutus"
              ></v-list-item>
              <v-list-item
                prepend-icon="mdi-calendar-month"
                title="Schedule"
                value="schedule"
              ></v-list-item>
              <v-list-item
                prepend-icon="mdi-frequently-asked-questions"
                title="Guide"
                value="guide"
              ></v-list-item>
              <v-list-item
                prepend-icon="mdi-contacts"
                title="Contact"
                value="contact"
              ></v-list-item>
            </v-list>
          </v-navigation-drawer>
          <v-main style="height: 700px"></v-main>
        </v-layout>
      </v-card>
    </template>
  </AppLayout>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      rail: true,
    }
  },
}
</script>

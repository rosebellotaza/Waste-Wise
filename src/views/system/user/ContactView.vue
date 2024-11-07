<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'
import { ref } from 'vue'
import emailjs from 'emailjs-com' // Import EmailJS library

const isDrawerVisible = ref(true)

// Form data
const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

// Feedback messages
const formAction = ref({
  formProcess: false,
  formSuccessMessage: '',
  formErrorMessage: ''
})

// Email validation function
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// EmailJS send email function
const sendEmail = async () => {
  formAction.value.formProcess = true

  try {
    const response = await emailjs.send(
      'service_a2ub69m',       // Replace with your Service ID
      'template_0a38e3t',      // Replace with your Template ID
      {
        from_name: form.value.name,
        from_email: form.value.email,
        phone: form.value.phone,
        subject: form.value.subject,
        message: form.value.message,
        to_email: 'rosebellaaa88@gmail.com'  // Optional: replace with the recipient email if dynamic
      },
      'niTQ_1ZoaHP_fVr20'           // Replace with your User ID
    )

    formAction.value.formSuccessMessage = 'Message sent successfully!'
    form.value = { name: '', email: '', phone: '', subject: '', message: '' } // Reset form fields

    // Hide the success message after 5 seconds
    setTimeout(() => {
      formAction.value.formSuccessMessage = '';
    }, 5000);
  } catch (error) {
    formAction.value.formErrorMessage = 'Failed to send message. Please try again later.';
    console.error('EmailJS Error:', error); // Log error for debugging
  }

  formAction.value.formProcess = false
}

const onFormSubmit = () => {
  formAction.value.formErrorMessage = ''; // Reset error message

  if (!form.value.name || !form.value.email || !form.value.message) {
    formAction.value.formErrorMessage = 'Please fill in all required fields.';
    return;
  }
  
  if (!isValidEmail(form.value.email)) {
    formAction.value.formErrorMessage = 'Please enter a valid email address.';
    return;
  }

  sendEmail();
}
</script>

<template>
  <AppLayout
    :is-with-app-bar-nav-icon="true"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <template #navigation>
      <SideNavigation :is-drawer-visible="isDrawerVisible"></SideNavigation>
    </template>

    <template #content>
      <v-container>
        <!-- Breadcrumbs Card -->
        <v-card class="mb-5">
          <template #title>
            <span class="text-h6 font-weight-bold">
              <v-breadcrumbs :items="['System', 'Contact Us']" color="green-darken-3"></v-breadcrumbs>
            </span>
          </template>
        </v-card>

        <!-- Title Card -->
        <v-card class="my-5 border-green" color="green-lighten-5" outlined>
          <br>
          <p class="text-center font-weight-bold text-green-darken-1">GET 24/7 SUPPORT</p>
          <v-card-title class="text-h5 font-weight-bold text-center">CONTACT US</v-card-title>
          <br>
        </v-card>

        <!-- Contact Section -->
        <v-row class="my-5">
          <!-- Left Side: Contact Form -->
          <v-col cols="12" md="8">
            <v-card class="pa-5 border-green" outlined>
              <h2 class="text-h5 font-weight-bold text-green-darken-1">Have you any question?</h2>
              <p>Feel free to contact us and leave a message! Waste Wise will keep in touch with you.</p>

              <!-- Success/Error Notification -->
              <v-alert v-if="formAction.formSuccessMessage" type="success" class="mb-4">
                {{ formAction.formSuccessMessage }}
              </v-alert>
              <v-alert v-if="formAction.formErrorMessage" type="error" class="mb-4">
                {{ formAction.formErrorMessage }}
              </v-alert>

              <!-- Form -->
              <v-form @submit.prevent="onFormSubmit">
                <v-text-field
                  v-model="form.name"
                  label="Name"
                  outlined
                  dense
                  class="my-4"
                  placeholder="Enter your name"
                  required
                >
                  <template #prepend-inner>
                    <v-icon color="green-darken-4">mdi-account</v-icon>
                  </template>
                </v-text-field>

                <v-text-field
                  v-model="form.email"
                  label="Email"
                  outlined
                  dense
                  class="my-4"
                  placeholder="Enter your email"
                  required
                >
                  <template #prepend-inner>
                    <v-icon color="green-darken-4">mdi-email</v-icon>
                  </template>
                </v-text-field>

                <v-text-field
                  v-model="form.phone"
                  label="Phone"
                  outlined
                  dense
                  class="my-4"
                  placeholder="Enter your phone number"
                >
                  <template #prepend-inner>
                    <v-icon color="green-darken-4">mdi-phone</v-icon>
                  </template>
                </v-text-field>

                <v-text-field
                  v-model="form.subject"
                  label="Subject"
                  outlined
                  dense
                  class="my-4"
                  placeholder="Enter subject"
                >
                  <template #prepend-inner>
                    <v-icon color="green-darken-4">mdi-format-title</v-icon>
                  </template>
                </v-text-field>

                <v-textarea
                  v-model="form.message"
                  label="Message"
                  outlined
                  dense
                  rows="4"
                  class="my-4"
                  placeholder="Enter your message"
                  required
                >
                  <template #prepend-inner>
                    <v-icon color="green-darken-4">mdi-comment-text-outline</v-icon>
                  </template>
                </v-textarea>

                <v-btn :loading="formAction.formProcess" color="green-darken-4" class="mt-4 submit" outlined type="submit">
                  <template v-if="formAction.formProcess">Sending...</template>
                  <template v-else>SUBMIT</template>
                </v-btn>
              </v-form>
            </v-card>
          </v-col>

          <!-- Right Side: Shop Information -->
          <v-col cols="12" md="4">
            <v-card class="pa-5 border-green" outlined>
              <h2 class="text-h6 font-weight-bold">
                <v-icon color="green darken-4" class="mr-2">mdi-map-marker</v-icon>
                Shop Address
              </h2>
              <p>Butuan City, Ampayon<br>Philippines</p>

              <h2 class="text-h6 font-weight-bold mt-5">
                <v-icon color="green darken-4" class="mr-2">mdi-clock-outline</v-icon>
                Shop Hours
              </h2>
              <p>
                MON - FRIDAY: 8 AM to 6 PM<br>
                SAT - SUN: 10 AM to 3 PM
              </p>

              <h2 class="text-h6 font-weight-bold mt-5">
                <v-icon color="green darken-4" class="mr-2">mdi-phone</v-icon>
                Contact
              </h2>
              <p>Phone: +00 111 222 3333<br>Email: wastewise@gmail.com</p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- <v-footer :color="theme === 'light' ? 'green-darken-1' : 'green-darken-4'" elevation="24" border app>
        <div :class="mobile ? 'w-100 text-center' : ''">
          Copyright © 2024 - Waste Wise | All Rights Reserved
        </div>
      </v-footer> -->
    </template>
  </AppLayout>
</template>

<style scoped>
/* Centered heading animation */
h2 {
  animation: fadeInUp 1s ease;
}

/* Slide-in animation for cards */
.v-card {
  animation: slideIn 0.6s ease;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.border-green {
    border: 2px solid #4B8B3B;
}

</style>

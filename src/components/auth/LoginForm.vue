<script setup>
import AlertNotification from '@/components/common/AlertNotification.vue'
import { formActionDefault, supabase } from '@/utils/supabase'
import { requiredValidator, emailValidator } from '@/utils/validators'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Utilize pre-defined vue functions
const router = useRouter()

// Load Variables
const formDataDefault = {
  email: '',
  password: '',
}
const formData = ref({
  ...formDataDefault,
})
const formAction = ref({
  ...formActionDefault,
})
const isPasswordVisible = ref(false)
const refVForm = ref()

// Updated onSubmit function with role-based logic
const onSubmit = async () => {
  // Reset Form Action utils; Turn on processing at the same time
  formAction.value = { ...formActionDefault, formProcess: true };

  // Sign in the user with Supabase authentication
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.value.email,
    password: formData.value.password,
  });

  if (error) {
    // Add Error Message and Status Code
    formAction.value.formErrorMessage = error.message;
    formAction.value.formStatus = error.status;
  } else if (data) {
    // Retrieve user metadata to check if the user is an admin
    const userMetadata = data.user.user_metadata;
    const isAdmin = userMetadata.is_admin;

    // Check if the selected role matches the user's is_admin status
    if ((formData.value.role === 'Collector' && !isAdmin) || 
        (formData.value.role === 'User' && isAdmin)) {
      formAction.value.formErrorMessage = 'Invalid role selection for your account type.';
      formAction.value.formProcess = false;
      return;
    }

    // Set Success Message
    formAction.value.formSuccessMessage = 'Successfully Logged In.';

    // Redirect based on role
    if (formData.value.role === 'User') {
      router.replace('/dashboard');
    } else if (formData.value.role === 'Collector') {
      router.replace('/collector/dashboard');
    }
  }

  // Reset Form
  refVForm.value?.reset();
  // Turn off processing
  formAction.value.formProcess = false;
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}
</script>


<template>
  <AlertNotification
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  ></AlertNotification>

  <v-form class="mt-4" ref="refVForm" @submit.prevent="onFormSubmit">
    <!-- Email field with colored icon -->
    <v-text-field
      v-model="formData.email"
      label="Email"
      :rules="[requiredValidator, emailValidator]"
    >
      <template v-slot:prepend-inner>
        <v-icon color="green-darken-3">mdi-email-outline</v-icon>
      </template>
    </v-text-field>

    <!-- Password field with colored icons and toggle for password visibility -->
    <v-text-field
      v-model="formData.password"
      label="Password"
      :type="isPasswordVisible ? 'text' : 'password'"
      :rules="[requiredValidator]"
    >
      <template v-slot:prepend-inner>
        <v-icon color="green-darken-3">mdi-lock-outline</v-icon>
      </template>
      <template v-slot:append-inner>
        <v-icon
          color="green-darken-3"
          @click="isPasswordVisible = !isPasswordVisible"
        >
          {{ isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off' }}
        </v-icon>
      </template>
    </v-text-field>

    <!-- Role selection field (User or Collector) with an icon inside -->
    <v-select
      v-model="formData.role"
      label="Role"
      :items="['User', 'Collector']"
      :rules="[requiredValidator]"
    >
      <template v-slot:prepend-inner>
        <v-icon color="green-darken-3">mdi-account-outline</v-icon>
      </template>
    </v-select>

    <!-- Login button -->
    <v-btn
      type="submit"
      block
      color="green-darken-3"
      :disabled="formAction.formProcess"
      :loading="formAction.formProcess"
    >
      Login
    </v-btn>
  </v-form>
</template>

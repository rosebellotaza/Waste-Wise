<script setup>
import AlertNotification from '@/components/common/AlertNotification.vue'
import { useAuthUserStore } from '@/stores/authUser'
import { formActionDefault } from '@/utils/supabase.js'
import { imageValidator, requiredValidator } from '@/utils/validators'
import { ref } from 'vue'

// Utilize pre-defined vue functions
const authStore = useAuthUserStore()

// Load Variables
const formDataDefault = {
  image: null
}
const formData = ref({
  ...formDataDefault
})
const formAction = ref({
  ...formActionDefault
})
const refVForm = ref()
const imgPreview = ref(authStore.userData.image_url || '/images/img-profile.png')

// Function to handle file change and show image preview
const onPreview = (event) => {
  const fileReader = new FileReader()
  const { files } = event.target
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        // Update formData
        formData.value.image = files[0]
        // Update imgPreview state
        imgPreview.value = fileReader.result
      }
    }
  }
}

// Function to reset preview if file-input clear is clicked
const onPreviewReset = () => {
  imgPreview.value = authStore.userData.image_url || '/images/img-profile.png'
}

// Submit Functionality
const onSubmit = async () => {
  /// Reset Form Action utils; Turn on processing at the same time
  formAction.value = { ...formActionDefault, formProcess: true }

  const response = await authStore.updateUserImage(formData.value.image)

  // Check if successful
  if (response.success) {
    formAction.value.formSuccessMessage = 'Successfully Updated Profile Image.'
  } else {
    // Add Error Message and Status Code
    formAction.value.formErrorMessage = response.error.message
    formAction.value.formStatus = response.error.status
  }

  // Turn off processing
  formAction.value.formProcess = false
}

// Trigger Validators
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
  />

  <v-form ref="refVForm" @submit.prevent="onFormSubmit" class="profile-update-form mx-auto my-8 pa-5 rounded-lg elevation-3">
    <v-row align="center" class="text-center mb-8">
      <v-col cols="12" md="5" class="d-flex justify-center">
        <v-hover v-slot:default="{ isHovering }">
          <v-img
            class="profile-image rounded-circle shadow transition"
            :class="{ 'scale-hover': isHovering }"
            width="150"
            height="200"
            :src="imgPreview || '/images/img-profile.png'"
            alt="Profile Picture Preview"
            color="grey-lighten-4"
            cover
          >
            <template v-slot:placeholder>
              <v-icon color="grey-darken-1" size="64">mdi-account-circle</v-icon>
            </template>
          </v-img>
        </v-hover>
      </v-col>

      <v-col cols="12" md="7" class="text-md-left">
        <v-file-input
          class="mt-4 mb-4"
          :rules="[requiredValidator, imageValidator]"
          accept="image/png, image/jpeg, image/bmp"
          label="Select Profile Picture"
          placeholder="Upload your photo"
          prepend-icon="mdi-camera"
          show-size
          rounded
          dense
          @change="onPreview"
          @click:clear="onPreviewReset"
        />

        <v-btn
          type="submit"
          class="update-button mt-4 py-3 px-8 text-uppercase font-weight-bold rounded-pill"
          color="success"
          prepend-icon="mdi-image-edit-outline"
          :disabled="formAction.formProcess"
          :loading="formAction.formProcess"
          style="margin-left: 0;"
        >
          Save Changes
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<style scoped>
.profile-update-form {
  max-width: 700px;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
}

.profile-image {
  transition: transform 0.3s ease;
}

.scale-hover {
  transform: scale(1.05);
}

.update-button {
  background-color: #4CAF50;
  color: #fff;
  transition: background-color 0.3s ease;
}

.update-button:hover {
  background-color: #43a047;
}
</style>


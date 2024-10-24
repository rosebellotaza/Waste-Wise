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
  ></AlertNotification>

  <v-form class="mt-5" ref="refVForm" @submit.prevent="onFormSubmit">
    <v-row>
      <v-col cols="12" md="5">
        <v-img
          width="55%"
          class="mx-auto rounded-circle"
          color="green-darken-4"
          aspect-ratio="1"
          :src="imgPreview"
          alt="Profile Picture Preview"
          cover
        >
        </v-img>
      </v-col>

      <v-col cols="12" md="7">
        <v-file-input
          class="mt-5"
          :rules="[requiredValidator, imageValidator]"
          accept="image/png, image/jpeg, image/bmp"
          label="Browse Profile Picture"
          placeholder="Browse Profile Picture"
          prepend-icon="mdi-camera"
          show-size
          chips
          @change="onPreview"
          @click:clear="onPreviewReset"
        ></v-file-input>

        <v-btn
          class="mt-2"
          type="submit"
          color="green-darken-4"
          prepend-icon="mdi-image-edit"
          :disabled="formAction.formProcess"
          :loading="formAction.formProcess"
        >
          Update Picture
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
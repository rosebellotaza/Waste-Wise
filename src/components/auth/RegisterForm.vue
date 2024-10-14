<script setup>
import { requiredValidator,emailValidator, passwordValidator, confirmedValidator } from '@/utils/validators';
  import { ref } from 'vue'
  import AlertNotification from '@/components/common/AlertNotification.vue';
  import {supabase, formActionDefault } from '@/utils/supabase.js'
  import { useRouter } from 'vue-router';

  const router = useRouter ()

  const formDataDefault = {
    firstname: '' ,
    lastname: '' ,
    email: '' ,
    password: '' ,
    password_confirmation: '' 
  }

  const formData = ref ({
    ...formDataDefault
  })

  const formAction = ref ({
    ...formActionDefault
  })

  const isPasswordVisible = ref(false)  
  const isConfirmPasswordVisible = ref(false)
  const refVForm = ref()


  const onSubmit = async() => {
    formAction.value = { ...formActionDefault, formProcess: true}

    const { data, error } = await supabase.auth.signUp({
    email: formData.value.email,
    password: formData.value.password,
    options: {
      data: {
        firstname:formData.value.firstname,
        lastname: formData.value.lastname,
        // is_admin:true
      }
    }
  })

if(error) {
  // console.log(error)
  formAction.value.formErrorMessage = error.message
  formAction.value.formStatus = error.status
}
else if (data) {
  // console.log(data)
  formAction.value.formSuccessMessage = 'Successfully Registered Account!'
  //Add here more actions if you want
  // refVForm.value?.reset()
  router.replace('/dashboard')
}

refVForm.value?.reset()
formAction.value.formProcess = false
}

  
  const onFormSubmit = () => {
    refVForm.value?.validate().then(({ valid}) => {
      if(valid) onSubmit()
  })
  }

</script>

<template>
  <AlertNotification 
  :form-success-message="formAction.formSuccessMessage" 
  :form-error-message="formAction.formErrorMessage"
  ></AlertNotification>
    <v-form class="mt-4" ref="refVForm" @submit.prevent="onFormSubmit">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="formData.firstname"
            label="First Name"
            prepend-inner-icon="mdi-clipboard-account-outline" :rules="[requiredValidator]"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field v-model="formData.lastname"
            label="Last Name"
            prepend-inner-icon="mdi-clipboard-account-outline" :rules="[requiredValidator]"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field v-model="formData.email"
            label="Email"
            prepend-inner-icon="mdi-email-outline":rules="[requiredValidator, emailValidator]"
            
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field v-model="formData.password"
          prepend-inner-icon="mdi-lock-outline"
            label="Password"
            :type="isPasswordVisible ? 'text' : 'password'"
            :append-inner-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="isPasswordVisible = !isPasswordVisible":rules="[requiredValidator, passwordValidator]"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field v-model="formData.password_confirmation"
          prepend-inner-icon="mdi-lock-check-outline"
            label="Confirm Password"
            :type="isConfirmPasswordVisible ? 'text' : 'password'"
            :append-inner-icon="isConfirmPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible" :rules="[requiredValidator, confirmedValidator(formData.password_confirmation, formData.password)]"
          ></v-text-field>
        </v-col>
      </v-row>
                <v-btn 
                class="mt-2 mdi mdi-account-plus" type="submit" block color="green-darken-3" 
                :disabled="formAction.formProcess" 
                :loading="formAction.formProcess" 
                  >Register</v-btn
                >
              </v-form>
</template>


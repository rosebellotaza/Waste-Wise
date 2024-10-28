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
        is_admin:false,
        // role: 'Collector'//if role based
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
  // router.replace('/register')
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
        <v-text-field 
          v-model="formData.firstname"
          label="First Name"
          :rules="[requiredValidator]"
        >
          <template v-slot:prepend-inner>
            <v-icon color="green-darken-3">mdi-clipboard-account-outline</v-icon>
          </template>
        </v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field 
          v-model="formData.lastname"
          label="Last Name"
          :rules="[requiredValidator]"
        >
          <template v-slot:prepend-inner>
            <v-icon color="green-darken-3">mdi-clipboard-account-outline</v-icon>
          </template>
        </v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field 
          v-model="formData.email"
          label="Email"
          :rules="[requiredValidator, emailValidator]"
        >
          <template v-slot:prepend-inner>
            <v-icon color="green-darken-3">mdi-email-outline</v-icon>
          </template>
        </v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field 
          v-model="formData.password"
          label="Password"
          :type="isPasswordVisible ? 'text' : 'password'"
          :rules="[requiredValidator, passwordValidator]"
        >
          <template v-slot:prepend-inner>
            <v-icon color="green-darken-3">mdi-lock-outline</v-icon>
          </template>
          <template v-slot:append-inner>
            <v-icon color="green-darken-3" @click="isPasswordVisible = !isPasswordVisible">
              {{ isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off' }}
            </v-icon>
          </template>
        </v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field 
          v-model="formData.password_confirmation"
          label="Confirm Password"
          :type="isConfirmPasswordVisible ? 'text' : 'password'"
          :rules="[requiredValidator, confirmedValidator(formData.password_confirmation, formData.password)]"
        >
          <template v-slot:prepend-inner>
            <v-icon color="green-darken-3">mdi-lock-check-outline</v-icon>
          </template>
          <template v-slot:append-inner>
            <v-icon color="green-darken-3" @click="isConfirmPasswordVisible = !isConfirmPasswordVisible">
              {{ isConfirmPasswordVisible ? 'mdi-eye' : 'mdi-eye-off' }}
            </v-icon>
          </template>
        </v-text-field>
      </v-col>
    </v-row>

    <v-btn 
      type="submit" 
      block 
      color="green-darken-3" 
      :disabled="formAction.formProcess" 
      :loading="formAction.formProcess"
    >
      Register
    </v-btn>
  </v-form>
</template>



<script setup>
import { requiredValidator,emailValidator, passwordValidator, confirmedValidator } from '@/utils/validators';
  import { ref } from 'vue'

  const refVForm = ref()

  const formDataDefault = {
    firstname: '' ,
    lastname: '' ,
    email: '' ,
    password: '' ,
    password_confirmation: '' ,
  }

  const formData = ref ({
    ...formDataDefault
  })

  const isPasswordVisible = ref(false)  
  const isConfirmPasswordVisible = ref(false)

  const onSubmit = () => {
    alert(formData.value.email)
  }
  
  const onFormSubmit = () => {
    refVForm.value?.validate().then(({ valid}) => {
      if(valid)
      onSubmit()
  })
  }

</script>

<template>
    <v-form ref="refVForm" @submit.prevent="onFormSubmit">
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
        
          

                <v-btn class="mt-2 mdi mdi-account-plus" type="submit" block color="green-darken-3"
                  >Register</v-btn
                >
              </v-form>
</template>


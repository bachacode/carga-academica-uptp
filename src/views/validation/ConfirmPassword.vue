<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { onMounted, reactive, ref } from 'vue'
import InputError from '@/components/InputError.vue'
import InputField from '@/components/InputField.vue'
import InputComponent from '@/components/InputComponent.vue'
import router from '@/router'
import { useVuelidate } from '@vuelidate/core'
import { computed } from '@vue/reactivity'
import { requiredValidation, minLengthValidation, passwordValidation } from '@/helpers/validationHelpers'
const auth = useAuthStore()
const formData = reactive({
  token: '',
  password: '',
  confirmPassword: ''
})
const formRules = computed(() => {
  return {
    token: {
      required: requiredValidation
    },
    password: {
      required: requiredValidation(),
      minLength: minLengthValidation(8)
    },
    confirmPassword: {
      required: requiredValidation(),
      minLength: minLengthValidation(8),
      password: passwordValidation(formData.password)
    },
  }
})
const v$ = useVuelidate(formRules, formData)
const submit = async () => {
  await v$.value.$validate()
  if (!v$.value.$error) {
    await auth.changePassword(
      formData.token,
      formData.password,
      formData.confirmPassword
      )
  }
}

onMounted(() => {
  if(typeof router.currentRoute.value.query.token == 'string') {
    formData.token = router.currentRoute.value.query.token
  }
})
</script>

<template>
  <main class="h-screen bg-blue-100">
    <div class="flex w-full flex-wrap">
      <!-- Recover Password Section -->
      <div class="flex w-full flex-col md:w-1/2">
        <div class="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
          <span class="bg-blue-800 p-4 text-xl font-bold text-white">Logo</span>
        </div>
        <div
        class="my-auto flex flex-col justify-center px-8 pt-8 md:justify-start md:px-24 md:pt-0 lg:px-32"
        >
        <p class="text-center text-3xl">Recuperación de contraseña</p>
        <form class="flex flex-col pt-3 md:pt-8" @submit.prevent="submit()">
          <InputError
          v-if="auth.errors.isActive"
          classes="text-center"
          :message="auth.errors.message"
          />
          
          <!-- Contraseña -->
          <InputField label="Nueva Contraseña" name="password">
            <template #InputField
            ><InputComponent type="password" name="password" v-model.trim="formData.password"
            /></template>
            <template #InputError
            ><InputError v-if="v$.password.$error" :message="v$.password.$errors[0]?.$message"
            /></template>
          </InputField>
          
          <!-- Confirmar contraseña -->
          <InputField label="Confirmar Nueva Contraseña" name="confirmPassword">
            <template #InputField
            ><InputComponent
            type="password"
            name="confirmPassword"
            v-model.trim="formData.confirmPassword"
            /></template>
            <template #InputError
            ><InputError
            v-if="v$.confirmPassword.$error"
            :message="v$.confirmPassword.$errors[0]?.$message"
            /></template>
          </InputField>

          <button
          type="submit"
          class="mt-2 bg-blue-800 p-2 text-lg font-bold text-white hover:bg-blue-900"
          >
          Cambiar Contraseña
        </button>
      </form>
    </div>
  </div>
  
  <!-- Image Section -->
  <div class="w-1/2 shadow-2xl">
    <img
    class="hidden h-screen w-full object-cover md:block"
    src="https://source.unsplash.com/IXUM4cJynP0"
    />
  </div>
</div>
</main>
</template>
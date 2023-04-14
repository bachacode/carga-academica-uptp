<script setup lang="ts">
import GuessLayout from '../GuessLayout.vue'
import { useAuthStore } from '@/stores/auth'
import { onMounted, reactive, ref } from 'vue'
import InputError from '@/components/InputError.vue'
import InputField from '@/components/InputField.vue'
import InputComponent from '@/components/InputComponent.vue'
import router from '@/router'
import { useVuelidate } from '@vuelidate/core'
import { computed } from 'vue'
import { requiredValidation, minLengthValidation } from '@/helpers/validationHelpers'
const auth = useAuthStore()
const formData = reactive({
  token: '',
  password: ''
})
const formSent = ref(false)
const formRules = computed(() => {
  return {
    token: {
      required: requiredValidation
    },
    password: {
      required: requiredValidation(),
      minLength: minLengthValidation(8)
    }
  }
})
const v$ = useVuelidate(formRules, formData)
const submit = async () => {
  await v$.value.$validate()
  if (!v$.value.$error) {
    await auth.pb
      .collection('users')
      .confirmEmailChange(formData.token, formData.password)
      .then(async () => {
        formSent.value = true
        if (auth.user?.username) {
          await auth.pb.collection('users').authWithPassword(auth.user?.username, formData.password)
        }
      })
      .catch(() => {
        auth.errors.message = 'La contraseña es incorrecta!'
        auth.errors.isActive = true
        setTimeout(() => {
          auth.errors.isActive = false
        }, 3000)
      })
  }
}

onMounted(() => {
  if (typeof router.currentRoute.value.query.token == 'string') {
    formData.token = router.currentRoute.value.query.token
  }
})
</script>

<template>
  <GuessLayout title="Cambio de correo">
    <template v-if="!formSent">
      <form class="flex flex-col pt-3 md:pt-8" @submit.prevent="submit()">
        <!-- Contraseña -->
        <InputField label="Introduzca su contraseña" name="password">
          <template #InputField
            ><InputComponent type="password" name="password" v-model.trim="formData.password"
          /></template>
          <template #InputError
            ><InputError
              v-if="auth.errors.isActive"
              classes="text-center"
              :message="auth.errors.message"
          /></template>
        </InputField>
        <button
          type="submit"
          class="mt-2 bg-blue-800 p-2 text-lg font-bold text-white hover:bg-blue-900"
        >
          Cambiar Correo
        </button>
      </form>
    </template>
    <template v-else>
      <div class="mt-6 rounded-lg p-2">
        <p class="text-center text-4xl font-bold text-blue-900">
          ¡Tu correo ha sido cambiado correctamente!
        </p>
      </div>
    </template>
  </GuessLayout>
</template>

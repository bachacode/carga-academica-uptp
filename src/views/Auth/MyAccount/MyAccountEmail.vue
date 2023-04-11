<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import CardContainer from '@/components/Containers/CardContainer.vue'
import InputComponent from '@/components/InputComponent.vue';
import { reactive, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { emailValidation, requiredValidation } from '@/helpers/validationHelpers';
import InputField from '@/components/InputField.vue';
const auth = useAuthStore()
const form = reactive({
  email: ''
})

const rules = computed(() => {
  return {
    email: {
      required: requiredValidation(),
      email: emailValidation()
    }
  }
})
const v$ = useVuelidate(rules, form)
</script>

<template>
  <!-- Cambiar Contraseña -->
  <CardContainer card-width="w-3/4" class="flex-grow">
    <div class="mt-4 px-6 pb-6">
      <p class="font-bold pb-6 text-lg">Correo electronico actual: <span class="font-semibold border border-blue-600 px-2 py-1 rounded-lg text-blue-900 bg-blue-100">{{ auth.user?.email }}</span></p>
      <InputField label="Nuevo Correo:" name="email" :col="false" class="text-lg">
        <template #InputField
          ><InputComponent
            input-classes="p-1 ml-2"
            type="password"
            name="email"
            v-model="form.email"
        /></template>
        <template #InputError
          ><InputError v-if="v$.email.$error" :message="v$.email.$errors[0]?.$message"
        /></template>
      </InputField>
    </div>
  </CardContainer>
</template>

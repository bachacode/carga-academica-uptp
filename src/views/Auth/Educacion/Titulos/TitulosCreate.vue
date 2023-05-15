<script setup lang="ts">
import AuthLayout from '@/views/Auth/AuthLayout.vue'
import InputField from '@/components/InputField.vue'
import { computed, reactive, ref } from 'vue'
import { useTituloStore, type tituloType } from '@/stores/titulos'
import FormComponent from '@/components/Containers/FormComponent.vue'
import { useVuelidate } from '@vuelidate/core'
import InputError from '@/components/InputError.vue'
import InputComponent from '@/components/InputComponent.vue'
import { maxLengthValidation, requiredValidation } from '@/helpers/validationHelpers'
// Store del módulo
const store = useTituloStore()

// Booleano para el botón de submit
const isLoading = ref(false)

// Variables reactivas del formulario
const formData = reactive<tituloType>({
  grado: '',
  nombre: ''
})

// Reglas de validación
const formRules = computed(() => {
  return {
    grado: {
      required: requiredValidation(),
      maxLength: maxLengthValidation(80)
    },
    nombre: {
      required: requiredValidation(),
      maxLength: maxLengthValidation(80)
    }
  }
})

// Validación
const v$ = useVuelidate(formRules, formData)

// Función para enviar el formulario
const submitData = async () => {
  await v$.value.$validate()
  if (!v$.value.$error) {
    isLoading.value = true
    await store.save(formData)
    isLoading.value = false
  }
}
</script>

<template>
  <FormComponent
    class="flex-grow"
    form-width="w-3/4"
    submit-text="Registrar titulo"
    @form-submit="submitData"
    :is-loading="isLoading"
  >
    <template #inputs>
      <!-- Grado -->
      <InputField label="Grado del titulo" name="grado">
        <template #InputField><InputComponent name="grado" v-model="formData.grado" /></template>
        <template #InputError
          ><InputError v-if="v$.grado.$error" :message="v$.grado.$errors[0]?.$message"
        /></template>
      </InputField>

      <!-- Titulo -->
      <InputField label="Nombre del titulo" name="nombre">
        <template #InputField><InputComponent name="nombre" v-model="formData.nombre" /></template>
        <template #InputError
          ><InputError v-if="v$.nombre.$error" :message="v$.nombre.$errors[0]?.$message"
        /></template>
      </InputField>
    </template>
  </FormComponent>
</template>

<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue'
import InputField from '@/components/InputField.vue'
import { computed, reactive, ref } from 'vue'
import { useSaberStore, type Saber } from '@/stores/saberes'
import FormComponent from '@/components/Containers/FormComponent.vue'
import { useVuelidate } from '@vuelidate/core'
import InputError from '@/components/InputError.vue'
import InputComponent from '@/components/InputComponent.vue'
import InputSelect from '@/components/InputSelect.vue'
import {
  maxLengthValidation,
  maxValueValidation,
  minLengthValidation,
  minValueValidation,
  numericValidation,
  requiredValidation
} from '@/helpers/validationHelpers'
// Store del módulo
const store = useSaberStore()

// Booleano para el botón de submit
const isLoading = ref(false)

// Variables reactivas del formulario
const formData = reactive<Saber>({
  nombre: '',
  trayecto: '',
  horas: ''
})

// Reglas de validación
const formRules = computed(() => {
  return {
    nombre: {
      required: requiredValidation(),
      minLength: minLengthValidation(),
      maxLength: maxLengthValidation(80)
    },
    trayecto: {
      required: requiredValidation(),
      numeric: numericValidation(),
      minValue: minValueValidation(),
      maxValue: maxValueValidation(1)
    },
    horas: {
      required: requiredValidation(),
      numeric: numericValidation(),
      minValue: minValueValidation(1),
      maxValue: maxValueValidation(99)
    }
  }
})

// Opciones del Select "Trayectos"
const trayectoOptions = [
  { value: 1, name: 'Trayecto 1' },
  { value: 2, name: 'Trayecto 2' },
  { value: 3, name: 'Trayecto 3' },
  { value: 4, name: 'Trayecto 4' }
]

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
  <AuthLayout>
    <FormComponent form-title="Módulo saberes" submit-text="Crear Saber" @form-submit="submitData" :is-loading="isLoading">
      <template #inputs>
        <!-- Saber -->
        <InputField label="Nombre del saber" name="saber">
          <template #InputField><InputComponent name="saber" v-model="formData.nombre" /></template>
          <template #InputError
            ><InputError v-if="v$.nombre.$error" :message="v$.nombre.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- Trayecto -->
        <InputField label="Trayecto" name="trayecto">
          <template #InputField
            ><InputSelect
              :options="trayectoOptions"
              placeholder="Seleccione un trayecto"
              name="trayecto"
              v-model="formData.trayecto"
          /></template>
          <template #InputError
            ><InputError v-if="v$.trayecto.$error" :message="v$.trayecto.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- Horas -->
        <InputField label="Horas" name="horas">
          <template #InputField><InputComponent name="horas" v-model="formData.horas" /></template>
          <template #InputError
            ><InputError v-if="v$.horas.$error" :message="v$.horas.$errors[0]?.$message"
          /></template>
        </InputField>
      </template>
    </FormComponent>
  </AuthLayout>
</template>

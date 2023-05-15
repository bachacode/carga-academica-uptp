<script setup lang="ts">
import InputField from '@/components/InputField.vue'
import { computed, reactive, ref } from 'vue'
import { useLineaStore, type lineaType } from '@/stores/lineas'
import FormComponent from '@/components/Containers/FormComponent.vue'
import { useVuelidate } from '@vuelidate/core'
import InputError from '@/components/InputError.vue'
import InputComponent from '@/components/InputComponent.vue'
import { maxLengthValidation, requiredValidation } from '@/helpers/validationHelpers'
import InputSelect from '@/components/InputSelect.vue'
// Store del módulo
const store = useLineaStore()

// Booleano para el botón de submit
const isLoading = ref(false)

// Variables reactivas del formulario
const formData = reactive<lineaType>({
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

// Opciones del Select "Grados"
const gradoOptions = [
  { value: '???', name: '???' },
  { value: '???', name: '???' },
  { value: '???', name: '???' }
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
  <FormComponent
    class="mt-14 flex-grow"
    form-width="w-3/4"
    submit-text="Registrar Linea de Investigación"
    @form-submit="submitData"
    :is-loading="isLoading"
  >
    <template #inputs>
      <div class="flex w-full items-center space-x-2 py-6">
        <!-- Grado -->
        <div class="w-1/3">
          <InputField label="Grado Acádemico" name="grado">
            <template #InputField
              ><InputSelect
                name="grado"
                v-model="formData.grado"
                :options="gradoOptions"
                placeholder="Seleccione el grado"
            /></template>
            <template #InputError
              ><InputError v-if="v$.grado.$error" :message="v$.grado.$errors[0]?.$message"
            /></template>
          </InputField>
        </div>
        <span class="px-1">en</span>
        <!-- Titulo -->
        <InputField label="Nombre de la línea de investigación" name="nombre">
          <template #InputField
            ><InputComponent name="nombre" v-model="formData.nombre"
          /></template>
          <template #InputError
            ><InputError v-if="v$.nombre.$error" :message="v$.nombre.$errors[0]?.$message"
          /></template>
        </InputField>
      </div>
    </template>
  </FormComponent>
</template>

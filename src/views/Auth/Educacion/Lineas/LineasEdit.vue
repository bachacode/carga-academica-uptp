<script setup lang="ts">
import InputField from '@/components/InputField.vue'
import { ref, onMounted, reactive, computed } from 'vue'
import { useLineaStore, type lineaType } from '@/stores/lineas'
import router from '@/router'
import { useVuelidate } from '@vuelidate/core'
import InputError from '@/components/InputError.vue'
import InputComponent from '@/components/InputComponent.vue'
import FormComponent from '@/components/Containers/FormComponent.vue'
import { maxLengthValidation, requiredValidation } from '@/helpers/validationHelpers'
import InputSelect from '@/components/InputSelect.vue'
// Store del módulo
const store = useLineaStore()

// Booleano para el botón de submit
const isLoading = ref(false)

// Id del item a editar
const id = ref()

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

// Objeto de validaciáon
const v$ = useVuelidate(formRules, formData)

// Función para enviar el formulario
const submitData = async () => {
  await v$.value.$validate()
  if (!v$.value.$error) {
    isLoading.value = true
    await store.update(id.value, formData)
    isLoading.value = false
  }
}

// Al inicializar el componente, asigna el id de la ruta a una variable reactiva de vue
onMounted(async () => {
  if (!(router.currentRoute.value.params.id instanceof Array)) {
    id.value = router.currentRoute.value.params.id
    await store.fetchOne(router.currentRoute.value.params.id)
    if (store.singleData) {
      Object.assign(formData, store.singleData)
    }
  }
})
</script>

<template>
  <FormComponent
    class="mt-14 flex-grow"
    form-width="w-3/4"
    submit-text="Registrar titulo"
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

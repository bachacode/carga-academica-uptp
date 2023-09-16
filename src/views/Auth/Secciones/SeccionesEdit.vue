<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue'
import InputField from '@/components/InputField.vue'
import { ref, onMounted, reactive, computed } from 'vue'
import { useSeccionStore, type Seccion } from '@/stores/secciones'
import router from '@/router'
import { useVuelidate } from '@vuelidate/core'
import InputError from '@/components/InputError.vue'
import InputComponent from '@/components/InputComponent.vue'
import FormComponent from '@/components/Containers/FormComponent.vue'
import InputSelect from '@/components/InputSelect.vue'
import {
  isUnique,
  maxLengthValidation,
  maxValueValidation,
  minLengthValidation,
  minValueValidation,
  numericValidation,
  requiredValidation,
  uniqueValidation
} from '@/helpers/validationHelpers'
// Store del módulo
const store = useSeccionStore()

// Booleano para el botón de submit
const isLoading = ref(false)

// Id del item a editar
const id = ref()

// Datos del registro a editar
const singleData = reactive<Seccion>({
  codigo: '',
  trayecto: '',
  estudiantes: ''
})

// Variables reactivas del formulario
const formData = reactive<Seccion>({
  codigo: '',
  trayecto: '',
  estudiantes: ''
})

// Validación Unica
const isCodigoTaken = isUnique(store, 'codigo', singleData)

// Reglas de validación
const formRules = computed(() => {
  return {
    codigo: {
      lazy: true,
      required: requiredValidation(),
      minLength: minLengthValidation(),
      maxLength: maxLengthValidation(4),
      unique: uniqueValidation('codigo', 'secciones', isCodigoTaken, formData.codigo)
    },
    trayecto: {
      required: requiredValidation(),
      numeric: numericValidation(),
      minValue: minValueValidation(),
      maxValue: maxValueValidation(4)
    },
    estudiantes: {
      required: requiredValidation(),
      numeric: numericValidation(),
      minValue: minValueValidation(),
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
    await store.fetchOne(id.value).then((data) => {
      Object.assign(singleData, data)
      Object.assign(formData, data)
    })
  }
})
</script>

<template>
  <AuthLayout>
    <FormComponent form-title="Módulo secciones" submit-text="Editar Sección" @form-submit="submitData" :is-loading="isLoading">
      <template #inputs>
        <!-- Codigo -->
        <InputField label="Codigo" name="codigo">
          <template #InputField
            ><InputComponent v-maska name="codigo" v-model="formData.codigo" placeholder="ej. i11"
          /></template>
          <template #InputError
            ><InputError v-if="v$.codigo.$error" :message="v$.codigo.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- Trayecto -->
        <InputField type="number" label="Trayecto" name="trayecto">
          <template #InputField
            ><InputSelect
              :options="trayectoOptions"
              placeholder="Seleccione un trayecto"
              name="trayecto"
              v-model.number="formData.trayecto"
          /></template>
          <template #InputError
            ><InputError v-if="v$.trayecto.$error" :message="v$.trayecto.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- Estudiantes -->
        <InputField
          type="number"
          label="Estudiantes"
          name="estudiantes"
          helper-text="Este campo solo acepta numeros"
        >
          <template #InputField
            ><InputComponent
              v-maska
              data-maska="##"
              name="estudiantes"
              v-model.number="formData.estudiantes"
          /></template>
          <template #InputError
            ><InputError
              v-if="v$.estudiantes.$error"
              :message="v$.estudiantes.$errors[0]?.$message"
          /></template>
        </InputField>
      </template>
    </FormComponent>
  </AuthLayout>
</template>

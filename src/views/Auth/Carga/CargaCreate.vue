<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue'
import InputField from '@/components/InputField.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import { useProfesorStore } from '@/stores/profesores'
import { useSaberStore } from '@/stores/saberes'
import FormComponent from '@/components/Containers/FormComponent.vue'
import { useVuelidate } from '@vuelidate/core'
import InputError from '@/components/InputError.vue'
import InputComponent from '@/components/InputComponent.vue'
import InputSelect from '@/components/InputSelect.vue'
import { useSeccionStore } from '@/stores/secciones'
import { useCargaStore, type cargaType } from '@/stores/carga'
import { numericValidation, requiredValidation } from '@/helpers/validationHelpers'
// Store del módulo
const store = useCargaStore()

// Store de profesores
const profesores = useProfesorStore()

// Store de saberes
const saberes = useSaberStore()

// Store de secciones
const secciones = useSeccionStore()

// Booleano para el botón de submit
const isLoading = ref(false)

// Variables reactivas del formulario
const formData = reactive<cargaType>({
  seccion_id: '',
  profesor_id: '',
  saber_id: '',
  dia: '',
  horas: ''
})

// Reglas de validación
const formRules = computed(() => {
  return {
    seccion_id: {
      required: requiredValidation()
    },
    profesor_id: {
      required: requiredValidation()
    },
    saber_id: {
      required: requiredValidation()
    },
    dia: {
      required: requiredValidation()
    },
    horas: {
      required: requiredValidation(),
      numeric: numericValidation()
    }
  }
})

// Opciones del Select "Secciones"
const seccionesOptions = computed(() => {
  return secciones.filteredData?.map((record: any) => {
    return {
      value: record.id,
      name: record.codigo + ' - ' + record.trayecto + ' - ' + record.estudiantes
    }
  })
})

// Opciones del Select "Profesores"
const profesoresOptions = computed(() => {
  return profesores.filteredData?.map((record: any) => {
    return {
      value: record.id,
      name: record.nombre + ' ' + record.apellido
    }
  })
})

// Opciones del Select "Saberes"
const saberesOptions = computed(() => {
  return saberes.fullData?.map((record: any) => {
    return {
      value: record.id,
      name: `${record.nombre} - trayecto ${record.trayecto}`
    }
  })
})

// Opciones del Select "Dia"
const diasOptions = [
  { value: 'Lunes', name: 'Lunes' },
  { value: 'Martes', name: 'Martes' },
  { value: 'Miercoles', name: 'Miercoles' },
  { value: 'Jueves', name: 'Jueves' },
  { value: 'Viernes', name: 'Viernes' }
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
onMounted(async() => {
  await saberes.fetchFullList()
}) 
</script>

<template>
  <AuthLayout>
    <!-- ALERTA DE DESARROLLO -->
    <div :class="`alert alert-error mb-10 w-full py-4 font-semibold shadow-lg`">
      <div class="flex">
        <font-awesome-icon icon="circle-xmark" class="fa-fw" />
        <span
          >Este módulo todavia esta en desarrollo, algunas cosas pueden no funcionar
          correctamente</span
        >
      </div>
    </div>
    <FormComponent submit-text="Asignar Carga" @form-submit="submitData" :is-loading="isLoading">
      <template #inputs>
        <!-- seccion -->
        <InputField label="Sección" name="seccion">
          <template #InputField>
            <InputSelect
              :options="seccionesOptions ?? [{ value: '', name: 'No se han encontrado secciones' }]"
              placeholder="Seleccione una sección"
              name="seccion"
              v-model="formData.seccion_id"
          /></template>
          <template #InputError
            ><InputError v-if="v$.seccion_id.$error" :message="v$.seccion_id.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- profesor -->
        <InputField label="Profesor" name="profesor">
          <template #InputField>
            <InputSelect
              :options="
                profesoresOptions ?? [{ value: '', name: 'No se han encontrado profesores' }]
              "
              placeholder="Seleccione un profesor"
              name="profesor"
              v-model="formData.profesor_id"
          /></template>
          <template #InputError
            ><InputError
              v-if="v$.profesor_id.$error"
              :message="v$.profesor_id.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- saber -->
        <InputField label="Saber" name="saber">
          <template #InputField>
            <InputSelect
              :options="saberesOptions ?? [{ value: '', name: 'No se han encontrado saberes' }]"
              placeholder="Seleccione un saber"
              name="saberes"
              v-model="formData.saber_id"
          /></template>
          <template #InputError
            ><InputError v-if="v$.saber_id.$error" :message="v$.saber_id.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- Dia -->
        <InputField label="Dia" name="dia">
          <template #InputField>
            <InputSelect
              :options="diasOptions"
              placeholder="Seleccione un día"
              name="dia"
              v-model="formData.dia"
          /></template>
          <template #InputError
            ><InputError v-if="v$.dia.$error" :message="v$.dia.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- Horas -->
        <InputField label="Horas Dadas" name="horas">
          <template #InputField
            ><InputComponent type="number" name="horas" v-model="formData.horas"
          /></template>
          <template #InputError
            ><InputError v-if="v$.horas.$error" :message="v$.horas.$errors[0]?.$message"
          /></template>
        </InputField>
      </template>
    </FormComponent>
  </AuthLayout>
</template>

<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue'
import InputField from '@/components/InputField.vue'
import { ref, computed, onMounted, reactive } from 'vue'
import { useProfesorStore } from '@/stores/profesores'
import router from '@/router'
import { useVuelidate } from '@vuelidate/core'
import InputError from '@/components/InputError.vue'
import InputComponent from '@/components/InputComponent.vue'
import FormComponent from '@/components/Containers/FormComponent.vue'
import { useSaberStore } from '@/stores/saberes'
import { useSeccionStore } from '@/stores/secciones'
import InputSelect from '@/components/InputSelect.vue'
import { useCargaStore, type cargaType } from '@/stores/carga'
import { numericValidation, requiredValidation } from '@/helpers/validationHelpers'
import { helpers } from '@vuelidate/validators'
import type { Record } from 'pocketbase'
// Store del módulo
const store = useCargaStore()

// Store de profesores
const profesores = useProfesorStore()

// Store de saberes
const saberes = useSaberStore()

// Store de secciones
const secciones = useSeccionStore()

// Lista de profesores con proyecto asignado para la validacion
const profs_proyecto = ref<Record[]>()

// Booleano para el botón de submit
const isLoading = ref(false)

// Id del item a editar
const id = ref()

// Datos del registro a editar
const singleData = reactive<cargaType>({
  seccion_id: '',
  profesor_id: '',
  saber_id: '',
  dia: '',
  horas: ''
})

// Variables reactivas del formulario
const formData = reactive<cargaType>({
  seccion_id: '',
  profesor_id: '',
  saber_id: '',
  dia: '',
  horas: ''
})

// Esto es una solución horrible, pero no sabía como hacerlo mejor, si explota lo advertí
const tieneDosProyectos = (value: string) => {
  // Si no estan definidas las tres columnas retorna true
  if (!(formData.profesor_id && formData.seccion_id && formData.saber_id)) {
    return true
  }
  // Si las listas necesarias no estan definidas, retorna true
  if (!(saberes.fullData && profs_proyecto.value)) {
    return true
  }
  // Consigue los datos del saber
  let saber = saberes.fullData.filter((record) => {
    return record.id == value
  })
  // Si no es una materia de proyecto retorna true
  if (!(saber[0].nombre.startsWith('Proyecto') || saber[0].nombre.startsWith('proyecto'))) {
    return true
  }
  // Filtra los records y solo cuenta los que cumplan la condición
  let total = profs_proyecto.value.filter((record) => {
    return (
      record.id != formData.seccion_id &&
      record.profesor == formData.profesor_id &&
      saber[0].nombre.startsWith('Proyecto')
    )
  }).length
  //Retorna false si total es igual o mayor a dos, de lo contrario retorna true
  return !(total >= 2)
}

const dosProyectos = helpers.withAsync(tieneDosProyectos, () => formData.saber_id)
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
      required: requiredValidation(),
      dosProyectos: helpers.withMessage(
        'El profesor seleccionado no puede dar proyecto a mas secciones',
        dosProyectos
      )
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
  return secciones.fullData?.map((record) => {
    return {
      value: record.id,
      name: `${record.codigo} - Trayecto ${record.trayecto} - ${record.estudiantes} estudiantes`
    }
  })
})

// Opciones del Select "Profesores"
const profesoresOptions = computed(() => {
  return profesores.fullData?.map((record) => {
    return {
      value: record.id,
      //@ts-ignore
      name: `${record.nombre} ${record.apellido} - ${record.expand.titulo_id.grado} en ${record.expand.titulo_id.nombre}`
    }
  })
})

// Opciones del Select "Saberes"
const saberesOptions = computed(() => {
  return saberes.fullData?.map((record) => {
    return {
      value: record.id,
      name: `${record.nombre} - Trayecto ${record.trayecto}`
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
    await store.update(id.value, formData)
    isLoading.value = false
  }
}

// Al inicializar el componente, asigna el id de la ruta a una variable reactiva de vue
onMounted(async () => {
  await store.fetchFullList()
  await saberes.fetchFullList()
  await profesores.fetchFullList()
  await secciones.fetchFullList()
  store.pb
    .collection('profs_proyecto')
    .getFullList()
    .then((data) => {
      profs_proyecto.value = data
    })
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

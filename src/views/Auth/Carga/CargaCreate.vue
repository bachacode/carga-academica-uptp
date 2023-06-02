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
import { useCargaStore, type Carga } from '@/stores/carga'
import { numericValidation, requiredValidation } from '@/helpers/validationHelpers'
import { helpers } from '@vuelidate/validators'
import type { Record } from 'pocketbase'
import { useCargaTotalStore } from '@/stores/cargaTotal'
// Store del módulo
const store = useCargaStore()

// Store de profesores
const profesores = useProfesorStore()

// Store de saberes
const saberes = useSaberStore()

// Store de secciones
const secciones = useSeccionStore()

// Store de carga total
const cargaTotal = useCargaTotalStore()

// Booleano para el botón de submit
const isLoading = ref(false)

// Lista de profesores con proyecto asignado para la validacion
const profs_proyecto = ref<Record[]>()

// Variables reactivas del formulario
const formData = reactive<Carga>({
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
  if (!saberes.fullData || !profs_proyecto.value) {
    return true
  }
  // Consigue los datos del saber
  let saber = saberes.fullData.find((record) => {
    return record.id == value
  })
  if (!saber) {
    return false
  }
  saber.nombre.toLowerCase()
  // Si no es una materia de proyecto retorna true
  if (!saber.nombre.startsWith('proyecto')) {
    return true
  }
  // Filtra los records y solo cuenta los que cumplan la condición
  let total: number = profs_proyecto.value.filter((record) => {
    return (
      record.id != formData.seccion_id &&
      record.profesor == formData.profesor_id &&
      saber?.nombre.startsWith('proyecto')
    )
  }).length
  //Retorna false si total es igual o mayor a dos, de lo contrario retorna true
  return !(total >= 2)
}

// Condicional para comparar el trayecto de la sección y el saber
const sonDelMismoTrayecto = (value: string) => {
  // Si no estan definidas las dos columnas retorna true
  if (!(formData.seccion_id && formData.saber_id)) {
    return true
  }
  // Si las listas necesarias no estan definidas, retorna true
  if (!(saberes.fullData && secciones.fullData)) {
    return true
  }
  // Consigue los datos del saber
  let saber = saberes.fullData.find((record) => {
    return record.id == value
  })
  // Consigue los datos de la sección
  let seccion = secciones.fullData.find((record) => {
    return record.id == formData.seccion_id
  })

  if (!saber || !seccion) {
    return false
  }
  //Retorna true si el trayecto del saber y la sección son iguales, de lo contrario retorna false
  return saber.trayecto == seccion.trayecto
}

// Condicional para saber si las horas asignadas exceden el limite semanal del profesor
const excedeContrato = (value: string) => {
  // Si no estan definidas las dos columnas retorna true
  if (!(formData.profesor_id && formData.horas)) {
    return true
  }

  // Si las listas necesarias no estan definidas, retorna true
  if (!cargaTotal.fullData) {
    return true
  }

  // Consigue la informacion del profesor
  let profesor = cargaTotal.fullData.find((record) => {
    return record.id == formData.profesor_id
  })

  // Comprueba si el profesor existe
  if (!profesor) {
    return false
  }

  // Comprueba si las horas restantes son positivas o negativas
  let horasRestantes =
    profesor.contrato_horas - (profesor.horas + parseInt(value) ?? 0 + parseInt(value))
  return horasRestantes >= 0
}

// Condicional asincrono de "sonDelMismoTrayecto"
const mismoTrayecto = helpers.withAsync(sonDelMismoTrayecto, () => formData.saber_id)

// Condicional asincrono de "tieneDosProyectos"
const dosProyectos = helpers.withAsync(tieneDosProyectos, () => formData.saber_id)

// Condcional asincrono de "excedeContrato"
const excedeContratoAsync = helpers.withAsync(excedeContrato, () => formData.horas)
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
      ),
      mismoTrayecto: helpers.withMessage(
        'La sección seleccionada es de un trayecto distinto al saber',
        mismoTrayecto
      )
    },
    dia: {
      required: requiredValidation()
    },
    horas: {
      required: requiredValidation(),
      numeric: numericValidation(),
      excedeContrato: helpers.withMessage(
        'Las horas asignadas exceden la carga total semanal del profesor seleccionado',
        excedeContratoAsync
      )
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
      name: `${record.nombre} ${record.apellido} - ${record.expand.titulo_id.grado} en ${record.expand.titulo_id.nombre} - ${record.expand.contrato_id.nombre} | ${record.expand.contrato_id.horas} horas`
    }
  })
})

// Opciones del Select "Saberes"
const saberesOptions = computed(() => {
  return saberes.fullData?.map((record) => {
    return {
      value: record.id,
      name: `${record.nombre} - Trayecto ${record.trayecto} - ${record.horas} horas maximas`
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
onMounted(async () => {
  await store.fetchFullList()
  await saberes.fetchFullList()
  await profesores.fetchFullList()
  await secciones.fetchFullList()
  await cargaTotal.fetchFullList()
  store.pb
    .collection('profs_proyecto')
    .getFullList()
    .then((data) => {
      profs_proyecto.value = data
    })
})
</script>

<template>
  <AuthLayout>
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
              name="saber"
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

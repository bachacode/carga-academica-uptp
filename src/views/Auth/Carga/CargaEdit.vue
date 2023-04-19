<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue'
import InputField from '@/components/InputField.vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useProfesorStore } from '@/stores/profesores'
import router from '@/router'
import { useVuelidate } from '@vuelidate/core'
import InputError from '@/components/InputError.vue'
import InputComponent from '@/components/InputComponent.vue'
import FormComponent from '@/components/Containers/FormComponent.vue'
import { useSaberStore } from '@/stores/saberes'
import { data } from './CargaData'
import { useSeccionStore } from '@/stores/secciones'
import { useClaseStore } from '@/stores/clases'
import InputSelect from '@/components/InputSelect.vue'
const store = useClaseStore()
const profesores = useProfesorStore()
const saberes = useSaberStore()
const secciones = useSeccionStore()
const { update, fetchOne } = store
const id = ref<string>('')
const { formData, formRules } = data

const isLoading = ref(false)

const v$ = useVuelidate(formRules, formData)

async function submitData() {
  await v$.value.$validate()
  if (!v$.value.$error) {
    isLoading.value = true
    await update(id.value, formData)
  }
}

const seccionesOptions = computed(() => {
  return secciones.filteredData?.map((record: any) => {
    return {
      value: record.id,
      name: record.codigo + ' - ' + record.trayecto + ' - ' + record.estudiantes
    }
  })
})

const profesoresOptions = computed(() => {
  return profesores.filteredData?.map((record: any) => {
    return {
      value: record.id,
      name: record.nombre + ' ' + record.apellido + ' - ' + record.titulo
    }
  })
})

const saberesOptions = computed(() => {
  return saberes.filteredData?.map((record: any) => {
    return {
      value: record.id,
      name: record.codigo + ' - ' + record.materia + ' - ' + record.periodo
    }
  })
})

const diasOptions = [
  { value: 'Lunes', name: 'Lunes' },
  { value: 'Martes', name: 'Martes' },
  { value: 'Miercoles', name: 'Miercoles' },
  { value: 'Jueves', name: 'Jueves' },
  { value: 'Viernes', name: 'Viernes' }
]

onMounted(async () => {
  if (!(router.currentRoute.value.params.id instanceof Array)) {
    id.value = router.currentRoute.value.params.id
    await fetchOne(router.currentRoute.value.params.id)
    if (store.singleData) {
      Object.assign(formData, store.singleData)
    }
  }
})

onUnmounted(() => {
  Object.assign(formData, {
    id_seccion: '',
    id_profesor: '',
    id_saber: '',
    dia: '',
    horas: ''
  })
  store.singleData = undefined
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
              v-model="formData.id_seccion"
          /></template>
          <template #InputError
            ><InputError v-if="v$.id_seccion.$error" :message="v$.id_seccion.$errors[0]?.$message"
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
              v-model="formData.id_profesor"
          /></template>
          <template #InputError
            ><InputError
              v-if="v$.id_profesor.$error"
              :message="v$.id_profesor.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- saber -->
        <InputField label="Saber" name="saber">
          <template #InputField>
            <InputSelect
              :options="saberesOptions ?? [{ value: '', name: 'No se han encontrado saberes' }]"
              placeholder="Seleccione un saber"
              name="saberes"
              v-model="formData.id_saber"
          /></template>
          <template #InputError
            ><InputError v-if="v$.id_saber.$error" :message="v$.id_saber.$errors[0]?.$message"
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

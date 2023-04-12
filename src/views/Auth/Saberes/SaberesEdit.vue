<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue'
import InputField from '@/components/InputField.vue'
import { ref, onMounted, reactive, onUnmounted } from 'vue'
import { useSaberStore } from '@/stores/saberes'
import router from '@/router'
import { useVuelidate } from '@vuelidate/core'
import InputError from '@/components/InputError.vue'
import InputComponent from '@/components/InputComponent.vue'
import FormComponent from '@/components/Containers/FormComponent.vue'
import InputSelect from '@/components/InputSelect.vue'
import { data } from './SaberesData'
const store = useSaberStore()
const { update, fetchOne } = store
const id = ref<string>('')
const { formData, formRules } = data
data.store = store
const v$ = useVuelidate(formRules, formData)
const periodoOptions = reactive([
  { value: 1, name: 'Periodo 1' },
  { value: 2, name: 'Periodo 2' },
  { value: 3, name: 'Periodo 3' }
])

const trayectoOptions = reactive([
  { value: 1, name: 'Trayecto 1' },
  { value: 2, name: 'Trayecto 2' },
  { value: 3, name: 'Trayecto 3' },
  { value: 4, name: 'Trayecto 4' }
])
const isLoading = ref(false)
async function submitData() {
  isLoading.value = true
  await v$.value.$validate().then(() => isLoading.value = false).catch(() => isLoading.value = false)
  if (!v$.value.$error) {
    await update(id.value, formData)
  }
}

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
    codigo: '',
    materia: '',
    trayecto: null,
    periodo: null,
    creditos: null
  })
  store.singleData = undefined
})
</script>

<template>
  <AuthLayout>
    <FormComponent submit-text="Editar Saber" @form-submit="submitData" :is-loading="isLoading">
      <template #inputs>
        <InputField label="Codigo" name="codigo">
          <template #InputField
            ><InputComponent name="codigo" v-model.trim="formData.codigo"
          /></template>
          <template #InputError
            ><InputError v-if="v$.codigo.$error" :message="v$.codigo.$errors[0]?.$message"
          /></template>
        </InputField>
        <InputField label="Materia" name="materia">
          <template #InputField
            ><InputComponent name="materia" v-model.trim="formData.materia"
          /></template>
          <template #InputError
            ><InputError v-if="v$.materia.$error" :message="v$.materia.$errors[0]?.$message"
          /></template>
        </InputField>
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
        <InputField label="Periodo" name="periodo">
          <template #InputField
            ><InputSelect
              :options="periodoOptions"
              placeholder="Seleccione un periodo"
              name="periodo"
              v-model="formData.periodo"
          /></template>
          <template #InputError
            ><InputError v-if="v$.trayecto.$error" :message="v$.trayecto.$errors[0]?.$message"
          /></template>
        </InputField>
        <InputField label="Creditos" name="creditos">
          <template #InputField
            ><InputComponent name="creditos" v-model.number="formData.creditos"
          /></template>
          <template #InputError
            ><InputError v-if="v$.creditos.$error" :message="v$.creditos.$errors[0]?.$message"
          /></template>
        </InputField>
      </template>
    </FormComponent>
  </AuthLayout>
</template>

<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue'
import InputField from '@/components/InputField.vue'
import { ref, onMounted, reactive, onUnmounted } from 'vue'
import { useSeccionStore } from '@/stores/secciones'
import router from '@/router'
import { useVuelidate } from '@vuelidate/core'

import InputError from '@/components/InputError.vue'
import InputComponent from '@/components/InputComponent.vue'
import FormComponent from '@/components/Containers/FormComponent.vue'
import InputSelect from '@/components/InputSelect.vue'
import { data } from './SeccionesData'
const store = useSeccionStore()
const { update, fetchOne } = store
const id = ref<string>('')
const { formData, formRules } = data
const v$ = useVuelidate(formRules, formData)
const trayectoOptions = reactive([
  { value: 1, name: 'Trayecto 1' },
  { value: 2, name: 'Trayecto 2' },
  { value: 3, name: 'Trayecto 3' },
  { value: 4, name: 'Trayecto 4' }
])
data.store = store
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
    trayecto: '',
    estudiantes: ''
  })
  store.singleData = undefined
})
</script>

<template>
  <AuthLayout>
    <FormComponent submit-text="Editar Sección" @form-submit="submitData" :is-loading="isLoading">
      <template #inputs>
        <InputField label="Codigo" name="codigo">
          <template #InputField
            ><InputComponent v-maska data-maska="i##" name="codigo" v-model="formData.codigo"
          /></template>
          <template #InputError
            ><InputError v-if="v$.codigo.$error" :message="v$.codigo.$errors[0]?.$message"
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
        <InputField label="Estudiantes" name="estudiantes">
          <template #InputField
            ><InputComponent name="estudiantes" v-model.number="formData.estudiantes"
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

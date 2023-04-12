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
import MultiSelect from '@/components/MultiSelect.vue'
import type { optionType } from '@/components/MultiSelect.vue'
import { useSaberStore } from '@/stores/saberes'
import { data } from './ProfesoresData'
const store = useProfesorStore()
const saberes = useSaberStore()
const { update, fetchOne } = store
const id = ref<string>('')
const { formData, formRules, relations } = data
const isLoading = ref(false)
const v$ = useVuelidate(formRules, formData)

const removeTag = (tag: optionType) => {
  tag.isActive = false
}

async function submitData() {
  isLoading.value = true
  await v$.value.$validate().then(() => isLoading.value = false).catch(() => isLoading.value = false)
  if (!v$.value.$error) {
    await store.deSync(id.value, relations)
    await update(id.value, formData)
  }
}

const tags = computed<optionType[] | undefined>(() => {
  return saberes.filteredData?.map((record: any) => {
    {
      return {
        name: record.codigo + ' - ' + record.materia + ' - ' + record.periodo,
        value: record.id,
        isActive: formData.saberes.includes(record.id) ? true : false
      }
    }
  })
})

onMounted(async () => {
  if (!(router.currentRoute.value.params.id instanceof Array)) {
    id.value = router.currentRoute.value.params.id
    await fetchOne(router.currentRoute.value.params.id)
    if (store.singleData) {
      Object.assign(formData, store.singleData)
      formData.saberes?.forEach((saber) => {
        relations.stored.push(saber)
      })
    }
  }
})

onUnmounted(() => {
  Object.assign(formData, {
    nombre: '',
    apellido: '',
    cedula: '',
    titulo: '',
    saberes: [],
    telefono: '',
    correo: ''
  })
  store.singleData = undefined
})
</script>

<template>
  <AuthLayout>
    <FormComponent submit-text="Editar Profesor" @form-submit="submitData" :is-loading="isLoading">
      <template #inputs>
        <!-- Nombre + Apellido -->
        <div class="flex w-full space-x-2">
          <!-- Nombre -->
          <InputField label="Nombre" name="nombre">
            <template #InputField
              ><InputComponent name="nombre" v-model.trim="formData.nombre"
            /></template>
            <template #InputError
              ><InputError v-if="v$.nombre.$error" :message="v$.nombre.$errors[0]?.$message"
            /></template>
          </InputField>

          <!-- Apellido -->
          <InputField label="Apellido" name="apellido">
            <template #InputField
              ><InputComponent name="apellido" v-model="formData.apellido"
            /></template>
            <template #InputError
              ><InputError v-if="v$.apellido.$error" :message="v$.apellido.$errors[0]?.$message"
            /></template>
          </InputField>
        </div>

        <!-- Cedula -->
        <InputField label="Cedula" name="cedula">
          <template #InputField
            ><InputComponent
              v-maska
              data-maska="V-##.###.###"
              data-maska-tokens="'0':/[0-9]/:M"
              name="cedula"
              v-model="formData.cedula"
          /></template>
          <template #InputError
            ><InputError v-if="v$.cedula.$error" :message="v$.cedula.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- Titulo -->
        <InputField label="Titulo" name="titulo">
          <template #InputField
            ><InputComponent name="titulo" v-model="formData.titulo"
          /></template>
          <template #InputError
            ><InputError v-if="v$.titulo.$error" :message="v$.titulo.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- Saberes -->
        <InputField label="Saberes" name="saberes">
          <template #InputField
            ><MultiSelect
              @remove-tag="removeTag"
              :tags="tags"
              :model-relations="relations"
              name="saberes"
              :selected-options="formData.saberes"
          /></template>
          <template #InputError
            ><InputError v-if="v$.titulo.$error" :message="v$.titulo.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- Telefono -->
        <InputField label="Telefono" name="telefono">
          <template #InputField
            ><InputComponent
              v-maska
              data-maska="### ###-##-##"
              name="telefono"
              v-model="formData.telefono"
          /></template>
          <template #InputError
            ><InputError v-if="v$.telefono.$error" :message="v$.telefono.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- Correo -->
        <InputField type="email" label="Correo" name="correo">
          <template #InputField
            ><InputComponent name="correo" v-model="formData.correo"
          /></template>
          <template #InputError
            ><InputError v-if="v$.correo.$error" :message="v$.correo.$errors[0]?.$message"
          /></template>
        </InputField>
      </template>
    </FormComponent>
  </AuthLayout>
</template>

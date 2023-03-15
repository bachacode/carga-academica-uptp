<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue'
import InputField from '@/components/InputField.vue'
import { ref } from 'vue'
import { useSeccionStore } from '@/stores/secciones'
import router from '@/router'
import { onMounted } from 'vue'
import type { seccionType } from '@/stores/secciones'
import { storeToRefs } from 'pinia'

const secciones = useSeccionStore()
const { update, fetchOne } = secciones
const { singleData } = storeToRefs(secciones)
const id = ref<string>('')
const submit = ref<seccionType>({
  codigo: '',
  trayecto: '',
  estudiantes: 0
})

onMounted(async () => {
  if (!(router.currentRoute.value.params.id instanceof Array)) {
    id.value = router.currentRoute.value.params.id
    await fetchOne(router.currentRoute.value.params.id)
    if(singleData.value)
    {
      submit.value = singleData.value
    }
  }
})
</script>

<template>
  <AuthLayout>
    <button @click="router.back()">Volver</button>
    <form @submit.prevent="update(id, submit)" ref="formSeccion">
      <InputField placeholder="Codigo" name="Codigo" v-model="submit.codigo"></InputField>
      <InputField placeholder="2" name="Trayecto" v-model="submit.trayecto"></InputField>
      <InputField placeholder="17" name="Estudiantes" v-model="submit.estudiantes"></InputField>
      <InputField type="hidden" v-model="id"></InputField>
      <button
        type="submit"
        class="mt-8 bg-blue-800 p-2 text-lg font-bold text-white hover:bg-blue-900"
      >
        Editar Sección
      </button>
    </form>
  </AuthLayout>
</template>

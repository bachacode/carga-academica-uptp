<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue'
import InputField from '@/components/InputField.vue'
import { ref } from 'vue'
import { useSeccionStore } from '@/stores/secciones'
import router from '@/router'
const { store } = useSeccionStore()
const id = ref()
const codigo = ref()
const trayecto = ref()
const estudiantes = ref()

function volver() {
  router.back()
}
</script>

<template>
  <AuthLayout>
    <div class="flex items-center justify-center">
      <div class="w-2/4 px-16 pb-8">
        <div class="rounded border bg-white shadow">
          <button class="btn-ghost px-2 pt-2 hover:bg-white hover:text-blue-700" @click="volver()">
            <i class="fas fa-arrow-left pr-1"></i>Volver
          </button>
          <form
            class="px-6 pb-6"
            @submit.prevent="store({ codigo, trayecto, estudiantes })"
            ref="formSeccion"
          >
            <InputField placeholder="Codigo" name="Codigo" v-model="codigo"></InputField>
            <InputField placeholder="2" name="Trayecto" v-model="trayecto"></InputField>
            <InputField placeholder="17" name="Estudiantes" v-model="estudiantes"></InputField>
            <InputField type="hidden" v-model="id"></InputField>
            <button type="submit" class="btn bg-blue-700 text-white hover:bg-blue-900">
              Crear Sección
            </button>
          </form>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>

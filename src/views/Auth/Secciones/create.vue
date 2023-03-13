<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue';
import InputField from '@/components/InputField.vue';
import { ref } from 'vue';
import { useSeccionStore } from '@/stores/secciones';
import router from '@/router';
const { store } = useSeccionStore();
const id = ref();
const codigo = ref();
const trayecto = ref();
const estudiantes = ref();

function volver() {
    router.back();
}

</script>

<template>
    <AuthLayout>
        <button @click="volver()">Volver</button>
        <form @submit.prevent="store({codigo, trayecto, estudiantes})" ref="formSeccion">
                <InputField placeholder="Codigo" name="Codigo" v-model="codigo"></InputField>
                <InputField placeholder="2" name="Trayecto" v-model="trayecto"></InputField>
                <InputField placeholder="17" name="Estudiantes" v-model="estudiantes"></InputField>
                <InputField type="hidden" v-model="id"></InputField>
                <button
                  type="submit"
                  class="mt-8 bg-blue-800 p-2 text-lg font-bold text-white hover:bg-blue-900"
                >
                  Crear Sección
                </button>
              </form>
    </AuthLayout>
</template>
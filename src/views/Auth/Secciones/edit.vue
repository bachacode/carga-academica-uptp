<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue';
import InputField from '@/components/InputField.vue';
import { ref } from 'vue';
import { useSeccionStore } from '@/stores/secciones';
import router from '@/router';
import { watchEffect } from 'vue';
import type { ISeccion, seccionType } from '@/stores/secciones';
const { update, fetchOne } = useSeccionStore();
const id = ref<string>('');
const data = ref<ISeccion>();
const submit = ref<seccionType>({
    codigo: '',
    trayecto: '',
    estudiantes: 0
})

function volver() {
    router.back();
}

watchEffect(async () => {
    if(!(router.currentRoute.value.params.id instanceof Array)){
        id.value = router.currentRoute.value.params.id
        data.value = await fetchOne(id.value);
        submit.value = data.value;
    }
})
</script>

<template>
    <AuthLayout>
        <button @click="volver()">Volver</button>
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
<script setup lang="ts">
import { useSeccionStore } from '@/stores/secciones'
import { onMounted, ref } from 'vue'
import AuthLayout from '@/views/Auth/AuthLayout.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
import router from '@/router'
import type { ISeccion } from '@/stores/secciones'
const { fetchAll, destroy } = useSeccionStore();

const secciones = ref<ISeccion[]>()

function create() {
  router.push({name: 'create'});
}

function edit(id: string) {
  router.push({name: 'edit', params: {id}});
}

async function destroyItem(id: string) {
  secciones.value = await destroy(id);
}

onMounted(async () => {
  secciones.value = await fetchAll();
})
</script>

<template>
  <AuthLayout>
    <div class="w-full px-16">
      <button
          @click="create()"
          class="my-2 mx-1 rounded-2xl bg-blue-300 px-3 py-2 font-bold text-blue-900"
        >
        <i class="fas fa-plus-circle"></i> Crear Sección
        </button>
      <!--Table Card-->
      <div class="rounded border bg-white shadow">
        <div class="border-b p-3">
          <h5 class="font-bold uppercase text-gray-600">Secciones</h5>
        </div>
        <div class="p-5">
          <table class="table w-full p-5 text-gray-700">
            <thead class="text-center">
              <tr>
                <th class="text-left text-blue-900">Codigo</th>
                <th class="text-left text-blue-900">Trayecto</th>
                <th class="text-left text-blue-900">Estudiantes</th>
                <th class="text-left text-blue-900" colspan="2">Acciones</th>
              </tr>
            </thead>
              <LoadingCircle :is-loaded="!secciones" />
            <tbody v-if="secciones">
              <tr v-for="seccion in secciones" :key="seccion.id">
                <td>{{ seccion.codigo }}</td>
                <td>{{ 'trayecto ' + seccion.trayecto }}</td>
                <td>{{ seccion.estudiantes + ' estudiantes' }}</td>
                <td><button class="bg-blue-700 text-white font-semibold px-4 py-1.5 rounded-xl" @click="edit(seccion.id)"><i class="fas fa-edit"></i> Editar</button></td>
                <td><button class="bg-red-700 text-white font-semibold px-4 py-1.5 rounded-xl" @click="destroyItem(seccion.id)"><i class="fas fa-trash"></i> Eliminar</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!--/table Card-->
    </div>
  </AuthLayout>
</template>

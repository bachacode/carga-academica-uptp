<script setup lang="ts">
import { useSeccionStore } from '@/stores/secciones'
import { onMounted, computed, ref } from 'vue'
import AuthLayout from '@/views/Auth/AuthLayout.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
import router from '@/router'
import { storeToRefs } from 'pinia'

const secciones = useSeccionStore();
const { fetchAll, destroy, fetchOne } = secciones
const { filteredData, searchQuery } = storeToRefs(secciones)
const theadColumns = [
  "Codigo", "Trayecto", "Estudiantes", "Acciones"
]
function create() {
  router.push({ name: 'secciones.create' })
}

function edit(id: string) {
  router.push({ name: 'secciones.edit', params: { id } })
}

async function destroyItem(id: string | undefined) {
  if (id) {
    await destroy(id)
  }
}

async function sortTable(column: string) {
  console.log(column);
  await fetchAll(column);
}

async function selectItem(id: string) {
  await fetchOne(id)
}
</script>

<template>
  <!-- Delete Modal -->
  <Teleport to="#modal">
    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="my-modal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">¡Cuidado!</h3>
        <p class="py-4">
          Estas a punto de borrar la sección {{ secciones.singleData?.codigo }}. ¿Esta seguro que desea
          hacer esto?
        </p>
        <div class="modal-action items-center">
          <label
            for="my-modal"
            class="btn-outline mr-2 cursor-pointer rounded-xl p-2 hover:bg-white hover:text-blue-700"
            >¡No!</label
          >
          <label
            for="my-modal"
            class="btn rounded-xl bg-red-700"
            @click="destroyItem(secciones.singleData?.id)"
            >Borrar</label
          >
        </div>
      </div>
    </div>
  </Teleport>
  <AuthLayout>
    <!-- Success Alert -->
    <div class="w-full px-16 pb-8">
      <button @click="create()" class="btn mb-3 rounded-lg bg-green-700 text-white">
        <i class="fas fa-plus-circle pr-1"></i> Crear Sección
      </button>
      <!--Table Card-->
      <div class="rounded border bg-white shadow">
        <div class="border-b p-3 flex justify-between">
          <h5 class="font-bold uppercase text-gray-600">Secciones</h5>
          <input type="text" placeholder="Busca" class="border border-gray-300 px-1" v-model="searchQuery">
        </div>
        <div class="p-5 overflow-x-auto">
          <LoadingCircle :is-loaded="!filteredData" />
          <table v-if="filteredData" class="table-zebra table-normal table w-full">
            <thead>
              <tr>
                <th v-for="column in theadColumns" class="text-blue-900">
                  <span  
                  @click="sortTable(`+${column.toLowerCase()}`)" 
                  class="cursor-pointer"
                  >
                    {{column}}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="seccion in filteredData" :key="seccion.id">
                <td>{{ seccion.codigo }}</td>
                <td>{{ 'trayecto ' + seccion.trayecto }}</td>
                <td>{{ seccion.estudiantes + ' estudiantes' }}</td>
                <td class="space-x-3">
                  <button
                    class="btn rounded-xl bg-blue-700 hover:bg-blue-900"
                    @click="edit(seccion.id)"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <label
                    for="my-modal"
                    class="btn rounded-xl bg-red-700 hover:bg-rose-900"
                    @click="selectItem(seccion.id)"
                  >
                    <i class="fas fa-trash"></i>
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!--/table Card-->
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { useSaberStore } from '@/stores/saberes'
import AuthLayout from '@/views/Auth/AuthLayout.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
import router from '@/router'
import { storeToRefs } from 'pinia'
const store = useSaberStore()
const { fetchAll, destroy, fetchOne } = store
const { filteredData, searchQuery } = storeToRefs(store)
const theadColumns = [
  {
    name: 'Codigo',
    isAsc: false
  },
  {
    name: 'Materia',
    isAsc: false
  },
  {
    name: 'Trayecto',
    isAsc: false
  },
  {
    name: 'Periodos',
    isAsc: false
  },
  {
    name: 'Creditos',
    isAsc: false
  }
]
function orderBy(state: { name: string; isAsc: boolean }) {
  if (state.isAsc == true) {
    state.isAsc = false
    return `+${state.name.toLowerCase()}`
  } else state.isAsc = true
  return `-${state.name.toLowerCase()}`
}
function create() {
  router.push({ name: 'saberes.create' })
}

function edit(id: string) {
  router.push({ name: 'saberes.edit', params: { id } })
}

async function destroyItem(id: string | undefined) {
  if (id) {
    await destroy(id)
  }
}

async function sortTable(column: string) {
  console.log(column)
  await fetchAll(column)
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
          Estas a punto de borrar el saber {{ store.singleData?.codigo }}. ¿Esta seguro que desea
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
            @click="destroyItem(store.singleData?.id)"
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
        <i class="fas fa-plus-circle pr-1"></i> Crear Saber
      </button>
      <!--Table Card-->
      <div class="rounded border bg-white shadow">
        <div class="flex justify-between border-b p-3">
          <h5 class="font-bold uppercase text-gray-600">Saberes</h5>
          <input
            type="text"
            placeholder="Busca"
            class="border border-gray-300 px-1"
            v-model="searchQuery"
          />
        </div>
        <div class="overflow-x-auto p-5">
          <LoadingCircle :is-loaded="!filteredData" />
          <table v-if="filteredData" class="table-zebra table-normal table w-full">
            <thead>
              <tr>
                <th v-for="column in theadColumns" class="text-blue-900" :key="column.name">
                  <span @click="sortTable(orderBy(column))" class="cursor-pointer">
                    {{ column.name }}
                    <i v-if="column.isAsc" class="fas fa-sort-down pl-1"></i>
                    <i v-if="!column.isAsc" class="fas fa-sort-up pl-1"></i>
                  </span>
                </th>
                <th class="text-blue-900">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="saber in filteredData" :key="saber.id">
                <td>{{ saber.codigo }}</td>
                <td>{{ saber.materia }}</td>
                <td>{{ 'trayecto ' + saber.trayecto }}</td>
                <td>{{ saber.periodos + ' periodos' }}</td>
                <td>{{ saber.creditos + ' creditos' }}</td>
                <td class="space-x-3">
                  <button
                    class="btn rounded-xl bg-blue-700 hover:bg-blue-900"
                    @click="edit(saber.id)"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <label
                    for="my-modal"
                    class="btn rounded-xl bg-red-700 hover:bg-rose-900"
                    @click="selectItem(saber.id)"
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

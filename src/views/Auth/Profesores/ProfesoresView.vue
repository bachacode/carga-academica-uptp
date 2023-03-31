<script setup lang="ts">
import { useProfesorStore } from '@/stores/profesores'
import AuthLayout from '@/views/Auth/AuthLayout.vue'
import TableComponent from '@/components/Containers/TableComponent.vue'
import router from '@/router'
import { storeToRefs } from 'pinia'
const store = useProfesorStore()
const { fetchAll, destroy, fetchOne } = store
const { searchQuery } = storeToRefs(store)
const theadColumns = [
  {
    name: 'Nombre',
    isAsc: false
  },
  {
    name: 'Apellido',
    isAsc: false
  },
  {
    name: 'Cedula',
    isAsc: false
  },
  {
    name: 'Titulo',
    isAsc: false
  },
  {
    name: 'Saberes'
  },
  {
    name: 'Telefono',
    isAsc: false
  },
  {
    name: 'Correo',
    isAsc: false
  }
]

async function create() {
  await router.push({ name: 'profesores.create' })
}

const edit = async (id: string) => {
  await router.push({ name: 'profesores.edit', params: { id } })
}

const sortTable = async (column: string) => {
  await fetchAll(column)
}

const selectItem = async (id: string) => {
  await fetchOne(id)
}

async function destroyItem(id: string | undefined) {
  if (id) {
    await destroy(id)
  }
}
</script>

<template>
  <!-- Saberes Modal -->
  <Teleport to="#modal">
    <input type="checkbox" id="saberes-modal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <div class="flex justify-between">
          <h3 class="text-lg font-bold">
            Saberes del profesor {{ `${store.singleData?.nombre} ${store.singleData?.apellido}` }}
          </h3>
          <label
            class="btn-outline mr-2 cursor-pointer rounded-xl p-2 hover:bg-white hover:text-blue-700"
            for="saberes-modal"
            >X</label
          >
        </div>
        <div>¡Este profesor no tiene saberes asignados!</div>
        <table
          v-if="store.singleData && store.singleData.expand.saberes"
          class="mb-6 w-full border border-blue-700"
        >
          <thead>
            <th class="bg-blue-300 py-2 pl-2">Codigo</th>
            <th class="bg-blue-300 py-2 pl-2">Materia</th>
          </thead>
          <tbody class="text-center">
            <tr
              class="bg-white odd:bg-gray-200"
              v-for="saber in store.singleData?.expand.saberes"
              :key="saber.codigo"
            >
              <td>{{ saber.codigo }}</td>
              <td>{{ saber.materia }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </Teleport>
  <!-- /Saberes Modal -->

  <!-- Delete Modal -->
  <Teleport to="#modal">
    <input type="checkbox" id="my-modal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">¡Cuidado!</h3>
        <p class="py-4">
          Estas a punto de borrar al profesor {{ store.singleData?.nombre }}. ¿Esta seguro que desea
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
  <!-- /Delete Modal -->
  <AuthLayout>
    <!-- Success Alert -->
    <div class="w-full px-16 pb-8">
      <button @click="create()" class="btn mb-3 rounded-lg bg-green-700 text-white">
        <i class="fas fa-plus-circle pr-1"></i> Registrar Profesor
      </button>
      <!--Table Card-->
      <TableComponent
        title="Profesores"
        v-model="searchQuery"
        :columns="theadColumns"
        :filtered-data="store.filteredData"
        @editButton="edit"
        @deleteModal="selectItem"
        @sorting="sortTable"
        @relation="selectItem"
      />
      <!--/table Card-->
    </div>
  </AuthLayout>
</template>

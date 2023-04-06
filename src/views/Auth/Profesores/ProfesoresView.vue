<script setup lang="ts">
import { useProfesorStore } from '@/stores/profesores'
import AuthLayout from '@/views/Auth/AuthLayout.vue'
import TableComponent from '@/components/Containers/TableComponent.vue'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { data } from './ProfesoresData'
const store = useProfesorStore()
const { fetchAll, destroy, fetchOne } = store
const { searchQuery } = storeToRefs(store)
const { columns } = data

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
    <div class="w-full px-16 pb-8">
      <button @click="create()" class="btn mb-3 rounded-lg bg-green-700 text-white">
        <i class="fas fa-plus-circle pr-1"></i> Registrar Profesor
      </button>
      <!--Table Card-->
      <TableComponent
        title="Profesores"
        v-model="searchQuery"
        :columns="columns"
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

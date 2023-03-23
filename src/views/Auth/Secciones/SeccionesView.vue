<script setup lang="ts">
import { useSeccionStore } from '@/stores/secciones'
import AuthLayout from '@/views/Auth/AuthLayout.vue'
import router from '@/router'
import { storeToRefs } from 'pinia'
import TableComponent from '@/components/Containers/TableComponent.vue'
const store = useSeccionStore()
const { fetchAll, destroy, fetchOne } = store
const { searchQuery } = storeToRefs(store)
const theadColumns = [
  {
    name: 'Codigo',
    isAsc: false
  },
  {
    name: 'Trayecto',
    isAsc: false
  },
  {
    name: 'Estudiantes',
    isAsc: false
  }
]

const sortTable = async (column: string) => {
  await fetchAll(column)
}

function create() {
  router.push({ name: 'secciones.create' })
}

const edit = async (id: string) => {
  await router.push({ name: 'secciones.edit', params: { id } })
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
          Estas a punto de borrar la sección {{ store.singleData?.codigo }}. ¿Esta seguro que desea
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
          >
            Borrar
          </label>
        </div>
      </div>
    </div>
  </Teleport>
  <AuthLayout>
    <div class="w-full px-16 pb-8">
      <button @click="create()" class="btn mb-3 rounded-lg bg-green-700 text-white">
        <i class="fas fa-plus-circle pr-1"></i> Crear Sección
      </button>
      <!--Table Card-->
      <TableComponent
        title="Secciones"
        v-model="searchQuery"
        :columns="theadColumns"
        :filtered-data="store.filteredData"
        @editButton="edit"
        @deleteModal="selectItem"
        @sorting="sortTable"
      />
      <!--/table Card-->
    </div>
  </AuthLayout>
</template>

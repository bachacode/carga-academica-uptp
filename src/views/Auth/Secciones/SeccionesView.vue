<script setup lang="ts">
import { useSeccionStore, type seccionType } from '@/stores/secciones'
import AuthLayout from '@/views/Auth/AuthLayout.vue'
import { storeToRefs } from 'pinia'
import TableComponent from '@/components/Containers/TableComponent.vue'
import type { columnType } from '@/types/columnType'
import DeleteModal from '@/components/Containers/DeleteModal.vue'
import { reactive, ref, watch } from 'vue'
// Store del módulo
const store = useSeccionStore()

// Query de filtrado de la tabla
const { searchQuery } = storeToRefs(store)

// Id del item a eliminar
const id = ref()

// Datos del registro seleccionado
const singleData = reactive<seccionType>({
  codigo: '',
  trayecto: '',
  estudiantes: ''
})

// Columnas de la tabla
const columns: columnType[] = [
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

// Variable que guarda el ordén actual de la tabla
const sortedBy = ref('')

/*
 * Observa a la variable sortedBy por cambios, si esta variable cambia
 * Realizara un fetchAll con el orden de la tabla
 */
watch(sortedBy, async () => {
  await store.fetchAll(sortedBy.value)
})

// Función para ordenar la tabla de forma ASC o DESC
const sortTable = (column: string) => {
  sortedBy.value = column
}

// Función para ir a la vista de "create"
async function create() {
  await store.goToCreate()
}

// Función para ir a la vista de "edit"
const edit = async (id: string) => {
  await store.goToEdit(id)
}

// Función para seleccionar un item del módulo
const selectItem = async (selectedId: string) => {
  id.value = selectedId
  await store.fetchOne(id.value).then((data) => {
    Object.assign(singleData, data)
  })
}

// Función para borrar un item del módulo
async function destroyItem(id: string | undefined) {
  if (id) {
    await store.destroy(id)
  }
}

// Función para cambiar pagina de la tabla
const changePage = async (page: number) => {
  store.actualPage = page
}
</script>
<template>
  <!-- Delete Modal -->
  <DeleteModal :modal-text="`la sección ${singleData?.codigo}`" @destroy-item="destroyItem(id)" />
  <!-- /Delete Modal -->

  <AuthLayout>
    <div class="w-full px-16 pb-8">
      <button @click="create()" class="btn mb-3 rounded-lg bg-indigo-700 text-white">
        <font-awesome-icon icon="circle-plus" class="mr-2" />Crear Sección
      </button>
      <!--Table Card-->
      <TableComponent
        title="módulo Secciones"
        v-model="searchQuery"
        :columns="columns"
        :filtered-data="store.filteredData"
        @editButton="edit"
        @deleteModal="selectItem"
        @sorting="sortTable"
        @change-page="changePage"
        :total-pages="store.data?.totalPages"
        :actual-page="store.actualPage"
      />
      <!--/table Card-->
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { useProfesorStore } from '@/stores/profesores'
import AuthLayout from '@/views/Auth/AuthLayout.vue'
import TableComponent from '@/components/Containers/TableComponent.vue'
import { storeToRefs } from 'pinia'
import DeleteModal from '@/components/Containers/DeleteModal.vue'
import type { theadColumnType } from '@/types/moduleDataType'
// Store del módulo
const store = useProfesorStore()

// Query de filtrado de la tabla
const { searchQuery } = storeToRefs(store)

// Columnas de la tabla
const columns: theadColumnType[] = [
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
    isSingleRelation: {
      name: 'titulo_id',
      childName: 'nombre'
    },
    isAsc: false
  },
  {
    name: 'Contrato',
    isSingleRelation: {
      name: 'id_contrato',
      childName: 'tipo'
    },
    isAsc: false
  },
  {
    name: 'Saberes',
    relationTitle: 'Saberes que ha dado el profesor ',
    noRelations: '¡Este profesor no ha dado ningún saber anteriormente!',
    fatherName: 'nombre',
    multipleData: [
      {
        name: 'materia'
      },
      {
        name: 'trayecto'
      }
    ]
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

// Función para ordenar la tabla de forma ASC o DESC
const sortTable = async (column: string) => {
  await store.fetchAll(column)
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
const selectItem = async (id: string) => {
  await store.fetchOne(id)
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
  <DeleteModal
    :modal-text="`al profesor ${store.singleData?.nombre} ${store.singleData?.apellido}`"
    @destroy-item="destroyItem(store.singleData?.id)"
  />
  <!-- /Delete Modal -->

  <AuthLayout>
    <div class="w-full px-16 pb-8">
      <button @click="create()" class="btn mb-3 rounded-lg bg-green-700 text-white">
        <font-awesome-icon icon="circle-plus" class="mr-2" />Crear Profesor
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
        @change-page="changePage"
        :total-pages="store.data?.totalPages"
        :actual-page="store.actualPage"
      />
      <!--/table Card-->
    </div>
  </AuthLayout>
</template>

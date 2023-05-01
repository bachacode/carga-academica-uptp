<script setup lang="ts">
import { useUsuarioStore } from '@/stores/usuarios'
import AuthLayout from '@/views/Auth/AuthLayout.vue'
import { storeToRefs } from 'pinia'
import TableComponent from '@/components/Containers/TableComponent.vue'
import { useAlertStore } from '@/stores/alert'
import DeleteModal from '@/components/Containers/DeleteModal.vue'
import type { theadColumnType } from '@/types/moduleDataType'

// Store del módulo
const store = useUsuarioStore()

// Query de filtrado de la tabla
const { searchQuery } = storeToRefs(store)

// Columnas de la tabla
const columns: theadColumnType[] = [
  {
    name: 'username',
    nameAlias: 'Usuario',
    isAsc: false
  },
  {
    name: 'Datos Personales',
    multipleData: [
      {
        name: 'name',
        nameAlias: 'Nombre'
      },
      {
        name: 'Apellido'
      },
      {
        name: 'email',
        nameAlias: 'Correo'
      },
      {
        name: 'Cedula'
      }
    ]
  },
  {
    name: 'Status',
    nameAlias: 'Estado',
    isToggable: true
  },
  {
    name: 'Rol',
    nameAlias: 'Promover',
    hasAction: true
  }
]

// Función para ordenar la tabla de forma ASC o DESC
const sortTable = async (column: string) => {
  await store.fetchAll(column, `rol = "Operador" && id != "${store.pb.authStore.model?.id}"`)
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

// Store de alertas del sistema
const alert = useAlertStore()

// Función para activar o desactivar a un usuario operador
const toggleStatus = async (id: string, column: string) => {
  await store.fetchOne(id)
  if (store.singleData)
    store.pb
      .collection('users')
      .update(id, {
        [column]: !store.singleData[column]
      })
      .then(async () => {
        if (store.singleData && store.singleData[column] == true) {
          await alert.setSuccess({ message: '¡Se ha desactivado al usuario correctamente!' })
        } else {
          await alert.setSuccess({ message: '¡Se ha activado al usuario correctamente!' })
        }
        await store.fetchAll(
          '-created',
          `rol = "Operador" && id != "${store.pb.authStore.model?.id}"`
        )
      })
      .catch(async () => {
        if (store.singleData && store.singleData[column] == true) {
          await alert.setSuccess({ message: '¡Ha ocurrido un error al desactivar este usuario!' })
        } else {
          await alert.setSuccess({ message: '¡Ha ocurrido un error al activar este usuario!' })
        }
      })
}

// Función para promover a un usuario operador al rol de administrador
async function promoteUser(id: string | undefined) {
  if (id) {
    if (store.singleData)
      store.pb
        .collection('users')
        .update(id, {
          rol: 'Administrador'
        })
        .then(async () => {
          await alert.setSuccess({ message: '¡Se ha promovido al usuario correctamente!' })
          await store.fetchAll(
            '-created',
            `rol = "Operador" && id != "${store.pb.authStore.model?.id}"`
          )
        })
        .catch(async () => {
          await alert.setError({ message: '¡Ha ocurrido un error al promover este usuario!' })
        })
  }
}
</script>

<template>
  <!-- Delete Modal -->
  <DeleteModal
    :modal-text="`al usuario ${store.singleData?.username}`"
    @destroy-item="destroyItem(store.singleData?.id)"
  />
  <!-- /Delete Modal -->

  <!-- Promote Modal -->
  <Teleport to="#modal">
    <input type="checkbox" id="my-action-rol" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">¡Cuidado!</h3>
        <p class="py-4">
          Estas a punto de promover al usuario
          <span class="font-bold">{{ store.singleData?.username }}</span> al rol de 'Administrador'.
          <span class="font-bold"
            >¡Ya no podrás modificar, desactivar o eliminar a este usuario si realizas esta
            acción!</span
          >
          Este usuario solo podrá ser modificado a través del panel de control del sistema ¿Esta
          seguro que deseas hacer esto?
        </p>
        <div class="modal-action items-center">
          <label
            for="my-action-rol"
            class="btn-outline mr-2 cursor-pointer rounded-xl p-2 hover:bg-white hover:text-green-700"
            >¡No!</label
          >
          <label
            for="my-action-rol"
            class="btn rounded-xl bg-green-700"
            @click="promoteUser(store.singleData?.id)"
          >
            ¡Promover!
          </label>
        </div>
      </div>
    </div>
  </Teleport>
  <!-- /Promote Modal -->

  <AuthLayout>
    <div class="w-full px-16 pb-8">
      <button @click="create()" class="btn mb-3 rounded-lg bg-green-700 text-white">
        <font-awesome-icon icon="circle-plus" class="mr-2" />Registrar Usuario
      </button>
      <!--Table Card-->
      <TableComponent
        title="Operadores"
        v-model="searchQuery"
        :columns="columns"
        :filtered-data="store.filteredData"
        @editButton="edit"
        @deleteModal="selectItem"
        @sorting="sortTable"
        @toggle-column="toggleStatus"
        @trigger-action="selectItem"
        @change-page="changePage"
        :total-pages="store.data?.totalPages"
        :actual-page="store.actualPage"
      />
      <!--/table Card-->
    </div>
  </AuthLayout>
</template>

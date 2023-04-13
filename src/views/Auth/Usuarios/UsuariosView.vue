<script setup lang="ts">
import { useUsuarioStore } from '@/stores/usuarios'
import AuthLayout from '@/views/Auth/AuthLayout.vue'
import router from '@/router'
import { storeToRefs } from 'pinia'
import TableComponent from '@/components/Containers/TableComponent.vue'
import { data } from './UsuariosData'
import { onMounted } from 'vue'
import { useAlertStore } from '@/stores/alert'
const store = useUsuarioStore()
const alert = useAlertStore()
const { fetchAll, destroy, fetchOne } = store
const { searchQuery } = storeToRefs(store)
const { columns } = data

const sortTable = async (column: string) => {
  await fetchAll(column, `rol = "Operador" && id != "${store.pb.authStore.model?.id}"`)
}

async function create() {
  await router.push({ name: 'usuarios.create' })
}

const edit = async (id: string) => {
  await router.push({ name: 'usuarios.edit', params: { id } })
}

const selectItem = async (id: string) => {
  await fetchOne(id)
}

const toggleStatus = async (id: string, column: string) => {
  await fetchOne(id)
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
        await fetchAll('-created', `rol = "Operador" && id != "${store.pb.authStore.model?.id}"`)
      })
      .catch(async () => {
        if (store.singleData && store.singleData[column] == true) {
          await alert.setSuccess({ message: '¡Ha ocurrido un error al desactivar este usuario!' })
        } else {
          await alert.setSuccess({ message: '¡Ha ocurrido un error al activar este usuario!' })
        }
      })
}

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
          await fetchAll('-created', `rol = "Operador" && id != "${store.pb.authStore.model?.id}"`)
        })
        .catch(async () => {
          await alert.setError({ message: '¡Ha ocurrido un error al promover este usuario!' })
        })
  }
}

async function destroyItem(id: string | undefined) {
  if (id) {
    await destroy(id)
  }
}

onMounted(async () => {
  await fetchAll('-created', `rol = "Operador" && id != "${store.pb.authStore.model?.id}"`)
})
</script>

<template>
  <!-- Delete Modal -->
  <Teleport to="#modal">
    <input type="checkbox" id="my-modal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">¡Cuidado!</h3>
        <p class="py-4">
          Estas a punto de borrar al usuario {{ store.singleData?.username }}. ¿Esta seguro que
          desea hacer esto?
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
  <!-- /Delete Modal -->

  <!-- Delete Modal -->
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
            class="btn-outline mr-2 cursor-pointer rounded-xl p-2 hover:bg-white hover:text-blue-700"
            >¡No!</label
          >
          <label
            for="my-action-rol"
            class="btn rounded-xl bg-blue-700"
            @click="promoteUser(store.singleData?.id)"
          >
            ¡Promover!
          </label>
        </div>
      </div>
    </div>
  </Teleport>
  <AuthLayout>
    <div class="w-full px-16 pb-8">
      <button @click="create()" class="btn mb-3 rounded-lg bg-green-700 text-white">
        <i class="fas fa-plus-circle pr-1"></i> Registrar Usuario
      </button>
      <!--Table Card-->
      <TableComponent
        title="Usuarios"
        v-model="searchQuery"
        :columns="columns"
        :filtered-data="store.filteredData"
        @editButton="edit"
        @deleteModal="selectItem"
        @sorting="sortTable"
        @toggle-column="toggleStatus"
        @trigger-action="selectItem"
      />
      <!--/table Card-->
    </div>
  </AuthLayout>
</template>

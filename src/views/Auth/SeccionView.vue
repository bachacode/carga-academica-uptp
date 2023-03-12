<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'
import AuthLayout from './AuthLayout.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
import { OnClickOutside } from '@vueuse/components'
import InputField from '@/components/InputField.vue'

const auth = useAuthStore()
const secciones = ref()
const modal = ref<Boolean>(false)
const modalEdit = ref<Boolean>(false)

const codigo = ref<String | null>()
const trayecto = ref<String | null>()
const estudiantes = ref<Number | null>()
const idSeccion = ref<string>()
function open() {
  modal.value = true
}

async function openEdit(id: string) {
  await auth.pb
    .collection('secciones')
    .getOne(id)
    .then(async (data) => {
      idSeccion.value = data.id
      codigo.value = data.codigo
      trayecto.value = data.trayecto
      estudiantes.value = data.estudiantes
      modalEdit.value = true
    })
}

function resetForm() {
  codigo.value = null
  trayecto.value = null
  estudiantes.value = null
}

function close() {
  modal.value = false
  resetForm()
}

function closeEdit() {
  modal.value = false
  modalEdit.value = false
  resetForm()
}

async function addSeccion() {
  const data = {
    codigo: codigo.value,
    trayecto: trayecto.value,
    estudiantes: estudiantes.value
  }
  await auth.pb
    .collection('secciones')
    .create(data)
    .then(async () => {
      secciones.value = await auth.pb.collection('secciones').getFullList({
        sort: '-created'
      })
      close()
    })
}

async function editSeccion() {
  const id = idSeccion.value
  if (id) {
    const data = {
      codigo: codigo.value,
      trayecto: trayecto.value,
      estudiantes: estudiantes.value
    }
    await auth.pb
      .collection('secciones')
      .update(id, data)
      .then(async () => {
        secciones.value = await auth.pb.collection('secciones').getFullList({
          sort: '-created'
        })
        close()
      })
  }
}

async function deleteSeccion(id: string) {
  await auth.pb
    .collection('secciones')
    .delete(id)
    .then(async () => {
      secciones.value = await auth.pb.collection('secciones').getFullList({
        sort: '-created'
      })
    })
}

onMounted(async () => {
  auth.user = auth.pb.authStore.model
  secciones.value = await auth.pb.collection('secciones').getFullList({
    sort: '-created'
  })
})
</script>

<template>
  <AuthLayout>
    <div class="w-full px-3">
      <!--Table Card-->
      <div class="rounded border bg-white shadow">
        <button
          @click="open()"
          class="my-2 mx-1 rounded-2xl bg-blue-300 px-3 py-2 font-bold text-blue-900"
        >
          + Crear Sección
        </button>
        <!-- Modal -->
        <Teleport to="#modal">
          <OnClickOutside
            v-if="modal"
            @trigger="close()"
            class="fixed top-0 left-0 z-30 flex h-screen w-screen items-center justify-center bg-black bg-opacity-10 backdrop-blur-lg backdrop-filter"
          >
            <div class="relative h-5/6 w-1/4 rounded-lg bg-white px-6">
              <button @click="close()" class="absolute top-3 right-3">X</button>
              <form @submit.prevent="addSeccion()" ref="formSeccion">
                <InputField placeholder="Codigo" v-model="codigo"></InputField>
                <InputField placeholder="Trayecto" v-model="trayecto"></InputField>
                <InputField placeholder="Estudiantes" v-model="estudiantes"></InputField>
                <button
                  type="submit"
                  class="mt-8 bg-blue-800 p-2 text-lg font-bold text-white hover:bg-blue-900"
                >
                  Crear Sección
                </button>
              </form>
            </div>
          </OnClickOutside>
          <OnClickOutside
            v-if="modalEdit"
            @trigger="closeEdit()"
            class="fixed top-0 left-0 z-30 flex h-screen w-screen items-center justify-center bg-black bg-opacity-10 backdrop-blur-lg backdrop-filter"
          >
            <div class="relative h-5/6 w-1/4 rounded-lg bg-white px-6">
              <button @trigger="closeEdit()" class="absolute top-3 right-3">X</button>
              <form @submit.prevent="editSeccion()" ref="formSeccion">
                <InputField placeholder="Codigo" v-model="codigo"></InputField>
                <InputField placeholder="Trayecto" v-model="trayecto"></InputField>
                <InputField placeholder="Estudiantes" v-model="estudiantes"></InputField>
                <input type="hidden" v-model="idSeccion" />
                <button
                  type="submit"
                  class="mt-8 bg-blue-800 p-2 text-lg font-bold text-white hover:bg-blue-900"
                >
                  Editar Seccion
                </button>
              </form>
            </div>
          </OnClickOutside>
        </Teleport>
        <div class="border-b p-3">
          <h5 class="font-bold uppercase text-gray-600">Secciones</h5>
        </div>
        <div class="p-5">
          <table class="w-full p-5 text-gray-700">
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
                <td>{{ seccion.trayecto }}</td>
                <td>{{ seccion.estudiantes }}</td>
                <td><button @click="openEdit(seccion.id)">Editar</button></td>
                <td><button @click="deleteSeccion(seccion.id)">Eliminar</button></td>
              </tr>
            </tbody>
          </table>
          <p class="py-2"><a href="#">See More issues...</a></p>
        </div>
      </div>
      <!--/table Card-->
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { useCargaStore } from '@/stores/carga'
import { useClaseStore } from '@/stores/clases'
import AuthLayout from '@/views/Auth/AuthLayout.vue'
import TableComponent from '@/components/Containers/TableComponent.vue'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { data, daySelector } from './CargaData'
import { ref, watchEffect } from 'vue'
const store = useCargaStore()
const clases = useClaseStore()
const { fetchAll } = store
const { searchQuery } = storeToRefs(store)
const { columns } = data
const activeDay = ref('Lunes')
async function create() {
  await router.push({ name: 'carga.create' })
}

const edit = async (id: string) => {
  await router.push({ name: 'carga.edit', params: { id } })
}

const sortTable = async (column: string) => {
  await fetchAll(column)
}

const selectItem = async (id: string) => {
  await store.fetchOne(id)
}

async function destroyItem(id: string | undefined) {
  if (id) {
    console.log(id)
    await clases.destroy(id).then(async () => {
      await fetchAll('-horas', `dia = "${activeDay.value}"`)
    })
  }
}

watchEffect(async () => {
  if (activeDay.value == 'all') {
    store.data = await store.pb.collection('carga_total').getList(1, 50)
  } else await fetchAll('-horas', `dia = "${activeDay.value}"`)
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
          Estas a punto de borrar la carga academica del profesor
          {{ `${store.singleData?.nombre} ${store.singleData?.apellido}` }}. ¿Esta seguro que desea
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
    <div class="w-full space-x-3 px-16 pb-8">
      <button
        @click="create()"
        class="btn mb-3 rounded-lg bg-green-700 text-white hover:bg-green-900"
      >
        <i class="fas fa-plus-circle pr-1"></i> Registrar Horas Academicas
      </button>
      <button
        @click="router.push({ name: 'carga.recommend' })"
        class="btn mb-3 rounded-lg bg-yellow-500 text-yellow-900 hover:bg-yellow-900 hover:text-yellow-500"
      >
        <i class="fas fa-plus-circle pr-1"></i> Profesores recomendados
      </button>
      <!--Table Card-->
      <TableComponent
        title="Carga Academica"
        v-model="searchQuery"
        :columns="columns"
        :filtered-data="store.filteredData"
        @editButton="edit"
        @deleteModal="selectItem"
        @sorting="sortTable"
        @relation="selectItem"
      >
        <!-- Selector de dia -->
        <template #header>
          <div>
            <ul class="flex justify-around py-6 px-10">
              <li v-for="day in daySelector" :key="day">
                <button
                  v-if="day != 'all'"
                  @click="activeDay = day"
                  :title="day"
                  :class="`btn-outline btn rounded-xl px-16 hover:bg-blue-900 ${
                    activeDay == day ? 'bg-blue-700 text-white' : ''
                  }`"
                >
                  {{ day }}
                </button>
                <button
                  v-if="day == 'all'"
                  @click="activeDay = day"
                  title="Total"
                  :class="`btn-outline btn rounded-xl px-16 hover:bg-blue-900 ${
                    activeDay == day ? 'bg-blue-700 text-white' : ''
                  }`"
                >
                  Total
                </button>
              </li>
            </ul>
          </div>
        </template>
      </TableComponent>
      <!--/table Card-->
    </div>
  </AuthLayout>
</template>

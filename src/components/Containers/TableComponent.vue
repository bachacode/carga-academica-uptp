<script setup lang="ts">
import { defineProps, ref } from 'vue'
import LoadingCircle from '../LoadingCircle.vue'
import type { theadColumnType } from '@/types/moduleDataType'
export interface Props {
  title: string
  placeholder?: string
  modelValue?: any
  filteredData: any
  columns: Array<theadColumnType>
  viewOnly?: boolean
  sortable?: boolean
}
const modals = ref<Array<HTMLInputElement>>([])

function orderBy(state: { name: string; isAsc?: boolean }) {
  if (state.isAsc == true) {
    state.isAsc = false
    return `+${state.name.toLowerCase()}`
  } else state.isAsc = true
  return `-${state.name.toLowerCase()}`
}

function setModal(el: any, key: number) {
  modals.value[key] = el
}

function closeModal(key: number) {
  if (modals.value[key].checked == true) {
    modals.value[key].checked = false
  }
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Buscar',
  viewOnly: false,
  sortable: true
})

const emit = defineEmits([
  'update:modelValue',
  'sorting',
  'deleteModal',
  'relation',
  'editButton',
  'toggleColumn',
  'triggerAction'
])

const updateValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <!--Table Card-->
  <div class="rounded border bg-white shadow">
    <slot name="header"></slot>
    <div class="flex justify-between border-b p-3">
      <h5 class="font-bold uppercase text-gray-600">{{ title }}</h5>
      <label for="search" class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Search</label
      >
      <div class="relative">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
          <svg
            aria-hidden="true"
            class="h-5 w-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          :value="modelValue"
          @input="updateValue"
          name="search"
          :placeholder="placeholder"
          class="rounded-lg border border-blue-300 bg-blue-50 py-1 pl-8 text-sm text-blue-900 shadow-sm focus:border-gray-500 focus:ring-gray-500"
        />
      </div>
    </div>
    <div class="overflow-x-auto p-5">
      <!-- Loading Circle -->
      <LoadingCircle :is-loaded="!filteredData" />

      <table v-if="filteredData" class="table-zebra table-normal table w-full">
        <thead>
          <tr>
            <th v-for="column in columns" class="text-blue-900" :key="column.name">
              <template v-if="column.isAsc != undefined">
                <span @click="$emit('sorting', orderBy(column))" class="cursor-pointer">
                  {{ column.nameAlias ?? column.name }}
                  <!-- Acciones -->
                  <i v-if="column.isAsc && sortable" class="fas fa-sort-down pl-1"></i>
                  <i v-if="!column.isAsc && sortable" class="fas fa-sort-up pl-1"></i>
                </span>
              </template>
              <template v-else>
                <span>
                  {{ column.name }}
                </span>
              </template>
            </th>
            <th v-if="!viewOnly" class="text-blue-900">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, key) in filteredData" :key="record.id">
            <template v-for="column in columns" :key="column.name">
              <!-- Relaciones -->
              <template v-if="Array.isArray(record[column.name.toLowerCase()])">
                <td>
                  <label
                    :for="record.id + column.name"
                    class="btn rounded-xl bg-blue-700 hover:bg-blue-900"
                  >
                    {{ `Ver ${column.name}` }}
                  </label>
                </td>

                <!-- Custom Table Modal -->
                <Teleport to="#modal">
                  <input
                    type="checkbox"
                    @keydown.esc="closeModal(key)"
                    :id="record.id + column.name"
                    class="modal-toggle"
                    :ref="(el) => setModal(el, key)"
                  />
                  <div class="modal" @keypress.esc="closeModal(key)">
                    <div class="modal-box">
                      <div class="flex justify-between">
                        <h3 v-if="!column.fatherName" class="text-lg font-bold">
                          {{ column.relationTitle ?? 'Datos' }}
                        </h3>
                        <h3 v-if="column.fatherName" class="text-lg font-bold">
                          {{ column.relationTitle + record[column.fatherName] ?? 'Datos' }}
                        </h3>
                        <label
                          class="btn-outline mr-2 cursor-pointer rounded-xl pb-2 text-xl hover:bg-white hover:text-blue-700"
                          :for="record.id + column.name"
                          ><font-awesome-icon icon="close"
                        /></label>
                      </div>
                      <div v-if="!record.expand[column.name.toLowerCase()]">
                        {{ column.noRelations ?? '¡Esta tabla esta vacia!' }}
                      </div>
                      <table
                        v-if="record && record.expand[column.name.toLowerCase()]"
                        class="mb-6 w-full border border-blue-700"
                      >
                        <thead>
                          <th
                            v-for="relationColumn in column.multipleData"
                            :key="relationColumn.name"
                            class="bg-blue-300 py-2 pl-2 uppercase"
                          >
                            {{ relationColumn.nameAlias ?? relationColumn.name }}
                          </th>
                        </thead>
                        <tbody class="text-center">
                          <tr
                            class="bg-white odd:bg-gray-200"
                            v-for="saber in record.expand[column.name.toLowerCase()]"
                            :key="saber.id"
                          >
                            <td
                              v-for="relationColumn in column.multipleData"
                              :key="relationColumn.name"
                              class="w-min-content"
                            >
                              {{ saber[relationColumn.name.toLowerCase()] }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Teleport>
                <!-- /Custom Table Modal -->
              </template>

              <!-- Conjuntos -->
              <template v-else-if="column.multipleData">
                <td>
                  <label
                    :for="record.id + column.name"
                    class="btn rounded-xl bg-blue-700 hover:bg-blue-900"
                  >
                    {{ `Ver ${column.name}` }}
                  </label>
                </td>

                <!-- Custom Modal -->
                <Teleport to="#modal">
                  <input
                    type="checkbox"
                    :id="record.id + column.name"
                    class="modal-toggle"
                    @keydown.esc="closeModal(key)"
                    :ref="(el) => setModal(el, key)"
                  />
                  <div class="modal">
                    <div class="modal-box">
                      <div class="flex justify-between">
                        <h3 class="text-lg font-bold">Información</h3>
                        <label
                          class="btn-outline mr-2 cursor-pointer rounded-xl p-2 hover:bg-white hover:text-blue-700"
                          :for="record.id + column.name"
                          >X</label
                        >
                      </div>
                      <table class="mb-6 w-full text-center shadow-xl">
                        <tr
                          v-for="data in column.multipleData"
                          :key="data.name"
                          class="odd:bg-slate-200 even:bg-slate-300"
                        >
                          <th class="bg-blue-700 py-2 pl-2 text-white">
                            {{ data.nameAlias ?? data.name }}
                          </th>
                          <td class="min-w-[140px] max-w-[220px] whitespace-normal break-words">
                            {{ record[data.name.toLowerCase()] }}
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </Teleport>
                <!-- /Custom Modal -->
              </template>

              <!-- Activables -->
              <template v-else-if="column.isToggable">
                <td>
                  <label
                    for="hey"
                    :class="`${
                      record[column.name.toLowerCase()]
                        ? 'bg-green-700 hover:bg-green-900'
                        : 'bg-red-700 hover:bg-red-900'
                    } btn rounded-xl `"
                    @click="$emit('toggleColumn', record.id, column.name.toLowerCase())"
                  >
                    {{ record[column.name.toLowerCase()] ? `Activo` : `Inactivo` }}
                  </label>
                </td>
              </template>

              <!-- Acciones custom -->
              <template v-else-if="column.hasAction">
                <td>
                  <label
                    :for="`my-action-` + column.name.toLowerCase()"
                    class="btn rounded-xl bg-blue-700 hover:bg-blue-900"
                    @click="$emit('triggerAction', record.id)"
                  >
                    {{ column.nameAlias }}
                  </label>
                </td>
              </template>

              <!-- Columnas Normales -->
              <template v-else>
                <td class="min-w-[140px] max-w-[220px] whitespace-normal break-words">
                  {{ record[column.name.toLowerCase()] }}
                </td>
              </template>
            </template>

            <!-- Acciones -->
            <td v-if="!viewOnly" class="space-x-3">
              <button
                :title="`Editar`"
                class="btn rounded-xl bg-blue-700 hover:bg-blue-900"
                @click="$emit('editButton', record.id)"
              >
                <i class="fas fa-edit"></i>
              </button>
              <label
                :title="`Eliminar`"
                for="my-modal"
                class="btn rounded-xl bg-red-700 hover:bg-rose-900"
                @click="$emit('deleteModal', record.id)"
              >
                <i class="fas fa-trash"></i>
              </label>
            </td>
          </tr>

          <!-- Delete Modal
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
            </Teleport> -->
        </tbody>
      </table>
    </div>
  </div>
</template>

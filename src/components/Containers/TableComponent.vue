<script setup lang="ts">
import { defineProps } from 'vue'
import LoadingCircle from '../LoadingCircle.vue'
export interface Props {
  title: string
  placeholder?: string
  modelValue: any
  filteredData: any
  columns: Array<{
    name: string
    isAsc?: boolean
  }>
}

function orderBy(state: { name: string; isAsc?: boolean }) {
  if (state.isAsc == true) {
    state.isAsc = false
    return `+${state.name.toLowerCase()}`
  } else state.isAsc = true
  return `-${state.name.toLowerCase()}`
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Buscar'
})

const emit = defineEmits(['update:modelValue', 'sorting', 'deleteModal', 'relation', 'editButton'])

const updateValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <!--Table Card-->
  <div class="rounded border bg-white shadow">
    <div class="flex justify-between border-b p-3">
      <h5 class="font-bold uppercase text-gray-600">{{ title }}</h5>
      <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input
          type="text"
          :value="modelValue"
          @input="updateValue"
          name="search"
          :placeholder="placeholder"
          class="shadow-sm bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 py-1 pl-8"
        />
      </div>
    </div>
    <div class="overflow-x-auto p-5">
      <LoadingCircle :is-loaded="!filteredData" />
      <table v-if="filteredData" class="table-zebra table-normal table w-full">
        <thead>
          <tr>
            <th v-for="column in columns" class="text-blue-900" :key="column.name">
              <template v-if="column.isAsc != undefined">
                <span @click="$emit('sorting', orderBy(column))" class="cursor-pointer">
                  {{ column.name }}
                  <i v-if="column.isAsc" class="fas fa-sort-down pl-1"></i>
                  <i v-if="!column.isAsc" class="fas fa-sort-up pl-1"></i>
                </span>
              </template>
              <template v-else>
                <span>
                  {{ column.name }}
                </span>
              </template>
            </th>
            <th class="text-blue-900">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in filteredData" :key="record.id">
            <template v-for="column in columns" :key="column.name">
              <template v-if="Array.isArray(record[column.name.toLowerCase()])">
                <td>
                  <button
                    class="btn rounded-xl bg-blue-700 hover:bg-blue-900"
                    @click="$emit('relation', record.id)"
                  >
                    {{ `Ver ${column.name}` }}
                  </button>
                </td>
              </template>
              <template v-else>
                <td>{{ record[column.name.toLowerCase()] }}</td>
              </template>
            </template>
            <td class="space-x-3">
              <button
                class="btn rounded-xl bg-blue-700 hover:bg-blue-900"
                @click="$emit('editButton', record.id)"
              >
                <i class="fas fa-edit"></i>
              </button>
              <label
                for="my-modal"
                class="btn rounded-xl bg-red-700 hover:bg-rose-900"
                @click="$emit('deleteModal', record.id)"
              >
                <i class="fas fa-trash"></i>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

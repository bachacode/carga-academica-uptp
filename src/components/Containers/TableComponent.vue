<script setup lang="ts">
import { defineProps } from 'vue'
import LoadingCircle from '../LoadingCircle.vue'
export interface Props {
  placeholder?: string
  modelValue: any
  filteredData: any
  columns: Array<{
    name: string
    isAsc: boolean
  }>
}

function orderBy(state: { name: string; isAsc: boolean }) {
  if (state.isAsc == true) {
    state.isAsc = false
    return `+${state.name.toLowerCase()}`
  } else state.isAsc = true
  return `-${state.name.toLowerCase()}`
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Buscar'
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <!--Table Card-->
  <div class="rounded border bg-white shadow">
    <div class="flex justify-between border-b p-3">
      <h5 class="font-bold uppercase text-gray-600">Secciones</h5>
      <input
        type="text"
        :placeholder="placeholder"
        class="border border-gray-300 px-1"
        :value="modelValue"
        @input="updateValue"
      />
    </div>
    <div class="overflow-x-auto p-5">
      <LoadingCircle :is-loaded="!filteredData" />
      <table v-if="filteredData" class="table-zebra table-normal table w-full">
        <thead>
          <tr>
            <th v-for="column in columns" class="text-blue-900" :key="column.name">
              <span @click="$emit('sorting', orderBy(column))" class="cursor-pointer">
                {{ column.name }}
                <i v-if="column.isAsc" class="fas fa-sort-down pl-1"></i>
                <i v-if="!column.isAsc" class="fas fa-sort-up pl-1"></i>
              </span>
            </th>
            <th class="text-blue-900">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in filteredData" :key="record.id">
            <template v-for="column in columns" :key="column.name">
              <td>{{ record[column.name.toLowerCase()] }}</td>
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

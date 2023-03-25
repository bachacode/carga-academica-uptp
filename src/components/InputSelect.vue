<script setup lang="ts">
import { defineProps } from 'vue'
export interface Props {
  placeholder?: string
  name: string
  modelValue: any
  inputClasses?: string
}

withDefaults(defineProps<Props>(), {
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <select 
  :value="modelValue"
  @input="updateValue"
  :name="name"
  class="bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
  >
  <option disabled hidden value="">Seleccione un trayecto</option>
  <option value="1">Trayecto 1</option>
  <option value="2">Trayecto 2</option>
  <option value="3">Trayecto 3</option>
  <option value="4">Trayecto 4</option>
  </select>
</template>
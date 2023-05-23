<script setup lang="ts">
import { defineProps } from 'vue'
export interface Props {
  placeholder: string
  name: string
  modelValue: any
  inputClasses?: string
  options: {
    value: any
    name: any
  }[]
  disablePlaceholder: boolean
}

withDefaults(defineProps<Props>(), {
  disablePlaceholder: true
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
    :id="name"
    class="block w-full rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-sm text-indigo-900 focus:border-gray-500 focus:ring-gray-500"
  >
    <option :disabled="disablePlaceholder" :hidden="disablePlaceholder" value="">
      {{ placeholder }}
    </option>
    <template v-for="option in options" :key="option.value">
      <option :value="option.value">{{ option.name }}</option>
    </template>
  </select>
</template>

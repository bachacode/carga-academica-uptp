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
}

withDefaults(defineProps<Props>(), {})

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
    class="block w-full rounded-lg border border-blue-300 bg-blue-50 p-2.5 text-sm text-blue-900 focus:border-gray-500 focus:ring-gray-500"
  >
    <option disabled hidden value="">{{ placeholder }}</option>
    <template v-for="option in options" :key="option.value">
      <option :value="option.value">{{ option.name }}</option>
    </template>
  </select>
</template>

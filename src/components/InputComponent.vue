<script setup lang="ts">
import { defineProps } from 'vue'
export interface Props {
  placeholder?: string
  type?: string
  name: string
  modelValue: any
  readonly?: boolean
  inputClasses?: string
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  readonly: false
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <input
    :readonly="readonly"
    :type="type"
    :value="modelValue"
    @input="updateValue"
    :name="name"
    :placeholder="placeholder"
    :class="`${inputClasses} block w-full rounded-lg border border-blue-300 bg-blue-50 p-2.5 text-sm text-blue-900 shadow-sm focus:border-gray-500 focus:ring-gray-500`"
  />
</template>

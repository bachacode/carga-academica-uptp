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
    :class="`${inputClasses} focus:shadow-outline mt-1 w-full appearance-none rounded border bg-blue-100 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none`"
  />
</template>

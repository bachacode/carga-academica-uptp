<script setup lang="ts">
import { defineProps } from 'vue'
export interface Props {
  placeholder?: string
  type?: string
  label: string
  name: string
  modelValue: any
  col?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  col: true
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <div :class="`flex ${col ? 'flex-col' : ''} pt-4`">
    <label :for="name" class="text-lg">{{ label }}</label>
    <div>
      <input
        :type="type"
        :value="modelValue"
        @input="updateValue"
        :name="name"
        :placeholder="placeholder"
        class="focus:shadow-outline mt-1 w-full appearance-none rounded border bg-blue-50 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
      />
      <slot></slot>
    </div>
  </div>
</template>

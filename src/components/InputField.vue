<script setup lang="ts">
import { defineProps } from 'vue'
export interface Props {
  label: string
  name: string
  col?: boolean
  helperText?: string
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  col: true,
  readonly: false
})
</script>

<template>
  <div :class="`flex ${col ? 'flex-col' : ''} mb-6`">
    <label :for="name" class="block mb-2 text-sm font-medium text-gray-900">{{ label }}</label>
    <div>
      <slot name="InputField"></slot>
      <p v-if="helperText" class="mt-2 text-sm text-gray-500 dark:text-gray-400">{{ helperText }}</p>
      <slot name="InputError"></slot>
    </div>
  </div>
</template>

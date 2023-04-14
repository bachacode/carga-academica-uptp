<script setup lang="ts">
import { defineProps } from 'vue'
export interface Props {
  label: string
  name: string
  col?: boolean
  helperText?: string
}

withDefaults(defineProps<Props>(), {
  col: true,
  readonly: false
})
</script>

<template>
  <div :class="`flex ${col ? 'flex-col' : 'items-center'} mb-6 w-full`">
    <label :for="name" :class="`${col ? 'mb-2' : ''} block text-sm font-medium text-gray-900`">{{
      label
    }}</label>
    <div>
      <slot name="InputField"></slot>
      <slot name="InputError"></slot>
      <p v-if="helperText" class="mt-2 ml-4 text-sm text-gray-600">
        <span class="text-red-600">*</span>
        {{ helperText }}
      </p>
    </div>
  </div>
</template>

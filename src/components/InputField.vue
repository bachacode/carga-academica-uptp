<script setup lang="ts">
import { defineProps } from 'vue'
export interface Props {
  label: string
  name: string
  col?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  col: true,
  readonly: false
})
</script>

<template>
  <div :class="`flex ${col ? 'flex-col' : ''} pt-4`">
    <label :for="name" class="text-lg">{{ label }}</label>
    <div>
      <slot name="InputField"></slot>
      <slot name="InputError"></slot>
    </div>
  </div>
</template>

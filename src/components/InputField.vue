<script setup lang="ts">
import { defineProps } from 'vue'

export interface Props {
  placeholder: string
  modelValue: any
  type?: string
}

withDefaults(defineProps<Props>(), {
  type: 'text'
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="flex flex-col pt-4">
    <label for="password" class="text-lg">{{ placeholder }}</label>
    <input
      :value="modelValue"
      @input="updateValue"
      :type="type"
      :id="placeholder"
      :placeholder="placeholder"
      class="focus:shadow-outline mt-1 w-full appearance-none rounded border bg-blue-50 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
    />
  </div>
</template>

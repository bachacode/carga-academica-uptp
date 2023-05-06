<script setup lang="ts">
defineProps<{
  message: string
}>()
defineEmits<{
  close: any
}>()
</script>

<template>
  <div
    class="alert alert-success fixed right-24 top-[106px] z-50 w-3/4 bg-indigo-300 py-4 font-semibold text-indigo-700 shadow-lg"
  >
    <div class="flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 flex-shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{{ message }}</span>
    </div>
    <button class="pr-6" @click="$emit('close')">X</button>
  </div>
</template>

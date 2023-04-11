<script setup lang="ts">
export interface Props {
  cardWidth: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex items-center justify-center">
    <div :class="`${cardWidth} rounded border bg-white mb-6 shadow`">
        <slot></slot>
    </div>
  </div>
</template>
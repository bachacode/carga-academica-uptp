<script setup lang="ts">
defineProps<{
  message: string,
  classes: string
}>()
</script>

<template>
    <p :class="`${classes} text-sm text-red-600`">{{message}}</p>
</template>
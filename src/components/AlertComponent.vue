<script setup lang="ts">
defineProps<{
  message: string
  type?: string
}>()
defineEmits<{
  close: any
}>()
</script>

<template>
  <div
    :class="`alert alert-${type} fixed right-24 top-[106px] z-50 w-3/4  py-4 font-semibold shadow-lg`"
  >
    <div class="flex">
      <font-awesome-icon v-if="type == 'success'" icon="circle-check" class="fa-fw" />
      <font-awesome-icon v-if="type == 'error'" icon="circle-xmark" class="fa-fw" />
      <span>{{ message }}</span>
    </div>
    <button class="pr-6" @click="$emit('close')">X</button>
  </div>
</template>

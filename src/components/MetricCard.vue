<script setup lang="ts">
defineProps<{
  title: string
  amount: string
  mainIconColor: string
  secondaryIconColor?: string
}>()
</script>

<template>
  <div class="rounded border bg-white p-2 shadow">
    <div class="flex flex-row items-center">
      <div class="flex-shrink pr-4">
        <div :class="`rounded bg-blue-600 p-3`">
          <slot name="main-icon">
            <font-awesome-icon icon="font-awesome" class="fa-2x fa-fw fa-inverse" />
          </slot>
        </div>
      </div>
      <div class="flex-1 text-right md:text-center">
        <h5 class="font-bold uppercase text-gray-500">{{ title }}</h5>
        <h3 class="text-3xl font-bold">
          {{ amount }}
          <span :class="`text-blue-500`"><slot name="secondary-icon"></slot></span>
        </h3>
      </div>
    </div>
  </div>
</template>

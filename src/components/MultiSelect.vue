<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import type { OnClickOutsideHandler } from '@vueuse/core'

export type optionType = {
  name: string
  value: string
  isActive: boolean
}

interface Props {
  name: string
  selectedOptions: Array<string> | undefined | null
  tags?: optionType[]
}

defineProps<Props>()
defineEmits(['removeTag'])
const dropdown = ref(false)

const dropdownHandler: OnClickOutsideHandler = () => {
  dropdown.value = false
}

const toggle = () => {
  dropdown.value = !dropdown.value
}

const open = () => {
  dropdown.value = true
}

const toggleTag = (tag: optionType, selectedOptions: any) => {
  tag.isActive = !tag.isActive
  if (tag.isActive) {
    selectedOptions.push(tag.value)
  } else if (!tag.isActive) {
    selectedOptions.splice(selectedOptions.indexOf(tag.value), 1)
  }
}
</script>

<template>
  <div>
    <!-- Search Bar -->
    <!-- <input 
    type="hidden" 
    :value="modelValue"
    @input="updateValue"
    :name="name"
    > -->
    <div class="relative">
      <div
        @click.stop="open"
        class="flex min-h-[42px] w-full cursor-text items-center rounded-lg border border-blue-300 bg-blue-50 p-2.5 text-blue-900 shadow-sm focus:border-gray-500 focus:ring-gray-500"
      ></div>
      <div
        @click.stop="toggle"
        class="absolute inset-y-0 right-0 z-10 flex cursor-pointer items-center pr-2"
      >
        <font-awesome-icon v-if="!dropdown" icon="chevron-down" class="text-blue-500" />
        <font-awesome-icon v-else icon="chevron-up" class="text-blue-500" />
      </div>
      <div id="tags" class="absolute inset-y-2 left-0 flex h-auto space-x-2.5 pl-2">
        {{
          `${
            selectedOptions
              ? `${selectedOptions.length} ${name} seleccionadas`
              : 'Seleccione una opción'
          }`
        }}
      </div>
    </div>
    <div
      v-show="dropdown"
      v-on-click-outside.bubble="dropdownHandler"
      class="block w-full rounded-b-lg border border-blue-300 bg-blue-50 p-2.5 text-sm text-blue-900 shadow-sm focus:border-gray-500 focus:ring-gray-500"
    >
      <ul class="relative max-h-40 overflow-auto" v-for="tag in tags" :key="tag.value">
        <li
          :class="`${
            !tag.isActive ? 'hover:bg-green-300' : 'hover:bg-red-300'
          } cursor-pointer rounded-md py-1 px-2`"
          @click.stop="toggleTag(tag, selectedOptions)"
        >
          <span>{{ tag.name }}</span>
          <font-awesome-icon icon="check" v-if="tag.isActive" class="absolute right-0 pr-1" />
        </li>
      </ul>
    </div>
  </div>
</template>

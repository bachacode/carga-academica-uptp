import { ref } from 'vue'
import type { Admin, Record } from 'pocketbase'
import { defineStore } from 'pinia'

import PocketBase from 'pocketbase'

export const useAuthStore = defineStore('auth', () => {
  const pb = new PocketBase('http://localhost:8000')
  const user = ref<Record | Admin | null>(pb.authStore.model)

  const getUser = () => {
    console.log(user.value)
  }

  return { pb, user, getUser }
})

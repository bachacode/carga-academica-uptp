import { ref } from 'vue'
import type { Admin, Record } from 'pocketbase'
import { defineStore } from 'pinia'
import router from '@/router'
import PocketBase from 'pocketbase'
import pocketbaseEs from 'pocketbase'

export const useAuthStore = defineStore('auth', () => {
  const pb = new PocketBase('http://localhost:8000')
  const user = ref<Record | Admin | null>(pb.authStore.model)

  const getUser = () => {
    console.log(user.value)
  }

  async function login(username: string, password:string) {
    await pb
    .collection('users')
    .authWithPassword(username, password)
    .then(() => {
      router.push('dashboard')
      console.log('You successfully logged in!')
    })
    .catch((error) => {
      console.error(error)
    })
  }

  function logout() {
    pb.authStore.clear()
    router.push('/')
  }

  return { pb, user, getUser, logout, login }
})

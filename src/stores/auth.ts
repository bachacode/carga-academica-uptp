import { ref } from 'vue'
import type { Admin, Record } from 'pocketbase'
import { defineStore } from 'pinia'
import router from '@/router'
import PocketBase from 'pocketbase'

export const useAuthStore = defineStore('auth', () => {
  const pb = new PocketBase('http://localhost:8000')
  const user = ref<Record | Admin | null>(pb.authStore.model)

  const errors = ref({
    isActive: false,
    message: 'El nombre de usuario o la contraseña son incorrectos'
  })

  async function login(username: string, password: string) {
    await pb
      .collection('users')
      .authWithPassword(username, password)
      .then(() => {
        router.push('dashboard')
        console.log('You successfully logged in!')
      })
      .catch(() => {
        errors.value.isActive = true
        setTimeout(() => {
          errors.value.isActive = false
        }, 3000)
      })
  }

  pb.authStore.onChange(() => {
    user.value = pb.authStore.model
  }, true)

  function logout() {
    pb.authStore.clear()
    router.push('/')
  }

  return { pb, user, logout, login, errors }
})

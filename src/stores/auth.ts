import { ref, computed } from 'vue'
import type { Admin, Record } from 'pocketbase'
import { defineStore } from 'pinia'
import router from '@/router'
import PocketBase from 'pocketbase'

type userWithRole = Admin & Record & {
  rol: string
}

export const useAuthStore = defineStore('auth', () => {
  const pb = new PocketBase('http://localhost:8000')
  const user = ref<Record | Admin | null | userWithRole>(pb.authStore.model)
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
      })
      .catch(() => {
        errors.value.isActive = true
        setTimeout(() => {
          errors.value.isActive = false
        }, 3000)
      })
  }

  pb.authStore.onChange(async () => {
    if(pb.authStore.model != null) {
    user.value = await pb.collection('users').getOne<userWithRole>(pb.authStore.model.id)
    }
  }, true)

  const isAuthenticated = computed(() => {
    return pb.authStore.isValid
  })

  async function logout() {
    await pb.authStore.clear()
    await router.push('/')
  }

  return { pb, user, logout, login, errors, isAuthenticated }
})

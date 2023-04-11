import { ref, computed } from 'vue'
import type { Admin, Record } from 'pocketbase'
import { defineStore } from 'pinia'
import router from '@/router'
import PocketBase from 'pocketbase'

type userWithRole = Admin &
  Record & {
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
      .then((data) => {
        if (data.record.status == true) {
          router.push('dashboard')
        } else if (data.record.status == false) pb.authStore.clear()
        errors.value.message =
          '¡Su cuenta esta desactivada! contacte con un administrador si cree que esto es un error'
        errors.value.isActive = true
      })
      .catch(() => {
        errors.value.message = 'El nombre de usuario o la contraseña son incorrectos'
        errors.value.isActive = true
        setTimeout(() => {
          errors.value.isActive = false
        }, 3000)
      })
  }

  async function recoverPassword(email: string) {
    await pb.collection('users').requestPasswordReset(email)
  }

  async function changePassword(token: string, password: string, confirmPassword: string) {
    await pb
      .collection('users')
      .confirmPasswordReset(token, password, confirmPassword)
      .catch((error) => console.log(error))
  }

  pb.authStore.onChange(async () => {
    if (pb.authStore.model != null) {
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

  return { pb, user, logout, login, errors, isAuthenticated, recoverPassword, changePassword }
})

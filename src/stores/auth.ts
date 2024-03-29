import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import PocketBase, { Record, Admin } from 'pocketbase'
import { useAlertStore } from './alert'

export const useAuthStore = defineStore('auth', () => {
  const pb = new PocketBase('http://localhost:8000')
  const alert = useAlertStore()
  const user = ref<Record | Admin | null>()
  const errors = ref({
    isActive: false,
    message: 'El nombre de usuario o la contraseña son incorrectos'
  })

  async function login(username: string, password: string) {
    await pb
      .collection('usuarios')
      .authWithPassword(username, password)
      .then((data) => {
        if (data.record.estado == true) {
          router.push('dashboard')
        } else if (data.record.estado == false) {
          pb.authStore.clear()
          errors.value.message =
            '¡Su cuenta esta desactivada! contacte con un administrador si cree que esto es un error'
          errors.value.isActive = true
          setTimeout(() => {
            errors.value.isActive = false
          }, 3000)
        }
      })
      .catch(() => {
        errors.value.message = 'El nombre de usuario o la contraseña son incorrectos'
        errors.value.isActive = true
        setTimeout(() => {
          errors.value.isActive = false
        }, 3000)
      })
  }

  async function sendVerification() {
    await pb
      .collection('usuarios')
      .requestVerification(pb.authStore.model?.email)
      .then(async () =>
        alert.setSuccess({
          message: '¡Se ha enviado la verificación a su dirección de correo electronico!'
        })
      )
      .catch(async () => alert.setError({ message: '¡Ha ocurrido un error inesperado!' }))
  }

  async function verifyEmail(token: string) {
    await pb.collection('usuarios').confirmVerification(token)
  }

  async function recoverPassword(email: string) {
    await pb.collection('usuarios').requestPasswordReset(email)
  }

  async function changePassword(token: string, password: string, confirmPassword: string) {
    await pb
      .collection('usuarios')
      .confirmPasswordReset(token, password, confirmPassword)
      .catch((error) => console.log(error))
  }

  const isAuthenticated = computed(() => {
    return pb.authStore.isValid
  })

  async function logout() {
    await pb.authStore.clear()
    await router.push('/')
  }

  pb.authStore.onChange((token, model) => {
    user.value = model
  })

  return {
    pb,
    logout,
    login,
    errors,
    isAuthenticated,
    recoverPassword,
    changePassword,
    verifyEmail,
    sendVerification,
    user
  }
})

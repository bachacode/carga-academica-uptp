import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export interface alertType {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  isActive?: boolean
}

export const useAlertStore = defineStore('alert', () => {
  const data = reactive<alertType>({
    message: '',
    type: 'info',
    isActive: false
  })
  const alertTimer = ref(5000)
  const delayBetweenAlerts = ref(200)

  const timeoutId = ref<number | null>(null)

  async function setSuccess({ message, type = 'success' }: alertType) {
    data.message = message
    data.type = type
    await setAlertTimer()
  }

  async function setError({ message, type = 'error' }: alertType) {
    data.message = message
    data.type = type
    await setAlertTimer()
  }

  async function setAlertTimer() {
    if (data.isActive == true) {
      data.isActive = false
      setTimeout(() => {
        setAlertTimer()
      }, delayBetweenAlerts.value)
    } else data.isActive = true
    if (!timeoutId.value != null && typeof timeoutId.value == 'number') {
      window.clearTimeout(timeoutId.value)
      timeoutId.value = null
    }
    timeoutId.value = setTimeout(() => {
      data.isActive = false
    }, alertTimer.value)
  }

  function disableAlert() {
    data.isActive = false
  }

  return { data, setSuccess, setError, disableAlert }
})

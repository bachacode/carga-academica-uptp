import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alert', () => {
  const successAlert = ref({
    message: '',
    isActive: false
  })

  const errorAlert = ref({
    message: '',
    isActive: false
  })

  const timeoutId = ref<number | null>(null)

  async function setSuccess(message: string) {
    successAlert.value.message = message
    if (successAlert.value.isActive == true) {
      successAlert.value.isActive = false
      setTimeout(() => {
        setSuccess(message)
      }, 200)
    } else successAlert.value.isActive = true
    if (!timeoutId.value != null && typeof timeoutId.value == 'number') {
      window.clearTimeout(timeoutId.value)
      timeoutId.value = null
    }
    timeoutId.value = setTimeout(() => {
      successAlert.value.isActive = false
    }, 5000)
  }

  async function setError(message: string) {
    errorAlert.value.message = message
    if (errorAlert.value.isActive == true) {
      errorAlert.value.isActive = false
      setTimeout(() => {
        setError(message)
      }, 200)
    } else errorAlert.value.isActive = true
    if (!timeoutId.value != null && typeof timeoutId.value == 'number') {
      window.clearTimeout(timeoutId.value)
      timeoutId.value = null
    }
    timeoutId.value = setTimeout(() => {
      errorAlert.value.isActive = false
    }, 5000)
  }

  function disableAlert() {
    if (successAlert.value.isActive == true) {
      successAlert.value.isActive = false
    } else errorAlert.value.isActive = false
  }

  return { successAlert, errorAlert, setSuccess, setError, disableAlert }
})

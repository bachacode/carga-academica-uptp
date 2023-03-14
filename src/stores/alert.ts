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

  async function setSuccess(message: string) {
    successAlert.value.message = message
    successAlert.value.isActive = true
    setTimeout(() => {
      successAlert.value.isActive = false
    }, 5000)
  }

  async function setError(message: string) {
    errorAlert.value.message = message
    errorAlert.value.isActive = true
    setTimeout(() => {
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

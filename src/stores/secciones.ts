import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import router from '@/router'
import { useAlertStore } from './alert'

export type seccionType = {
  codigo: string
  trayecto: string
  estudiantes: number
}

export interface ISeccion extends seccionType {
  id: string
  created: Date
  updated: Date
}

export const useSeccionStore = defineStore('seccion', () => {
  const { pb } = useAuthStore()
  const alert = useAlertStore()
  const parentRoute = ref<string>('/secciones')

  async function fetchAll() {
    return await pb.collection('secciones').getFullList<ISeccion>({
      sort: '-created'
    })
  }

  async function fetchOne(id: string) {
    return await pb.collection('secciones').getOne<ISeccion>(id)
  }

  async function store(data: seccionType) {
    await pb
      .collection('secciones')
      .create(data)
      .then(async () => {
        await router.push({ path: parentRoute.value })
        alert.setSuccess('La sección se ha guardado correctamente')
      })
  }

  async function update(id: string, data: seccionType) {
    await pb
      .collection('secciones')
      .update(id, data)
      .then(() => {
        router.push({ path: parentRoute.value })
        alert.setSuccess('La sección se ha editado correctamente')
      })
  }

  async function destroy(id: string) {
    return await pb
      .collection('secciones')
      .delete(id)
      .then(async () => {
        router.push({ path: parentRoute.value })
        alert.setSuccess('La sección se ha borrado correctamente')
        return await fetchAll()
      })
  }

  return { store, update, destroy, fetchAll, fetchOne }
})

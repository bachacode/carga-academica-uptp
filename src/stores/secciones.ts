import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import router from '@/router';

export type seccionType = {
  codigo: string;
  trayecto: string;
  estudiantes: number;
} 

export interface ISeccion extends seccionType {
  id: string;
  created: Date;
  updated: Date;
}

export const useSeccionStore = defineStore('seccion', () => {

  const { pb } = useAuthStore();
  const parentRoute = ref<string>('/secciones');

  async function fetchAll(){
    return await pb
    .collection('secciones')
    .getFullList<ISeccion>({
      sort: '-created'
    })
  }

  async function fetchOne(id: string) {
    return await pb
    .collection('secciones')
    .getOne<ISeccion>(id)
  }

  async function store(data: seccionType) {
    await pb
    .collection('secciones')
    .create(data)
    .then(async () => {
      await fetchAll();
      router.push(parentRoute.value);
    })
  }
  
  async function update(id: string, data: seccionType) {
    await pb
      .collection('secciones')
      .update(id, data)
      .then(async () => {
        router.push(parentRoute.value);
      })
  }
  
  async function destroy(id: string) {
    return await pb
    .collection('secciones')
    .delete(id)
    .then(async () => {
      return await fetchAll();
    })
  }

  return { store, update, destroy, fetchAll, fetchOne }
})

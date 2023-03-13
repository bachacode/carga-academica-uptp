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
  const alertMessages = ref([
    'La sección se ha guardado correctamente',
    'La sección se ha actualizado correctamente',
    'La sección se ha eliminado correctamente',
  ])
  const messageIsActive = ref(false);

  async function fetchAll(){
    return await pb
    .collection('secciones')
    .getFullList<ISeccion>({
      sort: '-created'
    })
  }

  function getActive() {
    console.log(messageIsActive.value);
  }

  async function fetchOne(id: string) {
    return await pb
    .collection('secciones')
    .getOne<ISeccion>(id)
  }

  function setTimer() {
    messageIsActive.value = true;
    setTimeout(() => {
      messageIsActive.value = false
    }, 3000)
  }

  async function store(data: seccionType) {
    await pb
    .collection('secciones')
    .create(data)
    .then(() => {
      setTimer();
      router.push({path: parentRoute.value, query:{status: 0}})
    })
  }
  
  async function update(id: string, data: seccionType) {
    await pb
      .collection('secciones')
      .update(id, data)
      .then(() => {
        router.push({path: parentRoute.value, query:{status: 1}});
        messageIsActive.value = true
        setTimeout(() => {
          messageIsActive.value = false
        }, 3000)
      })
  }
  
  async function destroy(id: string) {
    return await pb
    .collection('secciones')
    .delete(id)
    .then(async () => {
      router.push({path: parentRoute.value, query:{status: 2}});
      return await fetchAll();
    })
  }

  return { store, update, destroy, fetchAll, fetchOne, alertMessages, messageIsActive, getActive }
})

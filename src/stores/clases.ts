import type { Record } from 'pocketbase'
import { createCrudStore } from './factory'

export type claseType = {
  id_seccion: string
  id_profesor: string
  id_saber: string
  dia: 'Lunes' | 'Martes' | 'Miercoles' | 'Jueves' | 'Viernes'
  horas: number
}

export interface IClase extends claseType, Record {
  id: string
  created: string
  updated: string
}

const successMessages = {
  create: 'El profesor se ha guardado correctamente',
  update: 'El profesor se ha actualizado correctamente',
  delete: 'El profesor se ha borrado correctamente'
}

const errorMessages = {
  create: 'Ha ocurrido un error al crear el profesor',
  update: 'Ha ocurrido un error al actualizar el profesor',
  delete: 'Ha ocurrido un error al borrar el profesor'
}

export const useClaseStore = createCrudStore<claseType, IClase>({
  storeId: 'clases',
  route: '/carga',
  collectionName: 'clases',
  success: successMessages,
  error: errorMessages,
  relations: ['secciones','profesores', 'saberes'],
  autoFetch: false
})

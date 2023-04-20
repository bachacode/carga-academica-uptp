import type { Record } from 'pocketbase'
import { createCrudStore } from './factory'

export type claseType = {
  id_seccion: string
  id_profesor: string
  id_saber: string
  dia: 'Lunes' | 'Martes' | 'Miercoles' | 'Jueves' | 'Viernes' | ''
  horas: number | string
}

export interface IClase extends claseType, Record {
  id: string
  created: string
  updated: string
}

const successMessages = {
  create: 'Se ha asignado la carga al profesor correctamente',
  update: 'Se ha actualizado la carga del profesor correctamente',
  delete: 'Se ha borrado la carga del profesor correctamente'
}

const errorMessages = {
  create: 'Ha ocurrido un error al asignarle la carga al profesor',
  update: 'Ha ocurrido un error al actualizar la carga del profesor',
  delete: 'Ha ocurrido un error al borrar la carga del profesor'
}

export const useClaseStore = createCrudStore<claseType, IClase>({
  storeId: 'clases',
  route: '/carga',
  collectionName: 'clases',
  success: successMessages,
  error: errorMessages
})

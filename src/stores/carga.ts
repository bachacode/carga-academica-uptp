import type { Record } from 'pocketbase'
import { createCrudStore } from './factory'

export type Carga = {
  seccion_id: string
  profesor_id: string
  saber_id: string
  horas: number | string
  dia: 'Lunes' | 'Martes' | 'Miercoles' | 'Jueves' | 'Viernes' | ''
}

export interface ICarga extends Carga, Record {}

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

export const useCargaStore = createCrudStore<Carga, ICarga>({
  storeId: 'cargas',
  route: 'carga',
  collectionName: 'cargas',
  success: successMessages,
  error: errorMessages,
  autoFetch: false,
  relations: ['saber_id']
})

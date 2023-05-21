import type { Record } from 'pocketbase'
import { createViewStore } from './factory'

export type claseType = {
  nombre: string
  apellido: string
  cedula: string
  titulo: string
  saberes: Array<string>
  telefono: string
  correo: string
}

export interface IClase extends claseType, Record {}

export const useClaseStore = createViewStore<IClase>({
  storeId: 'clases',
  collectionName: 'carga_profesores',
  relations: ['saberes'],
  autoFetch: false
})

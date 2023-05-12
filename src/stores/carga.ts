import type { Record } from 'pocketbase'
import { createViewStore } from './factory'

export type cargaType = {
  nombre: string
  apellido: string
  cedula: string
  titulo: string
  saberes: Array<string>
  telefono: string
  correo: string
}

export interface ICarga extends cargaType, Record {}

export const useCargaStore = createViewStore<ICarga>({
  storeId: 'carga',
  collectionName: 'carga',
  relations: ['saberes'],
  autoFetch: false
})

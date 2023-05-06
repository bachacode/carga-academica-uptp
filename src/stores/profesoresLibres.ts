import type { Record } from 'pocketbase'
import { createViewStore } from './factory'

export type profesoresLibresType = {
  nombre: string
  apellido: string
  titulo: string
  saberes: Array<string>
}

export interface ICarga extends profesoresLibresType, Record {
  id: string
  created: string
  updated: string
}

export const useProfesoresLibresStore = createViewStore<ICarga>({
  storeId: 'profesoresLibres',
  collectionName: 'profesores_libres',
  relations: ['saberes'],
  autoFetch: false
})

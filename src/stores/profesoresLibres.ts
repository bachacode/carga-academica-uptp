import type { Record } from 'pocketbase'
import { createViewStore } from './factory'
import type { ISaber } from './saberes'

export type ProfesorLibre = {
  nombre: string
  apellido: string
  titulo: string
  saberes: Array<string>
}

export interface ICarga extends ProfesorLibre, Record {
  expand: {
    saberes: Array<ISaber>
  }
}

export const useProfesoresLibresStore = createViewStore<ICarga>({
  storeId: 'profesoresLibres',
  collectionName: 'profesores_libres',
  relations: ['saberes'],
  autoFetch: false
})

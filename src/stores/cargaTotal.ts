import type { Record } from 'pocketbase'
import { createViewStore } from './factory'

export type cargaType = {
  nombre: string
  apellido: string
  titulo: string
  saberes: Array<string>
  horas: number
}

export interface ICarga extends cargaType, Record {
  id: string
  created: string
  updated: string
}

export const useCargaTotalStore = createViewStore<ICarga>({
  storeId: 'cargaTotal',
  collectionName: 'carga_total',
  relations: ['saberes'],
  autoFetch: true
})

import type { Record } from 'pocketbase'
import { createViewStore } from './factory'

export type cargaType = {
  nombre: string
  apellido: string
  cedula: string
  contrato_horas: number
  horas: number
}

export interface ICarga extends cargaType, Record {}

export const useCargaTotalStore = createViewStore<ICarga>({
  storeId: 'cargaTotal',
  collectionName: 'carga_total',
  autoFetch: false
})

import type { Record } from 'pocketbase'
import { createViewStore } from './factory'

export type CargaTotal = {
  nombre: string
  apellido: string
  cedula: string
  contrato_horas: number
  horas: number
  horas_dadas: string
}

export interface ICargaTotal extends CargaTotal, Record {}

export const useCargaTotalStore = createViewStore<ICargaTotal>({
  storeId: 'cargaTotal',
  collectionName: 'carga_total',
  autoFetch: false
})

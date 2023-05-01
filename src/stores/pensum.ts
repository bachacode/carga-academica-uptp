import type { Record } from 'pocketbase'
import { createViewStore } from './factory'

export type pensumType = {
  codigo: string
  periodo: number
  creditos: number
  id_saber: string
}

export interface IPensum extends pensumType, Record {
  id: string
  created: string
  updated: string
}

export const usePensumStore = createViewStore<IPensum>({
  storeId: 'pensum',
  collectionName: 'pensum',
  relations: ['id_saber'],
  autoFetch: true
})

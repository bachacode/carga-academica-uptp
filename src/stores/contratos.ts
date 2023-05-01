import type { Record } from 'pocketbase'
import { createViewStore } from './factory'

export type contratosType = {
  tipo: string
}

export interface IContratos extends contratosType, Record {
  id: string
  created: string
  updated: string
}

export const useContratoStore = createViewStore<IContratos>({
  storeId: 'contratos',
  collectionName: 'contratos',
  autoFetch: true
})

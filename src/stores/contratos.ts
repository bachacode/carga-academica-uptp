import type { Record } from 'pocketbase'
import { createViewStore } from './factory'

export type Contrato = {
  nombre: string
  horas: number | string
}

export interface IContrato extends Contrato, Record {}

export const useContratoStore = createViewStore<IContrato>({
  storeId: 'contratos',
  collectionName: 'contratos'
})

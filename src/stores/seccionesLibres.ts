import type { Record } from 'pocketbase'
import { createViewStore } from './factory'

export type seccionesLibresType = {
  nombre: string
  apellido: string
  titulo: string
  saberes: Array<string>
}

export interface ISeccionesLibres extends seccionesLibresType, Record {}

export const useSeccionesLibresStore = createViewStore<ISeccionesLibres>({
  storeId: 'seccionesLibres',
  collectionName: 'secciones_libres',
  autoFetch: false
})

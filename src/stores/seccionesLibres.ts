import type { Record } from 'pocketbase'
import { createViewStore } from './factory'

export type SeccionLibre = {
  nombre: string
  apellido: string
  titulo: string
  saberes: Array<string>
}

export interface ISeccionesLibres extends SeccionLibre, Record {}

export const useSeccionesLibresStore = createViewStore<ISeccionesLibres>({
  storeId: 'seccionesLibres',
  collectionName: 'secciones_libres',
  autoFetch: false
})

import type { Record } from 'pocketbase'
import { createViewStore } from './factory'

export type ProfesorRecomendado = {
  nombre: string
  apellido: string
  cedula: string
  saberes: Array<string>
  contrato_horas: number
  titulo_grado: string
  posgrado_grado: string
  horas: number
  dia: string
}

export interface ICarga extends ProfesorRecomendado, Record {
  id: string
  created: string
  updated: string
}

export const useProfesoresRecomendadosStore = createViewStore<ICarga>({
  storeId: 'profesoresRecomendados',
  collectionName: 'profesores_recomendados',
  autoFetch: false
})

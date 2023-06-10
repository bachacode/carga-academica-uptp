import type { Column } from './Column'
import type { Record } from 'pocketbase'

export type DatosReportes = {
  items: Record[] | undefined
  totalItems?: number
  columns: Column[]
  pdfName: string
  filters: {
    value: string
    name: string
  }[]
  relations?: string[]
  setChart?: (filteredValues: any[], allValues: number) => any
}

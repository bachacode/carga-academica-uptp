import type { Column } from './Column'
import type { Record } from 'pocketbase'
export type Reportes = {
  columns: Column[]
  pdfName: string
  mapData: (value: Record | any, index: number, array: Record[] | any[]) => Record
  filters?: {
    value: string
    name: string
    isLabel?: boolean
  }[]
  relations?: string[]
}

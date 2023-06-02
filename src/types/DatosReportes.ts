import type { Column } from './Column'
import type { Record } from 'pocketbase'

export type DatosReportes = {
  items: Record[] | undefined
  columns: Column[]
  pdfName: string
  relations?: string[]
}

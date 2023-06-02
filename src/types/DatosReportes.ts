import type { Column } from './Column'
import type { Record } from 'pocketbase'
export type DatosReportes = {
  items: Record[]
  columns: Column[]
  pdfName: string
}

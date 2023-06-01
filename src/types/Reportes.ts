import type { columnType } from './columnType'
import type { Record } from 'pocketbase'
export type Reportes = {
  columns: columnType[]
  pdfName: string
  mapData: (value: Record | any, index: number, array: Record[] | any[]) => Record
}

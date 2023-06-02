import type { Reportes } from '@/types/Reportes'

export const posgrados: Reportes = {
  columns: [
    {
      name: 'Grado',
      isAsc: false
    },
    {
      name: 'Nombre',
      isAsc: false
    }
  ],
  pdfName: 'posgrados.pdf',
  mapData: (record) => {
    return record
  }
}

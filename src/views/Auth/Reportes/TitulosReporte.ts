import type { ITitulo } from '@/stores/titulos'
import type { Reportes } from '@/types/Reportes'

export const titulos: Reportes = {
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
  pdfName: 'titulos.pdf',
  mapData: (record: ITitulo) => {
    return record
  }
}

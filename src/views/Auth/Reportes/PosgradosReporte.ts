import type { IPosgrado } from '@/stores/posgrados'
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
  filters: [
    { value: 'grado ~ "maes%"', name: 'Posgrados de Maestría' },
    { value: 'grado ~ "mag%"', name: 'Posgrados de Magíster' },
    { value: 'grado ~ "doc%"', name: 'Posgrados de Doctorado' },
    { value: 'grado !~ "1"', name: 'Todos los titulos de posgrado' }
  ],
  mapData: (record: IPosgrado) => {
    return record
  }
}

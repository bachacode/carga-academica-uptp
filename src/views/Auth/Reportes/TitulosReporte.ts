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
  filters: [
    { value: 'grado ~ "t%"', name: 'Titulos Técnicos'},
    { value: 'grado ~ "i%"', name: 'Titulos de Ingeniería'},
    { value: 'grado ~ "l%"', name: 'Titulos de Licenciatura'},
    { value: 'grado !~ "1"', name: 'Todos los titulos'},
  ],
  mapData: (record: ITitulo) => {
    return record
  }
}

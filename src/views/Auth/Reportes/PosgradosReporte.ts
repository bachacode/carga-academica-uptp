import type { IPosgrado } from '@/stores/posgrados'
import type { Reportes } from '@/types/Reportes'
import { chartColors } from './chartColors'

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
    { value: '', name: 'Tablas', isLabel: true },
    { value: 'grado ~ "maes%"', name: 'Posgrados de Maestría' },
    { value: 'grado ~ "mag%"', name: 'Posgrados de Magíster' },
    { value: 'grado ~ "doc%"', name: 'Posgrados de Doctorado' },
    { value: 'grado !~ "1"', name: 'Todos los titulos de posgrado' },
    { value: '', name: 'Graficas', isLabel: true },
    { value: 'grado ~ "maes"%@chart', name: 'Posgrados de Maestría' },
    { value: 'grado ~ "mag%"@chart', name: 'Posgrados de Magíster' },
    { value: 'grado ~ "doc%"@chart', name: 'Posgrados de Doctorado' }
  ],
  mapData: (record: IPosgrado) => {
    return record
  },
  setChart: (values: IPosgrado[], allValues: number) => {
    const totalFiltered = values.length
    const grado = values[0].grado
    return {
      labels: ['Posgrados en el sistema Carga Académica'],
      datasets: [
        {
          label: `Posgrados de ${grado}`,
          data: [totalFiltered],
          backgroundColor: chartColors.good.backgroundColor,
          borderColor: chartColors.good.borderColor,
          borderWidth: 1
        },
        {
          label: 'Posgrados Totales',
          data: [allValues],
          backgroundColor: chartColors.totals.backgroundColor,
          borderColor: chartColors.totals.borderColor,
          borderWidth: 1
        }
      ]
    }
  }
}

import type { ITitulo } from '@/stores/titulos'
import type { Reportes } from '@/types/Reportes'
import { chartColors } from './chartColors'

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
    { value: '', name: 'Tablas', isLabel: true },
    { value: 'grado ~ "t%"', name: 'Titulos Técnicos' },
    { value: 'grado ~ "i%"', name: 'Titulos de Ingeniería' },
    { value: 'grado ~ "l%"', name: 'Titulos de Licenciatura' },
    { value: 'grado !~ "1"', name: 'Todos los titulos' },
    { value: '', name: 'Graficas', isLabel: true },
    { value: 'grado ~ "t%"@chart', name: 'Titulos Técnicos' },
    { value: 'grado ~ "i%"@chart', name: 'Titulos de Ingeniería' },
    { value: 'grado ~ "l%"@chart', name: 'Titulos de Licenciatura' }
  ],
  mapData: (record: ITitulo) => {
    return record
  },
  setChart: (values: ITitulo[], allValues: number) => {
    const totalFiltered = values.length
    const grado = values[0].grado
    return {
      labels: ['Titulos en el sistema Carga Académica'],
      datasets: [
        {
          label: `Titulos de ${grado}`,
          data: [totalFiltered],
          backgroundColor: chartColors.good.backgroundColor,
          borderColor: chartColors.good.borderColor,
          borderWidth: 1
        },
        {
          label: 'Titulos Totales',
          data: [allValues],
          backgroundColor: chartColors.totals.backgroundColor,
          borderColor: chartColors.totals.borderColor,
          borderWidth: 1
        }
      ]
    }
  }
}

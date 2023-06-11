import type { ISeccion } from '@/stores/secciones'
import type { Reportes } from '@/types/Reportes'

export const secciones: Reportes = {
  columns: [
    {
      name: 'Codigo',
      isAsc: false
    },
    {
      name: 'Trayecto',
      isAsc: false
    },
    {
      name: 'Estudiantes',
      isAsc: false
    }
  ],
  pdfName: 'secciones.pdf',
  filters: [
    { value: '', name: 'Tablas', isLabel: true },
    { value: 'trayecto = "1"', name: 'Trayecto 1' },
    { value: 'trayecto = "2"', name: 'Trayecto 2' },
    { value: 'trayecto = "3"', name: 'Trayecto 3' },
    { value: 'trayecto = "4"', name: 'Trayecto 4' },
    { value: 'trayecto < 5', name: 'Todas las secciones' },
    { value: '', name: 'Graficas', isLabel: true },
    { value: 'trayecto = "1"@chart', name: 'Trayecto 1' },
    { value: 'trayecto = "2"@chart', name: 'Trayecto 2' },
    { value: 'trayecto = "3"@chart', name: 'Trayecto 3' },
    { value: 'trayecto = "4"@chart', name: 'Trayecto 4' }
  ],
  mapData: (record: ISeccion) => {
    if (!record.trayecto.toString().startsWith('Trayecto'))
      record.trayecto = `Trayecto ${record.trayecto}`
    if (!record.estudiantes.toString().endsWith('estudiantes'))
      record.estudiantes = `${record.estudiantes} estudiantes`
    return record
  },
  setChart: (values: ISeccion[], allValues: number) => {
    const totalFiltered = values.length
    const number = values[0].trayecto
    return {
      labels: ['Secciones en el sistema Carga Académica'],
      datasets: [
        {
          label: `Secciones de trayecto ${number}`,
          data: [totalFiltered],
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(255,99,132,1)'],
          borderWidth: 1
        },
        {
          label: 'Secciones Totales',
          data: [allValues],
          backgroundColor: ['rgba(54, 162, 235, 0.2)'],
          borderColor: ['rgba(54, 162, 235, 1)'],
          borderWidth: 1
        }
      ]
    }
  }
}

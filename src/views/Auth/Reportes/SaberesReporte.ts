import type { ISaber } from '@/stores/saberes'
import type { Reportes } from '@/types/Reportes'

export const saberes: Reportes = {
  columns: [
    {
      name: 'Nombre',
      nameAlias: 'Saber',
      isAsc: false
    },
    {
      name: 'Trayecto',
      isAsc: false
    },
    {
      name: 'Horas',
      isAsc: false
    }
  ],
  pdfName: 'saberes.pdf',
  filters: [
    { value: '', name: 'Tablas', isLabel: true },
    { value: 'trayecto = "0"', name: 'Trayecto Inicial (PIU)' },
    { value: 'trayecto = "1"', name: 'Trayecto 1' },
    { value: 'trayecto = "2"', name: 'Trayecto 2' },
    { value: 'trayecto = "3"', name: 'Trayecto 3' },
    { value: 'trayecto = "4"', name: 'Trayecto 4' },
    { value: 'trayecto < 5', name: 'Todas las secciones' },
    { value: '', name: 'Graficas', isLabel: true },
    { value: 'trayecto = "0"@chart', name: 'Trayecto Inicial (PIU)' },
    { value: 'trayecto = "1"@chart', name: 'Trayecto 1' },
    { value: 'trayecto = "2"@chart', name: 'Trayecto 2' },
    { value: 'trayecto = "3"@chart', name: 'Trayecto 3' },
    { value: 'trayecto = "4"@chart', name: 'Trayecto 4' }
  ],
  mapData: (record: ISaber) => {
    if (record.trayecto == 0) {
      record.trayecto = `Inicial (PIU)`
    } else if (!record.trayecto.toString().startsWith('Trayecto')) {
      record.trayecto = `Trayecto ${record.trayecto}`
    }
    if (!record.horas.toString().endsWith('horas')) {
      record.horas = `${record.horas} horas`
    }
    return record
  },
  setChart: (values: ISaber[], allValues: number) => {
    const totalFiltered = values.length
    const number = values[0].trayecto
    return {
      labels: ['Saberes en el sistema Carga Académica'],
      datasets: [
        {
          label: `Saberes de trayecto ${number}`,
          data: [totalFiltered],
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(255,99,132,1)'],
          borderWidth: 1
        },
        {
          label: 'Saberes Totales',
          data: [allValues],
          backgroundColor: ['rgba(54, 162, 235, 0.2)'],
          borderColor: ['rgba(54, 162, 235, 1)'],
          borderWidth: 1
        }
      ]
    }
  }
}

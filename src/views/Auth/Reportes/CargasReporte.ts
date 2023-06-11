import type { ICargaTotal } from '@/stores/cargaTotal'
import type { Reportes } from '@/types/Reportes'

export const cargas: Reportes = {
  columns: [
    {
      name: 'Nombre',
      isAsc: false
    },
    {
      name: 'Apellido',
      isAsc: false
    },
    {
      name: 'Cedula',
      nameAlias: 'Cédula',
      isAsc: false
    },
    {
      name: 'horas_dadas',
      nameAlias: 'Horas Dadas',
      isAsc: false
    },
    {
      name: 'contrato_nombre',
      nameAlias: 'Tipo de Contrato',
      isAsc: false
    }
  ],
  pdfName: 'carga_de_profesores.pdf',
  filters: [
    { value: '', name: 'Tablas', isLabel: true },
    { value: 'nombre = null', name: 'Todos los profesores sin carga académica' },
    { value: 'horas != null', name: 'Todos los profesores con carga académica' },
    { value: '', name: 'Graficas', isLabel: true },
    { value: 'nombre = null@chart', name: 'Todos los profesores con carga académica' },
  ],
  mapData: (record: ICargaTotal) => {
    if (record.horas == null) record.horas = 0
    record.horas_dadas = `${record.horas} / ${record.contrato_horas}`
    return record
  },
  setChart: (values: ICargaTotal[], allValues: number) => {
    const totalFiltered = values.length
    const sinCarga = allValues - totalFiltered
    return {
      labels: ['Carga Académica'],
      datasets: [
        {
          label: `Profesores con carga asignada`,
          data: [totalFiltered],
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(255,99,132,1)'],
          borderWidth: 1
        },
        {
          label: 'Profesores sin carga asignada',
          data: [sinCarga],
          backgroundColor: ['rgba(54, 162, 235, 0.2)'],
          borderColor: ['rgba(54, 162, 235, 1)'],
          borderWidth: 1
        }
      ]
    }
  },
}

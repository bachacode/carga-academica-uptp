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
  mapData: (record: ICargaTotal) => {
    if (record.horas == null) record.horas = 0
    record.horas_dadas = `${record.horas} / ${record.contrato_horas}`
    return record
  }
}

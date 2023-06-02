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
  mapData: (record: ISeccion) => {
    if (!record.trayecto.toString().startsWith('Trayecto'))
      record.trayecto = `Trayecto ${record.trayecto}`
    if (!record.estudiantes.toString().endsWith('estudiantes'))
      record.estudiantes = `${record.estudiantes} estudiantes`
    return record
  }
}

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
    { value: 'trayecto = "1"', name: 'Trayecto 1' },
    { value: 'trayecto = "2"', name: 'Trayecto 2' },
    { value: 'trayecto = "3"', name: 'Trayecto 3' },
    { value: 'trayecto = "4"', name: 'Trayecto 4' },
    { value: 'trayecto < 5', name: 'Todos los saberes' }
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
  }
}

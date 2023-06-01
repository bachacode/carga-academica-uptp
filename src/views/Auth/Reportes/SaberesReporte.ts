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
  mapData: (record) => {
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

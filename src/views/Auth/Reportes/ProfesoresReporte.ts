import type { IProfesor } from '@/stores/profesores'
import type { Reportes } from '@/types/Reportes'

export const profesores: Reportes = {
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
      name: 'Correo',
      isAsc: false
    },
    {
      name: 'Telefono',
      nameAlias: 'Teléfono',
      isAsc: false
    },
    {
      isSingleRelation: true,
      name: 'titulo_id',
      nameAlias: 'Titulo',
      childName: 'nombre',
      isAsc: false
    },
    {
      isSingleRelation: true,
      name: 'posgrado_id',
      nameAlias: 'Posgrado',
      childName: 'nombre',
      isAsc: false
    },
    {
      name: 'contrato_id',
      nameAlias: 'Contrato',
      childName: 'nombre',
      isSingleRelation: true,
      isAsc: false
    }
  ],
  pdfName: 'profesores.pdf',
  filters: [
    { value: 'titulo_id.grado ~ "t%"', name: 'Profesores con Técnicos'},
    { value: 'titulo_id.grado ~ "i%"', name: 'Profesores con Ingenierías'},
    { value: 'titulo_id.grado ~ "l%"', name: 'Profesores con Licenciaturas'},
    { value: 'posgrado_id.grado ~ "maes%"', name: 'Profesores con Maestrías'},
    { value: 'posgrado_id.grado ~ "mag%"', name: 'Profesores con Magísters'},
    { value: 'posgrado_id.grado ~ "doc%"', name: 'Profesores con Doctorados'},
    { value: 'nombre ~ ""', name: 'Todos los profesores'},
  ],
  mapData: (record: IProfesor) => {
    if (
      record.expand.titulo_id &&
      !record.expand.titulo_id.nombre.toString().startsWith('Ing') &&
      !record.expand.titulo_id.nombre.toString().startsWith('Tec') &&
      !record.expand.titulo_id.nombre.toString().startsWith('Lic')
    ) {
      record.expand.titulo_id.nombre = `${record.expand.titulo_id.grado} en ${record.expand.titulo_id.nombre}`
    }
    if (
      record.expand.posgrado_id &&
      !record.expand.posgrado_id.nombre.toString().startsWith('Maes') &&
      !record.expand.posgrado_id.nombre.toString().startsWith('Mag') &&
      !record.expand.posgrado_id.nombre.toString().startsWith('Doc')
    ) {
      record.expand.posgrado_id.nombre = `${record.expand.posgrado_id.grado} en ${record.expand.posgrado_id.nombre}`
    }
    return record
  },
  relations: ['titulo_id', 'contrato_id', 'posgrado_id']
}

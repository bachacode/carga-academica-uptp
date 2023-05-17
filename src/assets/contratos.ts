type contratos = Array<{
  id: number
  nom_contrato: string
  horas: number
}>

export const contratos: contratos = [
  {
    id: 0,
    nom_contrato: 'Tiempo Completo',
    horas: 30
  },
  {
    id: 1,
    nom_contrato: 'Dedicación Exclusiva',
    horas: 36
  },
  {
    id: 2,
    nom_contrato: 'Tiempo Convencional',
    horas: 7
  }
]

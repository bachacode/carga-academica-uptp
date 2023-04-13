export type theadColumnType = {
  name: string
  isAsc?: boolean
  isToggable?: boolean
  nameAlias?: string
  multipleData?: Array<{
    name: string
    nameAlias?: string
  }>
}

export type dataType<formType> = {
  store?: any
  columns: Array<theadColumnType>
  formData: formType
  formRules: any
  relations?: any
  tags?: any
}

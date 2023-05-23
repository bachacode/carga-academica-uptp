export type columnType = {
  name: string
  childName?: string
  nameAlias?: string
  isAsc?: boolean
  isToggable?: boolean
  relationTitle?: string
  noRelations?: string
  fatherName?: string
  multipleData?: Array<{
    name: string
    childName?: string
    nameAlias?: string
    isSingleRelation?: boolean
  }>
  isSingleRelation?: boolean
  hasAction?: boolean
}

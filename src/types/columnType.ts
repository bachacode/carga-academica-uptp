export type columnType = {
  name: string
  isAsc?: boolean
  isToggable?: boolean
  nameAlias?: string
  relationTitle?: string
  noRelations?: string
  fatherName?: string
  multipleData?: Array<{
    name: string
    nameAlias?: string
  }>
  isSingleRelation?: {
    name: string
    childName: string
  }
  hasAction?: boolean
}

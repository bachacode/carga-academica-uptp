migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("udweybrpmxizkxe")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("udweybrpmxizkxe")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})

migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h48fyupao6f6o73")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h48fyupao6f6o73")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})

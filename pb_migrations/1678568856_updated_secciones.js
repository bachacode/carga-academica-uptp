migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mlqpqqs9d8bu74u")

  collection.listRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mlqpqqs9d8bu74u")

  collection.listRule = null

  return dao.saveCollection(collection)
})

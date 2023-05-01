migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1tdw18qve9y9uc7")

  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1tdw18qve9y9uc7")

  collection.createRule = null

  return dao.saveCollection(collection)
})

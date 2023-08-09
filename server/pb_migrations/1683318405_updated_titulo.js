migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y7x8y8ed9uav78d")

  collection.name = "titulos"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y7x8y8ed9uav78d")

  collection.name = "titulo"

  return dao.saveCollection(collection)
})

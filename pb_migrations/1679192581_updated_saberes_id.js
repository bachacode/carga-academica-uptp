migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5bojhe15ze2ece0")

  collection.options = {
    "query": "SELECT id, codigo FROM saberes;"
  }

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5bojhe15ze2ece0")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, codigo FROM saberes;"
  }

  return dao.saveCollection(collection)
})

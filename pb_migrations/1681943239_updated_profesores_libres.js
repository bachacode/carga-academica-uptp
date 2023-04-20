migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6v4eu5zg3l41uci")

  collection.options = {
    "query": "SELECT \n  profesores.id as id,\n  profesores.nombre\nFROM profesores\nINNER JOIN clases ON profesores.id = clases.id_profesor"
  }

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6v4eu5zg3l41uci")

  collection.options = {
    "query": "SELECT \n  profesores.id as id,\n  profesores.nombre\nFROM clases\nINNER JOIN profesores ON profesores.id = clases.id_profesor"
  }

  return dao.saveCollection(collection)
})

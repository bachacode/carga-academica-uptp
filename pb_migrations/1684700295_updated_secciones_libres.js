migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pdlk3hji2vij4qy")

  collection.options = {
    "query": "SELECT\nsecciones.id,\nsecciones.created\nFROM secciones\nLEFT JOIN cargas ON secciones.id = cargas.seccion_id\nWHERE cargas.id IS NULL"
  }

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pdlk3hji2vij4qy")

  collection.options = {
    "query": "SELECT\nsecciones.id,\nsecciones.created\nFROM secciones\nLEFT JOIN clases ON secciones.id = clases.id_seccion\nWHERE clases.id IS NULL"
  }

  return dao.saveCollection(collection)
})

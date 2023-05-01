migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("udweybrpmxizkxe")

  collection.options = {
    "query": "SELECT \n  secciones.id as id,\n  secciones.created\nFROM secciones\nLEFT JOIN clases ON secciones.id = clases.id_seccion\nWHERE clases.id_seccion is NULL"
  }

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("udweybrpmxizkxe")

  collection.options = {
    "query": "SELECT \n  secciones.id as id\nFROM secciones\nLEFT JOIN clases ON secciones.id = clases.id_seccion\nWHERE clases.id_seccion is NULL"
  }

  return dao.saveCollection(collection)
})

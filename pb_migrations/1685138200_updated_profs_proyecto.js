migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1k7my763l0wxxx5")

  collection.options = {
    "query": "SELECT\n  secciones.id as id\nFROM cargas\nLEFT JOIN secciones ON cargas.seccion_id = secciones.id\nLEFT JOIN saberes ON cargas.saber_id = saberes.id\nLEFT JOIN profesores ON cargas.profesor_id = profesores.id\nWHERE saberes.nombre LIKE 'Proyecto%' OR saberes.nombre LIKE 'proyecto%'\nGROUP BY secciones.id, profesores.id"
  }

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1k7my763l0wxxx5")

  collection.options = {
    "query": "SELECT\n  secciones.id as id\nFROM cargas\nLEFT JOIN secciones ON cargas.seccion_id = secciones.id\nLEFT JOIN saberes ON cargas.saber_id = saberes.id\nLEFT JOIN profesores ON cargas.profesor_id = profesores.id\nWHERE saberes.nombre LIKE 'Proyecto&'\nGROUP BY secciones.id, profesores.id"
  }

  return dao.saveCollection(collection)
})

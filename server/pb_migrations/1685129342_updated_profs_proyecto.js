migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1k7my763l0wxxx5")

  collection.options = {
    "query": "SELECT\n  secciones.id as id\nFROM cargas\nLEFT JOIN secciones ON cargas.seccion_id = secciones.id\nLEFT JOIN saberes ON cargas.saber_id = saberes.id\nLEFT JOIN profesores ON cargas.profesor_id = profesores.id\nWHERE saberes.nombre LIKE 'Proyecto&'\nGROUP BY secciones.id, profesores.id"
  }

  // remove
  collection.schema.removeField("w2u9xvdi")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1k7my763l0wxxx5")

  collection.options = {
    "query": "SELECT\n  secciones.id as id,\n  COUNT(saberes.nombre) as saberes\nFROM cargas\nLEFT JOIN secciones ON cargas.seccion_id = secciones.id\nLEFT JOIN saberes ON cargas.saber_id = saberes.id\nLEFT JOIN profesores ON cargas.profesor_id = profesores.id\nWHERE saberes.nombre LIKE 'Proyecto&'\nGROUP BY secciones.id, profesores.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w2u9xvdi",
    "name": "saberes",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})

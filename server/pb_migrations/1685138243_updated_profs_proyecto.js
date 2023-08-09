migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1k7my763l0wxxx5")

  collection.options = {
    "query": "SELECT\n  secciones.id as id,\n  profesores.id as profesor,\n  COUNT(saberes.nombre) as cantidad\nFROM cargas\nLEFT JOIN secciones ON cargas.seccion_id = secciones.id\nLEFT JOIN saberes ON cargas.saber_id = saberes.id\nLEFT JOIN profesores ON cargas.profesor_id = profesores.id\nWHERE saberes.nombre LIKE 'Proyecto%' OR saberes.nombre LIKE 'proyecto%'\nGROUP BY secciones.id, profesores.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8ybwtu5r",
    "name": "profesor",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "jyjq1goyyopi2bd",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ogb0zwh1",
    "name": "cantidad",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1k7my763l0wxxx5")

  collection.options = {
    "query": "SELECT\n  secciones.id as id\nFROM cargas\nLEFT JOIN secciones ON cargas.seccion_id = secciones.id\nLEFT JOIN saberes ON cargas.saber_id = saberes.id\nLEFT JOIN profesores ON cargas.profesor_id = profesores.id\nWHERE saberes.nombre LIKE 'Proyecto%' OR saberes.nombre LIKE 'proyecto%'\nGROUP BY secciones.id, profesores.id"
  }

  // remove
  collection.schema.removeField("8ybwtu5r")

  // remove
  collection.schema.removeField("ogb0zwh1")

  return dao.saveCollection(collection)
})

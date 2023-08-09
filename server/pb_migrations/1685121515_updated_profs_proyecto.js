migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1k7my763l0wxxx5")

  collection.options = {
    "query": "SELECT \n  profesores.id as id,\n  profesores.nombre,\n  COUNT(saberes.nombre) as cantidad\nFROM cargas\nLEFT JOIN profesores ON cargas.profesor_id = profesores.id\nLEFT JOIN saberes ON cargas.saber_id = saberes.id\nWHERE saberes.nombre LIKE 'Proyecto%' OR saberes.nombre LIKE 'proyecto%'\n"
  }

  // remove
  collection.schema.removeField("2dnjvf5l")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "guv2ouvf",
    "name": "nombre",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rfqboqkf",
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
    "query": "SELECT \n  profesores.id as id,\n  COUNT(saberes.nombre) as cantidad\nFROM cargas\nLEFT JOIN profesores ON cargas.profesor_id = profesores.id\nLEFT JOIN saberes ON cargas.saber_id = saberes.id\nWHERE saberes.nombre LIKE 'Proyecto%' OR saberes.nombre LIKE 'proyecto%'\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2dnjvf5l",
    "name": "cantidad",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // remove
  collection.schema.removeField("guv2ouvf")

  // remove
  collection.schema.removeField("rfqboqkf")

  return dao.saveCollection(collection)
})

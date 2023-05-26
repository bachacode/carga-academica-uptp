migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1k7my763l0wxxx5")

  collection.options = {
    "query": "SELECT \n  profesores.id as id,\n  profesores.nombre,\n  COUNT(saberes.nombre) as cantidad,\n  cargas.seccion_id as secciones\nFROM profesores\nLEFT JOIN cargas ON cargas.profesor_id = profesores.id\nLEFT JOIN saberes ON cargas.saber_id = saberes.id\nWHERE saberes.nombre LIKE 'proyecto%' OR saberes.nombre LIKE 'Proyecto%'\nGROUP BY profesores.id\n"
  }

  // remove
  collection.schema.removeField("gtp9d1sx")

  // remove
  collection.schema.removeField("bbjes0pe")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wbt04qlk",
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
    "id": "xsqauhip",
    "name": "cantidad",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ht6ushoh",
    "name": "secciones",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "p8h5q5rlzaixqic",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1k7my763l0wxxx5")

  collection.options = {
    "query": "SELECT \n  profesores.id as id,\n  profesores.nombre,\n  COUNT(saberes.nombre) as cantidad\nFROM profesores\nLEFT JOIN cargas ON cargas.profesor_id = profesores.id\nLEFT JOIN saberes ON cargas.saber_id = saberes.id\nWHERE saberes.nombre LIKE 'proyecto%' OR saberes.nombre LIKE 'Proyecto%'\nGROUP BY profesores.id\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gtp9d1sx",
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
    "id": "bbjes0pe",
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
  collection.schema.removeField("wbt04qlk")

  // remove
  collection.schema.removeField("xsqauhip")

  // remove
  collection.schema.removeField("ht6ushoh")

  return dao.saveCollection(collection)
})

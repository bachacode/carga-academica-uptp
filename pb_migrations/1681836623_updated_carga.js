migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kwhjt8ekt53txo1")

  collection.options = {
    "query": "SELECT \n  profesores.id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.titulo,\n  profesores.saberes\nFROM profesores \nLEFT JOIN clases on profesores.id = clases.id"
  }

  // remove
  collection.schema.removeField("pebctekt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qtzmyzf1",
    "name": "nombre",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": 40,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gfkeql7t",
    "name": "apellido",
    "type": "text",
    "required": true,
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
    "id": "ybnmu9dn",
    "name": "titulo",
    "type": "text",
    "required": true,
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
    "id": "bblpc6i0",
    "name": "saberes",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "vqaqkrs7827e13h",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kwhjt8ekt53txo1")

  collection.options = {
    "query": "SELECT \n  profesores.id,\n  clases.id as clases_id\nFROM profesores \nLEFT JOIN clases on profesores.id = clases.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pebctekt",
    "name": "clases_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "6svmhfvnxrz8ak0",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("qtzmyzf1")

  // remove
  collection.schema.removeField("gfkeql7t")

  // remove
  collection.schema.removeField("ybnmu9dn")

  // remove
  collection.schema.removeField("bblpc6i0")

  return dao.saveCollection(collection)
})

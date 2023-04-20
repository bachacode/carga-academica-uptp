migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6v4eu5zg3l41uci")

  collection.options = {
    "query": "SELECT \n  profesores.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.titulo,\n  profesores.saberes\nFROM profesores\nLEFT JOIN clases ON profesores.id = clases.id_profesor\nWHERE clases.id_profesor is NULL"
  }

  // remove
  collection.schema.removeField("qvrouctd")

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
  const collection = dao.findCollectionByNameOrId("6v4eu5zg3l41uci")

  collection.options = {
    "query": "SELECT \n  profesores.id as id,\n  clases.id_profesor,\n  profesores.nombre\nFROM profesores\nLEFT JOIN clases ON profesores.id = clases.id_profesor\nWHERE clases.id_profesor is NULL"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qvrouctd",
    "name": "id_profesor",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "2tmfch5yb8ffvil",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // remove
  collection.schema.removeField("gfkeql7t")

  // remove
  collection.schema.removeField("ybnmu9dn")

  // remove
  collection.schema.removeField("bblpc6i0")

  return dao.saveCollection(collection)
})

migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6v4eu5zg3l41uci")

  collection.options = {
    "query": "SELECT \n  profesores.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  titulos.nombre as titulo,\n  profesores.saberes,\n  profesores.created\nFROM profesores\nLEFT JOIN clases ON profesores.id = clases.id_profesor\nLEFT JOIN titulos ON titulos.id = profesores.titulo_id\nWHERE clases.id_profesor is NULL"
  }

  // remove
  collection.schema.removeField("ybnmu9dn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qey3best",
    "name": "titulo",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6v4eu5zg3l41uci")

  collection.options = {
    "query": "SELECT \n  profesores.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.titulo,\n  profesores.saberes,\n  profesores.created\nFROM profesores\nLEFT JOIN clases ON profesores.id = clases.id_profesor\nWHERE clases.id_profesor is NULL"
  }

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

  // remove
  collection.schema.removeField("qey3best")

  return dao.saveCollection(collection)
})

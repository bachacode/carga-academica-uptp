migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kwhjt8ekt53txo1")

  collection.options = {
    "query": "SELECT \n  clases.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  titulos.nombre as titulo,\n  profesores.saberes,\n  saberes.materia,\n  clases.dia,\n  clases.horas\nFROM clases\nLEFT JOIN profesores on profesores.id = clases.id_profesor\nLEFT JOIN saberes on saberes.id = clases.id_saber\nLEFT JOIN titulos on titulos.id = profesores.titulo_id\nGROUP BY profesores.id"
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
  const collection = dao.findCollectionByNameOrId("kwhjt8ekt53txo1")

  collection.options = {
    "query": "SELECT \n  clases.id as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.titulo,\n  profesores.saberes,\n  saberes.materia,\n  clases.dia,\n  clases.horas\nFROM clases\nLEFT JOIN profesores on profesores.id = clases.id_profesor\nLEFT JOIN saberes on saberes.id = clases.id_saber\nLEFT JOIN titulos on titulos.id = profesores.titulo_id\nGROUP BY profesores.id"
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

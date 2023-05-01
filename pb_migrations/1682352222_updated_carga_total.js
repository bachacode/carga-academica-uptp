migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gln5kuafz8qmjhf")

  collection.options = {
    "query": "SELECT \n  clases.id_profesor as id,\n  profesores.nombre,\n  profesores.apellido,\n  titulos.nombre as titulo,\n  profesores.saberes,\n  SUM(clases.horas) as horas\nFROM clases\nLEFT JOIN profesores on profesores.id = clases.id_profesor\n LEFT JOIN titulos on titulos.id = profesores.titulo_id\nGROUP BY clases.id_profesor"
  }

  // remove
  collection.schema.removeField("ybnmu9dn")

  // remove
  collection.schema.removeField("8dlkrrb5")

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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "guqoeze9",
    "name": "horas",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gln5kuafz8qmjhf")

  collection.options = {
    "query": "SELECT \n  clases.id_profesor as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.titulo,\n  profesores.saberes,\n  SUM(clases.horas) as horas\nFROM clases\nLEFT JOIN profesores on profesores.id = clases.id_profesor\nGROUP BY clases.id_profesor"
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8dlkrrb5",
    "name": "horas",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("qey3best")

  // remove
  collection.schema.removeField("guqoeze9")

  return dao.saveCollection(collection)
})

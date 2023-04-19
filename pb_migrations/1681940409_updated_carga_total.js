migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gln5kuafz8qmjhf")

  collection.options = {
    "query": "SELECT \n  clases.id_profesor as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.titulo,\n  profesores.saberes,\n  SUM(clases.horas) as horas\nFROM clases\nLEFT JOIN profesores on profesores.id = clases.id_profesor\nGROUP BY clases.id_profesor"
  }

  // remove
  collection.schema.removeField("d8qhdpui")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gln5kuafz8qmjhf")

  collection.options = {
    "query": "SELECT \n  clases.id_profesor as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.titulo,\n  profesores.saberes,\n  SUM(clases.horas) as horas\nFROM clases\nLEFT JOIN profesores on profesores.id = clases.id_profesor"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d8qhdpui",
    "name": "horas",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("8dlkrrb5")

  return dao.saveCollection(collection)
})

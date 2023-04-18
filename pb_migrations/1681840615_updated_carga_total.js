migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gln5kuafz8qmjhf")

  collection.options = {
    "query": "SELECT \n  clases.id_profesor as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.titulo,\n  profesores.saberes,\n  SUM(clases.horas) as horas\nFROM clases\nLEFT JOIN profesores on profesores.id = clases.id_profesor"
  }

  // remove
  collection.schema.removeField("l0av5wx3")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gln5kuafz8qmjhf")

  collection.options = {
    "query": "SELECT \n  clases.id_profesor as id,\n  profesores.nombre,\n  profesores.apellido,\n  profesores.titulo,\n  profesores.saberes,\n  SUM(clases.horas) as horas_totales\nFROM clases\nLEFT JOIN profesores on profesores.id = clases.id_profesor"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "l0av5wx3",
    "name": "horas_totales",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("d8qhdpui")

  return dao.saveCollection(collection)
})

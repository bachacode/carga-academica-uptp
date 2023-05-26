migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1k7my763l0wxxx5")

  collection.options = {
    "query": "SELECT \n  profesores.id as id,\n  profesores.nombre,\n  COUNT(saberes.nombre) as cantidad\nFROM profesores\nRIGHT JOIN cargas ON cargas.profesor_id = profesores.id\nRIGHT JOIN saberes ON cargas.saber_id = saberes.id\nWHERE saberes.nombre LIKE 'proyecto%' OR saberes.nombre LIKE 'Proyecto%'\nGROUP BY profesores.id\n"
  }

  // remove
  collection.schema.removeField("rwrafv29")

  // remove
  collection.schema.removeField("c6bemljo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yx3glne9",
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
    "id": "4oy6zato",
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
    "query": "SELECT \n  profesores.id as id,\n  profesores.nombre,\n  COUNT(saberes.nombre) as cantidad\nFROM profesores\nRIGHT JOIN cargas ON cargas.profesor_id = profesores.id\nLEFT JOIN saberes ON cargas.saber_id = saberes.id\nWHERE saberes.nombre LIKE 'proyecto%' OR saberes.nombre LIKE 'Proyecto%'\nGROUP BY profesores.id\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rwrafv29",
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
    "id": "c6bemljo",
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
  collection.schema.removeField("yx3glne9")

  // remove
  collection.schema.removeField("4oy6zato")

  return dao.saveCollection(collection)
})

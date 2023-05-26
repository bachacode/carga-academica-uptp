migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1k7my763l0wxxx5")

  collection.options = {
    "query": "SELECT \n  profesores.id as id,\n  profesores.nombre,\n  COUNT(saberes.nombre) as cantidad\nFROM profesores\nRIGHT JOIN cargas ON cargas.profesor_id = profesores.id\nLEFT JOIN saberes ON cargas.saber_id = saberes.id\nGROUP BY profesores.id\n"
  }

  // remove
  collection.schema.removeField("yujlzdfe")

  // remove
  collection.schema.removeField("gbjnjjkp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pmdp0go0",
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
    "id": "na5rxphz",
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
    "query": "SELECT \n  profesores.id as id,\n  profesores.nombre,\n  COUNT(saberes.nombre) as cantidad\nFROM profesores\nRIGHT JOIN cargas ON cargas.profesor_id = profesores.id\nLEFT JOIN saberes ON cargas.saber_id = saberes.id\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yujlzdfe",
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
    "id": "gbjnjjkp",
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
  collection.schema.removeField("pmdp0go0")

  // remove
  collection.schema.removeField("na5rxphz")

  return dao.saveCollection(collection)
})

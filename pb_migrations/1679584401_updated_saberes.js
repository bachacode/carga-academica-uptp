migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vqaqkrs7827e13h")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sqnq434f",
    "name": "materia",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 80,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vqaqkrs7827e13h")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sqnq434f",
    "name": "materia",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 40,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})

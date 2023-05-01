migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mlqpqqs9d8bu74u")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sq6ifdlg",
    "name": "trayecto",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 4
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mlqpqqs9d8bu74u")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sq6ifdlg",
    "name": "trayecto",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": 4
    }
  }))

  return dao.saveCollection(collection)
})

migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mlqpqqs9d8bu74u")

  // remove
  collection.schema.removeField("ikudmy5m")

  // add
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mlqpqqs9d8bu74u")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ikudmy5m",
    "name": "trayecto",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 20,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("sq6ifdlg")

  return dao.saveCollection(collection)
})

migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vqaqkrs7827e13h")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uds8rjx1",
    "name": "codigo",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": 40,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vqaqkrs7827e13h")

  // remove
  collection.schema.removeField("uds8rjx1")

  return dao.saveCollection(collection)
})

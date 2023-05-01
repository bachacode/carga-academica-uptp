migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mlqpqqs9d8bu74u")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mq857q9n",
    "name": "codigo",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 40,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mlqpqqs9d8bu74u")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mq857q9n",
    "name": "codigo",
    "type": "text",
    "required": false,
    "unique": true,
    "options": {
      "min": null,
      "max": 40,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})

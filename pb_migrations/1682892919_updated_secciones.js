migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mlqpqqs9d8bu74u")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iy16bnhj",
    "name": "estudiantes",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 999
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mlqpqqs9d8bu74u")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iy16bnhj",
    "name": "estudiantes",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": 999
    }
  }))

  return dao.saveCollection(collection)
})

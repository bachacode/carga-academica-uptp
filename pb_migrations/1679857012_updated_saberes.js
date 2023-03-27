migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vqaqkrs7827e13h")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3jjexo8k",
    "name": "periodo",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": 3
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vqaqkrs7827e13h")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3jjexo8k",
    "name": "periodos",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": 3
    }
  }))

  return dao.saveCollection(collection)
})

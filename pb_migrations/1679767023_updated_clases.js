migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6svmhfvnxrz8ak0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fbtmtx1j",
    "name": "dia",
    "type": "date",
    "required": true,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6svmhfvnxrz8ak0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fbtmtx1j",
    "name": "dias",
    "type": "date",
    "required": true,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})

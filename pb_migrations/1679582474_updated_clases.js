migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6svmhfvnxrz8ak0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "asmhquqj",
    "name": "duracion",
    "type": "date",
    "required": true,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6svmhfvnxrz8ak0")

  // remove
  collection.schema.removeField("asmhquqj")

  // remove
  collection.schema.removeField("fbtmtx1j")

  return dao.saveCollection(collection)
})

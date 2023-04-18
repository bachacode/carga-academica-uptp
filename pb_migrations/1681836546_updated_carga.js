migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kwhjt8ekt53txo1")

  collection.options = {
    "query": "SELECT \n  profesores.id,\n  clases.id as clases_id\nFROM profesores \nLEFT JOIN clases on profesores.id = clases.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pebctekt",
    "name": "clases_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "6svmhfvnxrz8ak0",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kwhjt8ekt53txo1")

  collection.options = {
    "query": "SELECT \n  profesores.id\nFROM profesores \nLEFT JOIN clases on profesores.id = clases.id"
  }

  // remove
  collection.schema.removeField("pebctekt")

  return dao.saveCollection(collection)
})

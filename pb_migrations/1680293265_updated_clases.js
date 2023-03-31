migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6svmhfvnxrz8ak0")

  // remove
  collection.schema.removeField("vqaoww8l")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6svmhfvnxrz8ak0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vqaoww8l",
    "name": "id_profesor_saber",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "gukzkyv0xa1bsyh",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})

migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2tmfch5yb8ffvil")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wcmtznvp",
    "name": "id_contrato",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "h48fyupao6f6o73",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2tmfch5yb8ffvil")

  // remove
  collection.schema.removeField("wcmtznvp")

  return dao.saveCollection(collection)
})

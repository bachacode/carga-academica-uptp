migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2tmfch5yb8ffvil")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bblpc6i0",
    "name": "saberes",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "vqaqkrs7827e13h",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2tmfch5yb8ffvil")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bblpc6i0",
    "name": "saberes",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "vqaqkrs7827e13h",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})

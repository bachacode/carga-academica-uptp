migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vqaqkrs7827e13h")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "odytzkus",
    "name": "profesores",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "2tmfch5yb8ffvil",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vqaqkrs7827e13h")

  // remove
  collection.schema.removeField("odytzkus")

  return dao.saveCollection(collection)
})

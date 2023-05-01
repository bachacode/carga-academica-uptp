migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2tmfch5yb8ffvil")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qtjietr6",
    "name": "titulo_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "1tdw18qve9y9uc7",
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
  collection.schema.removeField("qtjietr6")

  return dao.saveCollection(collection)
})

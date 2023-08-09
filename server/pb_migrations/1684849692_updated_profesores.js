migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jyjq1goyyopi2bd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ptrta0s5",
    "name": "posgrado_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "ujz7f207aubbp4q",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jyjq1goyyopi2bd")

  // remove
  collection.schema.removeField("ptrta0s5")

  return dao.saveCollection(collection)
})

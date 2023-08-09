migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jyjq1goyyopi2bd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gbtowdrp",
    "name": "saberes",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "p8gan5gbxzqpiwe",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jyjq1goyyopi2bd")

  // remove
  collection.schema.removeField("gbtowdrp")

  return dao.saveCollection(collection)
})

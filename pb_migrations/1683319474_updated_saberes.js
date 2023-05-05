migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p8gan5gbxzqpiwe")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rjzlhetu",
    "name": "profesores",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "jyjq1goyyopi2bd",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p8gan5gbxzqpiwe")

  // remove
  collection.schema.removeField("rjzlhetu")

  return dao.saveCollection(collection)
})

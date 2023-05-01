migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9fze468edng6rci")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2kpmnphr",
    "name": "id_saber",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "vqaqkrs7827e13h",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9fze468edng6rci")

  // remove
  collection.schema.removeField("2kpmnphr")

  return dao.saveCollection(collection)
})

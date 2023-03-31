migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6svmhfvnxrz8ak0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qvrouctd",
    "name": "id_profesor",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "2tmfch5yb8ffvil",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2wlqsbgi",
    "name": "id_saber",
    "type": "relation",
    "required": true,
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
  const collection = dao.findCollectionByNameOrId("6svmhfvnxrz8ak0")

  // remove
  collection.schema.removeField("qvrouctd")

  // remove
  collection.schema.removeField("2wlqsbgi")

  return dao.saveCollection(collection)
})

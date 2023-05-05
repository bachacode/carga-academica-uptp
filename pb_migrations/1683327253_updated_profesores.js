migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jyjq1goyyopi2bd")

  // remove
  collection.schema.removeField("oznz6i6q")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w8qomffc",
    "name": "id_contrato",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "hueadjlvs1rgsqi",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oznz6i6q",
    "name": "tipo_contrato",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("w8qomffc")

  return dao.saveCollection(collection)
})

migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jyjq1goyyopi2bd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xdtra2om",
    "name": "contrato_id",
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

  // remove
  collection.schema.removeField("xdtra2om")

  return dao.saveCollection(collection)
})

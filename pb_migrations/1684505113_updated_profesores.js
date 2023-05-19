migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jyjq1goyyopi2bd")

  // remove
  collection.schema.removeField("nooq1mnt")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jyjq1goyyopi2bd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nooq1mnt",
    "name": "contrato_id",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "0",
        "1",
        "2"
      ]
    }
  }))

  return dao.saveCollection(collection)
})

migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p8gan5gbxzqpiwe")

  // remove
  collection.schema.removeField("onzx43ab")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p8gan5gbxzqpiwe")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "onzx43ab",
    "name": "codigo",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 40,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
